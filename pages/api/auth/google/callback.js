import GoogleOAuth2Client from "../../../../src/lib/GoogleOAuth2Client";

import connectDB from "./../../../../src/lib/connectDB";

connectDB();

import signAccessToken from "../../../../src/lib/signAccessToken";
import UserModel from "../../../../src/models/UserModel";
import sendAccessTokenViaCookie from "../../../../src/lib/sendAccessTokenViaCookie";
import cookies from "../../../../src/middlewares/cookies";

const googleCallbackHandler = (req, res) => {
  if (req.method === "GET") {
    return handleGoogleCallback(req, res);
  }

  res.status(404).json({
    message: `Cannot find ${req.method} ${req.url}`,
  });
};

const handleGoogleCallback = async (req, res) => {
  const { code } = req.query;
  const { tokens } = await GoogleOAuth2Client.getToken(code);

  GoogleOAuth2Client.setCredentials(tokens);

  const url = "https://www.googleapis.com/oauth2/v3/userinfo";
  const { data: profile } = await GoogleOAuth2Client.request({
    url,
  });

  let user = await UserModel.findOne({
    $or: [{ googleId: profile.sub }, { email: profile.email }],
  });

  console.log("MONGODB USER", user);

  if (!user) {
    user = await UserModel.create({
      googleId: profile.sub,
      email: profile.email,
      name: profile.name,
      picture: profile.picture,
    });
  }

  const token = signAccessToken(user._id.toString());

  sendAccessTokenViaCookie(token, req, res);

  res.redirect("/");
};

export default cookies(googleCallbackHandler);

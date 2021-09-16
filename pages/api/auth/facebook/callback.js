import axios from "axios";
import sendAccessTokenViaCookie from "../../../../src/lib/sendAccessTokenViaCookie";
import signAccessToken from "../../../../src/lib/signAccessToken";
import cookies from "../../../../src/middlewares/cookies";
import UserModel from "../../../../src/models/UserModel";
const facebookCallbackHandler = (req, res) => {
  switch (req.method) {
    case "GET": {
      return handleFacebookCallback(req, res);
    }

    default: {
      res.status(404).json({
        message: `Cannot find ${req.method} ${req.url}`,
      });
    }
  }
};

const handleFacebookCallback = async (req, res) => {
  const { code } = req.query;

  const accessTokenUrl = `https://graph.facebook.com/v12.0/oauth/access_token?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${process.env.FACEBOOK_REDIRECT_URI}&client_secret=${process.env.FACEBOOK_APP_SECRET}&code=${code}`;

  const { data: accessTokenData } = await axios.get(accessTokenUrl);

  console.log({ accessTokenData });

  const { access_token } = accessTokenData;
  console.log({ access_token });

  const userDataUrl = `https://graph.facebook.com/me?access_token=${access_token}&fields=id,name,picture.width(700).hight(700),name_format,first_name,last_name,email`;

  const { data: profile } = await axios.get(userDataUrl);

  console.log(profile);

  let user;

  const userQuery = profile.email
    ? {
        $or: [
          { facebookId: profile.id },
          {
            email: profile.email,
          },
        ],
      }
    : { facebookId: profile.id };

  user = await UserModel.findOne(userQuery);

  if (user) {
    console.log("Has an account!");
    console.log("account", user);

    if (user.facebookId) {
      console.log("Has connected to facebook!");
      console.log("account facebook id", user.facebookId);
    }

    if (!user.facebookId) {
      console.log("Has NOT connected to facebook!");
    }
    UserModel.findByIdAndUpdate(user._id, {
      facebookId: profile.id,
    }).exec();
  }

  if (!user) {
    console.log("Has no accounts!");

    user = await UserModel.create({
      name: profile.name,
      facebookId: profile.sub || profile.id,
      picture: profile.picture.data.url,
      email: profile.email,
    });
  }

  // Log user in

  const token = signAccessToken(user._id.toString());
  sendAccessTokenViaCookie(token, req, res);
  res.redirect("/");
};

export default cookies(facebookCallbackHandler);

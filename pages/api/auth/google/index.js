import GoogleOAuth2Client from "../../../../src/lib/GoogleOAuth2Client";

const googleAuthHandler = (req, res) => {
  if (req.method === "GET") {
    return handleGoogleAuth(req, res);
  }

  res.status(404).json({
    message: `Cannot find ${req.method} ${req.url}`,
  });
};

const handleGoogleAuth = (req, res) => {
  const url = GoogleOAuth2Client.generateAuthUrl({
    scope: ["openid", "email", "profile"],
  });

  console.log(url);

  res.redirect(url);
};

export default googleAuthHandler;

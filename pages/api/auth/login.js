const loginHandler = (req, res) => {
  switch (req.method) {
    case "POST": {
      logUserIn(req, res);
      break;
    }
  }
};

const login = (req, res) => {
  const { password, username } = req.body;

  if (!email && !username)
    return res.status(400).json({
      message: "Username is required!",
      field: "username",
      name: "HttpBadRequest",
    });

  if (!password)
    return res.status(400).json({
      message: "password is required!",
      field: "password",
      name: "HttpBadRequest",
    });
};

export default loginHandler;

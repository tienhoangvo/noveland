import connectDB from "../lib/connectDB";
import UserModel from "../models/UserModel";
import { promisify } from "util";
import jwt from "jsonwebtoken";
connectDB();
const authenticate = (handler) => async (req, res) => {
  const token = req.cookies.jwt;
  console.log("Debug token", token);
  if (!token) {
    return res.status(401).json({
      name: "HttpUnauthenticatedError",
      message: "You are not logged in! Please log in to access this route!",
    });
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log("Debug decoded", decoded);
  const currentUser = await UserModel.findById(decoded.id);

  console.log("Debug currentUser", currentUser);
  if (!currentUser) {
    return res.status(401).json({
      name: "HttpUnauthenticatedError",
      message: "The token belonging to this token does no longer exist.",
    });
  }

  req.currentUser = currentUser;

  return handler(req, res);
};
export default authenticate;

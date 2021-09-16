import connectDB from "../lib/connectDB";
import UserModel from "../models/UserModel";
import { promisify } from "util";
import jwt from "jsonwebtoken";

const authenticate = (handler) => async (req, res) => {
  await connectDB();
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({
      name: "HttpUnauthenticatedError",
      message: "You are not logged in! Please log in to access this route!",
    });
  }

  // 2) Verification token

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await UserModel.findById(decoded.id);

    if (!currentUser) {
      return res.status(401).json({
        name: "HttpUnauthenticatedError",
        message: "The token belonging to this token does no longer exist.",
      });
    }

    req.currentUser = currentUser;

    return handler(req, res);
  } catch (error) {
    if (error.name === "JsonWebTokenError")
      return res.status(401).json({
        name: "HttpUnauthenticatedError",
        message: "Invalid token. Please login again!",
      });
  }
};
export default authenticate;

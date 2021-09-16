import { Schema, model, modelNames } from "mongoose";

const userSchema = new Schema(
  {
    name: String,

    email: String,

    emailVerified: { type: Boolean, default: false },

    emailVerifiedAt: Date,

    username: String,

    googleId: String,

    facebookId: String,

    twitterId: String,

    picture: String,
  },
  { timestamps: true }
);

const UserModel = modelNames().includes("User")
  ? model("User")
  : model("User", userSchema);

export default UserModel;

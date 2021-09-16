import { Schema, model, models } from "mongoose";

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

export default models.User || model("User", userSchema);

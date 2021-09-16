import mongoose from "mongoose";

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */

let catched = global.mongoose;

if (!catched) {
  catched = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (catched.conn) {
    return catched.conn;
  }

  if (!catched.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    };

    catched.promise = mongoose
      .connect(process.env.DB_URI, opts)
      .then((mongoose) => {
        return mongoose;
      });

    catched.conn = await catched.promise;

    return catched.conn;
  }
};

export default connectDB;

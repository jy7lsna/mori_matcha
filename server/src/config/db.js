import mongoose from "mongoose";

const connectDb = async (mongoUri) => {
  if (!mongoUri) {
    throw new Error("Missing MONGODB_URI");
  }

  await mongoose.connect(mongoUri, {
    autoIndex: true
  });
};

export default connectDb;

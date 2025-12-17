import mongoose from "mongoose";

export const connectDB = async () => {
  const mongoUri =
    process.env.MONGO_URI ||
    process.env.MONGODB_URI ||
    process.env.DATABASE_URL;
  if (!mongoUri) {
    console.error(
      "MONGO URI not configured. Please set MONGO_URI or MONGODB_URI or DATABASE_URL in your environment."
    );
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(mongoUri);
    console.log("MONGODB CONNECTED:", conn.connection.host);
  } catch (error) {
    console.error("Error connecting to MONGODB:", error);
    if (process.env.NODE_ENV === "production") {
      // In production we want to fail fast
      process.exit(1);
    } else {
      // In development, attempt a local MongoDB fallback before giving up
      const fallback = "mongodb://127.0.0.1:27017/chatify-dev";
      try {
        const conn2 = await mongoose.connect(fallback);
        console.warn(
          "Connected to local MongoDB fallback:",
          conn2.connection.host
        );
        return;
      } catch (fallbackError) {
        console.warn(
          "Local MongoDB fallback failed:",
          fallbackError.message || fallbackError
        );
        console.warn(
          "Continuing without a MongoDB connection (development mode). Some features may be unavailable."
        );
        return;
      }
    }
  }
};

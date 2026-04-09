import "dotenv/config";
import express from "express";
import connectDB from "./src/lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./src/routes/auth.route.js";
import userRoutes from "./src/routes/user.route.js";
import chatRoutes from "./src/routes/chat.route.js";
const app = express();
const PORT = process.env.PORT;
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, //allow frontend to send the cookies
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

app.listen(PORT, () => {
  console.log(`erver start port ${PORT}`);
  connectDB();
});

import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDb from "./config/database.js";
import { errorHandler } from "./middleware/errorHandler.js";
import authrouter from "./routes/authRoutes.js";
import taskrouter from "./routes/taskRoutes.js";
//load env variables
dotenv.config();
//connect to database
connectDb();
//initialize express app
const app = express();
//middleware
const allowedOrigins = process.env.FRONTEND_URL
  ? [process.env.FRONTEND_URL]
  : [];
app.use(
  cors({
    origin: function (origin, callback) {
      //allow requests with no origin like mobile apps or curl requests
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        callback(new Error(msg), false);
      } else {
        callback(null, true); //allow all other origins
      }
    },
    credentials: true,
  })
);
app.use(express.json()); //for parsing application/json
app.use(express.urlencoded({ extended: true })); //for parsing application/x-www-form-urlencoded
//routes
app.use("/api", authrouter);
app.use("/api/tasks", taskrouter);

//health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "API is running" });
});
//Error handling middleware
app.use(errorHandler);
//start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

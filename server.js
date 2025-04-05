import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import resourceRoutes from "./routes/resourceRoutes.js";
// import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/resources", resourceRoutes);

// Error Handling Middleware
// app.use(notFound);
// app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

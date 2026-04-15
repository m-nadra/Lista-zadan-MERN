import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import swagger from "./docs/swagger.js";
import logger from "./logger.js";
import auth from "./routes/auth.js";
import tasks from "./routes/tasks.js";
import redis from "./token.js";

const PORT = process.env.PORT;
const app = express();

app.use(morgan(":date - :method :url - :status"));
app.use(swagger);
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true
	})
);
app.set("trust proxy", "1");

mongoose
	.connect(process.env.DATABASE_URL)
	.then(() => logger.info("Connected to MongoDB"))
	.catch(err => logger.error(err));

redis
	.connect()
	.then(() => logger.info("Connected to Redis"))
	.catch(err => logger.error(err));

app.use("/api/tasks", tasks);
app.use("/api", auth);

app.use((err, req, res, _) => {
	logger.error("Unhandled error", {
		ip: req.ip,
		method: req.method,
		path: req.path,
		error: err.message
	});
	res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
	logger.info(`Server is running at port ${PORT}`);
});

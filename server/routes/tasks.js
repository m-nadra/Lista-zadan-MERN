import { Router } from "express";
import logger from "../logger.js";
import { Task, taskSchema } from "../models/Task.js";
import { getUserfromToken } from "../token.js";

const router = Router();

router.use((req, res, next) => {
	try {
		const token = req.cookies.access_token;
		if (!token) {
			logger.warn("Unauthorized access attempt - no token", {
				ip: req.ip,
				path: req.path,
			});
			return res.status(401).json({ error: "Unauthorized" });
		}

		const user = getUserfromToken(token);
		req.userId = user.id;
		next();
	} catch (err) {
		logger.warn("Unauthorized access attempt - invalid token", {
			ip: req.ip,
			path: req.path,
			error: err.message,
		});
		return res.status(401).json({ error: "Invalid token" });
	}
});

router.get("/", async (req, res) => {
	try {
		logger.info("Fetching tasks", { userId: req.userId });
		const tasks = await Task.find({ user: req.userId });
		logger.info("Tasks fetched successfully", {
			userId: req.userId,
			count: tasks.length,
		});
		res.status(200).json(tasks);
	} catch (err) {
		logger.error("Error fetching tasks", {
			userId: req.userId,
			error: err.message,
		});
		res.status(500).json({ error: err.message });
	}
});

router.post("/", async (req, res) => {
	try {
		logger.info("Creating task", { userId: req.userId, taskData: req.body });
		const value = await taskSchema.validateAsync(req.body);
		const task = await Task.create({
			...value,
			user: req.userId,
		});
		logger.info("Task created successfully", {
			userId: req.userId,
			taskId: task._id,
		});
		res.status(201).json(task);
	} catch (err) {
		logger.error("Error creating task", {
			userId: req.userId,
			error: err.message,
			taskData: req.body,
		});
		if (err.isJoi) return res.status(400).json(err.details);
		res.status(500).json({ error: err.message });
	}
});

router.put("/:id", async (req, res) => {
	try {
		logger.info("Updating task", {
			userId: req.userId,
			taskId: req.params.id,
			updateData: req.body,
		});
		const task = await Task.findById(req.params.id);
		if (!task) {
			logger.warn("Update failed - task not found", {
				userId: req.userId,
				taskId: req.params.id,
			});
			return res.status(404).json({ error: "Task not found" });
		}

		if (task.user.toString() !== req.userId) {
			logger.warn("Update failed - unauthorized", {
				userId: req.userId,
				taskId: req.params.id,
				taskOwner: task.user,
			});
			return res
				.status(403)
				.json({ error: "You can only edit your own tasks" });
		}

		const value = await taskSchema.validateAsync(req.body);
		const updatedTask = await Task.findByIdAndUpdate(req.params.id, value);
		logger.info("Task updated successfully", {
			userId: req.userId,
			taskId: req.params.id,
		});
		res.status(200).json(updatedTask);
	} catch (err) {
		logger.error("Error updating task", {
			userId: req.userId,
			taskId: req.params.id,
			error: err.message,
		});
		if (err.isJoi) return res.status(400).json(err.details);
		res.status(500).json({ error: err.message });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		logger.info("Deleting task", { userId: req.userId, taskId: req.params.id });
		const task = await Task.findById(req.params.id);
		if (!task) {
			logger.warn("Delete failed - task not found", {
				userId: req.userId,
				taskId: req.params.id,
			});
			return res.status(404).json({ error: "Task not found" });
		}

		if (task.user.toString() !== req.userId) {
			logger.warn("Delete failed - unauthorized", {
				userId: req.userId,
				taskId: req.params.id,
				taskOwner: task.user,
			});
			return res
				.status(403)
				.json({ error: "You can only remove your own tasks" });
		}

		await Task.findByIdAndDelete(req.params.id);
		logger.info("Task deleted successfully", {
			userId: req.userId,
			taskId: req.params.id,
		});
		res.status(204).end();
	} catch (err) {
		logger.error("Error deleting task", {
			userId: req.userId,
			taskId: req.params.id,
			error: err.message,
		});
		res.status(500).json({ error: err.message });
	}
});

export default router;

import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import api from "../api";

export const useTask = () => {
	const [tasks, setTasks] = useState([]);
	const navigate = useNavigate();
	const getTasks = useCallback(async () => {
		try {
			const response = await api.get("api/tasks");
			if (response.status === 401) return navigate("/login");
			setTasks(await response.json());
		} catch {
			navigate("/login");
		}
	}, [navigate]);
	const addTask = async (task) => {
		const response = await api.post("api/tasks", task);
		if (response.status === 401) return navigate("/login");

		const newTask = await response.json();
		setTasks([...tasks, newTask]);
	};
	const editTask = async (taskId, task) => {
		const response = await api.put(`api/tasks/${taskId}`, task);
		if (response.status === 401) return navigate("/login");

		const newTask = await response.json();
		setTasks((prev) => prev.map((t) => (t._id === taskId ? newTask : t)));
	};
	const deleteTask = async (taskId) => {
		const response = await api.delete(`api/tasks/${taskId}`);
		if (response.status === 401) return navigate("/login");
		setTasks((prev) => prev.filter((t) => t._id !== taskId));
	};
	return { tasks, getTasks, addTask, editTask, deleteTask };
};

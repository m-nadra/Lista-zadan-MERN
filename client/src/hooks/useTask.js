import { useEffect, useState } from "react";
import useApi from "./useApi";

export const useTask = () => {
	const [tasks, setTasks] = useState([]);
	const api = useApi();
	useEffect(() => {
		const getTasks = async () => {
			const response = await api.get("api/tasks");
			setTasks(await response.json());
		};
		getTasks();
	}, [api]);
	return {
		tasks,
		actions: {
			add: async task => {
				const response = await api.post("api/tasks", task);
				const newTask = await response.json();
				setTasks(prev => [...prev, newTask]);
			},
			edit: async (taskId, task) => {
				const response = await api.put(`api/tasks/${taskId}`, task);
				const newTask = await response.json();
				setTasks(prev => prev.map(t => (t._id === taskId ? newTask : t)));
			},
			delete: async taskId => {
				await api.delete(`api/tasks/${taskId}`);
				setTasks(prev => prev.filter(t => t._id !== taskId));
			}
		}
	};
};

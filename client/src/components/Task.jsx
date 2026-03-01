import { useState } from "react";
import { useTaskContext } from "../contexts/TaskContext";

export default function Task({ task }) {
	const [currentTask, setCurrentTask] = useState(task);
	const { actions } = useTaskContext();
	const [isEditing, setIsEditing] = useState(false);
	const [name, setName] = useState(task.name);
	const [description, setDescription] = useState(task.description);
	const [date, setDate] = useState(task.date);

	const handleEdit = async () => {
		if (name === "") {
			alert("Nazwa zadania musi zostać podana!");
			return;
		}
		const editedTaskBody = {
			name: name,
			description: description,
			date: date || "",
		};
		await actions.edit(task._id, editedTaskBody);
		setCurrentTask(editedTaskBody);
		setIsEditing(false);
	};
	const handleCancel = () => {
		setName(currentTask.name);
		setDescription(currentTask.description);
		setDate(currentTask.date);
		setIsEditing(false);
	};
	return (
		<tr key={task._id}>
			{isEditing ? (
				<>
					<td>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</td>
					<td>
						<input
							type="text"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</td>
					<td>
						<input
							type="date"
							value={date?.split("T")[0] || ""}
							onChange={(e) => setDate(e.target.value)}
						/>
					</td>
					<td>
						<button type="button" onClick={handleEdit}>
							Zapisz
						</button>
						<button type="button" onClick={handleCancel}>
							Anuluj
						</button>
					</td>
				</>
			) : (
				<>
					<td>{name}</td>
					<td>{description}</td>
					<td>{date ? new Date(date).toLocaleDateString() : ""}</td>
					<td>
						<button type="button" onClick={() => setIsEditing(true)}>
							Edytuj
						</button>
						<button type="button" onClick={() => actions.delete(task._id)}>
							Usuń
						</button>
					</td>
				</>
			)}
		</tr>
	);
}

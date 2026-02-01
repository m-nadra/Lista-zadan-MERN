import { Activity, useEffect, useState } from "react";
import { useTaskContext } from "../contexts/TaskContext";
import { useAuth } from "../hooks/useAuth";
import styles from "../styles/task.module.css";
import AddTaskForm from "./AddTaskForm";
import TaskTable from "./TaskTable";

export default function Main() {
	const { handleLogout } = useAuth();
	const { getTasks } = useTaskContext();
	const [showForm, setShowForm] = useState(false);
	useEffect(() => {
		getTasks();
	}, [getTasks]);
	return (
		<main className={styles.main}>
			<section className={styles.tasks}>
				<h1>Lista zadań</h1>
				<TaskTable />
				<section className={styles.buttons}>
					{showForm ? (
						<button type="button" onClick={() => setShowForm(false)}>
							Zamknij formularz
						</button>
					) : (
						<button type="button" onClick={() => setShowForm(true)}>
							Dodaj zadanie
						</button>
					)}
					<button type="button" onClick={handleLogout}>
						Wyloguj
					</button>
				</section>
			</section>
			<Activity mode={showForm ? "visible" : "hidden"} id="addForm">
				<AddTaskForm onClose={setShowForm} />
			</Activity>
		</main>
	);
}

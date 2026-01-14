import { Activity, useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth"
import AddTaskForm from "./AddTaskForm"
import { useTaskContext } from "../contexts/TaskContext"
import TaskTable from "./TaskTable"
import styles from "../styles/task.module.css"

export default function Main() {
    const { handleLogout } = useAuth()
    const { getTasks } = useTaskContext()
    const [showForm, setShowForm] = useState(false)
    useEffect(() => {
        getTasks()
    }, [])
    return (
        <main className={styles.main}>
            <section className={styles.tasks}>
                <h1>Lista zadań</h1>
                <TaskTable />
                <section className={styles.buttons}>
                    {showForm ? (
                        <button onClick={() => setShowForm(false)}>Zamknij formularz</button>
                    ) : (
                        <button onClick={() => setShowForm(true)}>Dodaj zadanie</button>
                    )}
                    <button onClick={handleLogout}>Wyloguj</button>
                </section>
            </section>
            <Activity mode={showForm ? "visible" : "hidden"} id="addForm">
                <AddTaskForm onClose={setShowForm} />
            </Activity>
        </main>
    )
}

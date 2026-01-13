import { Activity, useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth"
import AddTaskForm from "./AddTaskForm"
import { useTaskContext } from "../contexts/TaskContext"
import TaskTable from "./TaskTable"

export default function Main() {
    const { handleLogout } = useAuth()
    const { getTasks } = useTaskContext()
    const [showForm, setShowForm] = useState(false)
    useEffect(() => {
        getTasks()
    }, [])
    return (
        <div>
            <h1>Lista zadań</h1>
            <TaskTable />
            <button onClick={() => { setShowForm(true) }}>Dodaj zadanie</button>
            <button onClick={handleLogout}>Wyloguj</button>
            <Activity mode={showForm ? "visible" : "hidden"}>
                <AddTaskForm onClose={setShowForm} />
            </Activity>
        </div>
    )
}

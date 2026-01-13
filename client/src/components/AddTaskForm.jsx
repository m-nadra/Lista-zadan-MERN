import { useState } from "react"
import { useTaskContext } from "../contexts/TaskContext"

export default function AddTaskForm({ onClose }) {
    const { addTask } = useTaskContext()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault()
        await addTask({
            name: name,
            description: description,
            date: date
        })
        onClose(false)
    }
    return (
        <div>
            <h1>Dodaj nowe zadanie</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nazwa zadania</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                <label htmlFor="description">Opis</label>
                <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <label htmlFor="date">Data</label>
                <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
                <input type="submit" value="Wyślij" />
            </form>
            <button onClick={() => onClose(false)}>Zamknij formularz</button>
        </div>
    )
}
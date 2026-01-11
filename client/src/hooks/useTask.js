import { useState } from "react"

export const useTask = () => {
    const [tasks, setTasks] = useState()
    const getTasks = async () => {
        const response = await fetch("http://localhost:3000/api/tasks", {
            method: "GET",
            credentials: "include"
        })
        if (response.status === 401) {
            return navigate("/login")
        }
        const data = await response.json()
        setTasks(data)
    }
    const addTask = async () => {
        alert("Dodaj zadanie")
    }
    const editTask = async (taskId) => {
        alert(`Edytuj zadanie ${taskId}`)
    }
    const deleteTask = async (taskId) => {
        alert(`Usuń zadanie ${taskId}`)
    }
    return { tasks, getTasks, addTask, editTask, deleteTask }
}
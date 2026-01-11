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
    const addTask = async (task) => {
        const response = await fetch("http://localhost:3000/api/tasks", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task)
        })
        if (response.status === 401) {
            return navigate("/login")
        }
    }
    const editTask = async (task) => {
        alert(JSON.stringify(task))
    }
    const deleteTask = async (taskId) => {
        const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
            method: "DELETE",
            credentials: "include",
        })
        if (response.status === 401) {
            return navigate("/login")
        }
    }
    return { tasks, getTasks, addTask, editTask, deleteTask }
}
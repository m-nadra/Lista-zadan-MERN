import { useState } from "react"
import { useNavigate } from "react-router"

export const useTask = () => {
    const [tasks, setTasks] = useState([])
    const navigate = useNavigate()
    const getTasks = async () => {
        const response = await fetch("http://localhost:3000/api/tasks", {
            method: "GET",
            credentials: "include"
        })
        if (response.status === 401) {
            navigate("/login")
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
        if (response.ok) {
            const newTask = await response.json()
            console.log(tasks)
            setTasks([...tasks, newTask])

        } else if (response.status === 401) {
            navigate("/login")
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
        if (response.ok)
            setTasks(prev => prev.filter(t => t._id !== taskId))
        else if (response.status === 401) {
            navigate("/login")
        }
    }
    return { tasks, getTasks, addTask, editTask, deleteTask }
}
import { useState } from "react"
import { useNavigate } from "react-router"

export const useTask = () => {
    const [tasks, setTasks] = useState([])
    const navigate = useNavigate()
    const getTasks = async () => {
        try {
            const response = await fetch("api/tasks", {
                method: "GET",
                credentials: "include"
            })
            if (response.status === 401)
                return navigate("/login")
            setTasks(await response.json())
        } catch (err) {
            navigate("/login")
        }
    }
    const addTask = async (task) => {
        const response = await fetch("api/tasks", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task)
        })
        if (response.status === 401)
            return navigate("/login")

        const newTask = await response.json()
        setTasks([...tasks, newTask])
    }
    const editTask = async (taskId, task) => {
        const response = await fetch(`api/tasks/${taskId}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task)
        })
        if (response.status === 401)
            return navigate("/login")

        const newTask = await response.json()
        setTasks(prev => prev.map(t => t._id === taskId ? newTask : t))
    }
    const deleteTask = async (taskId) => {
        const response = await fetch(`api/tasks/${taskId}`, {
            method: "DELETE",
            credentials: "include",
        })
        if (response.status === 401)
            return navigate("/login")
        setTasks(prev => prev.filter(t => t._id !== taskId))
    }
    return { tasks, getTasks, addTask, editTask, deleteTask }
}
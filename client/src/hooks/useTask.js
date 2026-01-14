import { useState } from "react"
import { useNavigate } from "react-router"

export const useTask = () => {
    const [tasks, setTasks] = useState([])
    const navigate = useNavigate()
    const getTasks = async () => {
        try{
            const response = await fetch("http://localhost:3000/api/tasks", {
                method: "GET",
                credentials: "include"
            })
            if (response.status === 401) {
                navigate("/login")
            }
            const data = await response.json()
            setTasks(data)
        } catch (err){
            navigate("/login")
        }
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
            setTasks([...tasks, newTask])

        } else if (response.status === 401) {
            navigate("/login")
        }
    }
    const editTask = async (taskId, task) => {
        const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task)
        })
        if (response.ok) {
            const newTask = await response.json()
            setTasks(prev => prev.map(t => t._id === taskId ? newTask : t))
        }
        else if (response.status === 401) {
            navigate("/login")
        }
    }
    const deleteTask = async (taskId) => {
        const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
            method: "DELETE",
            credentials: "include",
        })
        if (response.ok) {
            setTasks(prev => prev.filter(t => t._id !== taskId))
        } else if (response.status === 401) {
            navigate("/login")
        }
    }
    return { tasks, getTasks, addTask, editTask, deleteTask }
}
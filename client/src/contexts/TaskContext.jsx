import { createContext, useContext } from "react";
import { useTask } from '../hooks/useTask'

const TaskContext = createContext(null)

export const TaskProvider = ({ children }) => {
    const task = useTask()

    return (
        <TaskContext.Provider value={task}>
            {children}
        </TaskContext.Provider>
    )
}

export const useTaskContext = () => {
    const context = useContext(TaskContext)
    if (!context) {
        throw new Error("useTaskContext must be used within TaskProvider")
    }
    return context
}
import { useTaskContext } from "../contexts/TaskContext";
import Task from "./Task"

export default function TaskTable() {
    const { tasks } = useTaskContext()
    return (
        <table>
            <thead>
                <tr>
                    <th>Nazwa</th>
                    <th>Opis</th>
                    <th>Data wykonania</th>
                </tr>
            </thead>
            <tbody>
                {tasks?.map(task => (<Task key={task._id} task={task} />))}
            </tbody>
        </table>
    )
}
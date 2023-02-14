import React, { useContext, useState } from 'react'
import EditIcon from '../assets/edit.svg'
import TrashIcon from '../assets/trash.svg'
import { TodoContext } from '../context/TodoContext'
import EditTaskModal from './EditTaskModal'


const Task = ({ todoid, taskid, task }) => {

    let [isOpen, setIsOpen] = useState(false)
    const value = useContext(TodoContext)
    const deleteTask = value.deleteTask

    // Handle delete task
    const handleDeleteTask = (todoid, taskid) => {
        deleteTask(todoid, taskid)
    };

    return (
        <div className="bg-secondary border-2 border-white hover:border-2 hover:border-grayshade h-14 p-3.5 mt-5 w-full rounded-2xl flex flex-row items-center">
            <input type="checkbox" className="h-6 w-6 ml-0.5 rounded-full accent-primary rounded-checkbox" />
            <p className="text-lg ml-5 flex-1">{task}</p>
            <span className=" flex flex-row items-center gap-4">
                <img src={EditIcon} onClick={() => setIsOpen(true)} alt="Edit Icon" />
                <img src={TrashIcon} onClick={() => handleDeleteTask(todoid, taskid)} alt="Trash Icon" />
            </span>
            {isOpen && <EditTaskModal isOpen={isOpen} setIsOpen={setIsOpen} todoid={todoid} taskid={taskid} task={task} />}
        </div>
    )
}

export default Task
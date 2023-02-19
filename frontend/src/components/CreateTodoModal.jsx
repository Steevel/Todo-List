import React, { useState, useContext } from 'react'
import { Dialog } from '@headlessui/react'
import { TodoContext } from '../context/TodoContext'

const CreateTodoModal = ({ isOpen, setIsOpen }) => {

    const [newTodo, setNewTodo] = useState("")
    const { createTodo } = useContext(TodoContext)

    const handleInput = (e) => {
        if (e.key === "Enter") {
            handleAddTodo()
        } else {
            setNewTodo(e.target.value)
        }
    }

    const handleAddTodo = () => {
        if (newTodo !== "") {
            createTodo(newTodo)
            setIsOpen(false)
        }
    }

    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
            {/* Modal background  */}
            <div className="fixed inset-0 bg-bgcolor opacity-70 " aria-hidden="true" />
            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center p-4 ">
                <Dialog.Panel className="bg-white rounded-xl p-6 w-1/3">
                    <Dialog.Title className="text-black text-2xl font-semibold">Add Todo Title</Dialog.Title>
                    <input className="placeholder:italic placeholder:grayshade placeholder:text-base block w-full my-5 bg-secondary rounded-lg py-2 pl-6 pr-3 h-12 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-grayshade focus:ring-1 sm:text-sm" placeholder="Add todo title..." type="text" name="add todo" defaultValue={newTodo} onKeyUp={(e) => handleInput(e)} />
                    {/* Buttons */}
                    <div className="flex justify-end gap-3">
                        <button className="border-1 py-2 px-4 rounded-lg bg-btncolor text-btntextcolor" onClick={() => setIsOpen(false)}>Cancel</button>
                        <button className="border-1 py-2 px-4 rounded-lg bg-primary text-white" onClick={() => handleAddTodo()}>Add Todo</button>
                    </div>

                </Dialog.Panel>
            </div>

        </Dialog>
    )
}

export default CreateTodoModal
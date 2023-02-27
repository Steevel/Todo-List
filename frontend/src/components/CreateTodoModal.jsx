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
                <Dialog.Panel className="w-1/3 p-6 bg-white rounded-xl">
                    <Dialog.Title className="text-2xl font-semibold text-black">Add Todo Title</Dialog.Title>
                    <input className="block w-full h-12 py-2 pl-6 pr-3 my-5 rounded-lg shadow-sm placeholder:italic placeholder:grayshade placeholder:text-base bg-secondary focus:outline-none focus:border-sky-500 focus:ring-grayshade focus:ring-1 sm:text-sm" placeholder="Add todo title..." type="text" name="add todo" defaultValue={newTodo} onKeyUp={(e) => handleInput(e)} />
                    {/* Buttons */}
                    <div className="flex justify-end gap-3">
                        <button className="px-4 py-2 rounded-lg border-1 bg-btncolor text-btntextcolor" onClick={() => setIsOpen(false)}>Cancel</button>
                        <button className="px-4 py-2 text-white rounded-lg border-1 bg-primary" onClick={() => handleAddTodo()}>Add Todo</button>
                    </div>

                </Dialog.Panel>
            </div>

        </Dialog>
    )
}

export default CreateTodoModal
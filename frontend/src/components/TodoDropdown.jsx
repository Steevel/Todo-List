import React, { useState, useContext } from 'react'
import { TodoContext } from '../context/TodoContext'
import MoreIcon from '../assets/more.svg'
import EditIcon from '../assets/edit.svg'
// import StarIcon from '../assets/star.svg'
import TrashIcon from '../assets/trash.svg'
import { Menu } from '@headlessui/react'
import EditTodoModal from './EditTodoModal'

const TodoDropdown = ({ todoTitle, todoId }) => {

    let [isOpen, setIsOpen] = useState(false)

    const value = useContext(TodoContext)
    const deleteTodo = value.deleteTodo

    const handleDelete = (todoId) => {
        deleteTodo(todoId)
    }

    return (
        <div className="top-32 text-right">
            <Menu as="div" className="relative inline-block text-left">
                <Menu.Button><img src={MoreIcon} alt="More Icon" /></Menu.Button>
                <Menu.Items className="absolute right-0 mt-2 w-40 py-4 px-2 origin-top-right rounded-md bg-white text-headingcolor shadow-lg flex flex-col gap-3 focus:outline-none">
                    <Menu.Item onClick={() => setIsOpen(true)}>

                        {({ active }) => (
                            <div className={`flex flex-row p-2 gap-2 rounded-md ${active && 'bg-secondary ring-1 ring-grayshade'}`}>
                                <span><img src={EditIcon} alt="edit icon" /></span>
                                <a
                                    className=""
                                    href="#"
                                >
                                    Edit
                                </a>
                            </div>
                        )}
                    </Menu.Item>

                    <Menu.Item onClick={() => handleDelete(todoId)}>
                        {({ active }) => (
                            <div className={`flex flex-row p-2 gap-2 rounded-md ${active && 'bg-secondary ring-1 ring-grayshade'}`}>
                                <span><img src={TrashIcon} alt="trash icon" /></span>
                                <a
                                    className=""
                                    href="#"
                                >
                                    Delete
                                </a>
                            </div>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Menu>

            {isOpen && <EditTodoModal isOpen={isOpen} setIsOpen={setIsOpen} todoId={todoId} todoTitle={todoTitle} />}
        </div>
    )
}

export default TodoDropdown
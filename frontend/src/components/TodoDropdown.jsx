import React, { useState, useContext } from 'react'
import { TodoContext } from '../context/TodoContext'
import MoreIcon from '../assets/more.svg'
import EditIcon from '../assets/edit.svg'
import TrashIcon from '../assets/trash.svg'
import { Menu } from '@headlessui/react'
import EditTodoModal from './EditTodoModal'

const TodoDropdown = ({ todo }) => {

    let [isOpen, setIsOpen] = useState(false)

    const { deleteTodo } = useContext(TodoContext)

    const handleDelete = (todoId) => {
        deleteTodo(todoId)
    }

    return (
        <div className="text-right top-32">
            <Menu as="div" className="relative inline-block text-left">
                <Menu.Button><img src={MoreIcon} alt="More Icon" /></Menu.Button>
                <Menu.Items className="absolute right-0 flex flex-col w-40 gap-3 px-2 py-4 mt-2 origin-top-right bg-white rounded-md shadow-lg text-headingcolor focus:outline-none">
                    <Menu.Item onClick={() => setIsOpen(true)}>

                        {({ active }) => (
                            <div className={`flex flex-row p-2 gap-2 rounded-md ${active && 'bg-secondary ring-1 ring-grayshade'}`}>
                                <span><img src={EditIcon} alt="edit icon" /></span>
                                <span>Edit</span>
                            </div>
                        )}
                    </Menu.Item>

                    <Menu.Item onClick={() => handleDelete(todo._id)}>
                        {({ active }) => (
                            <div className={`flex flex-row p-2 gap-2 rounded-md ${active && 'bg-secondary ring-1 ring-grayshade'}`}>
                                <span><img src={TrashIcon} alt="trash icon" /></span>
                                <span>Delete</span>
                            </div>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Menu>

            {isOpen && <EditTodoModal isOpen={isOpen} setIsOpen={setIsOpen} todo={todo} />}
        </div>
    )
}

export default TodoDropdown
import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { IoIosClose } from 'react-icons/io'
interface ModalHeaderProps {
  taskName: string
  editMode: boolean
  setEditMode: (editMode: boolean) => void
  setTaskName: (taskName: string) => void
  updateTask: (taskName: string) => void
  onClose: () => void
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
  taskName,
  editMode,
  setEditMode,
  setTaskName,
  updateTask,
  onClose,
}) => {
  const handleTaskNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value)
  }

  const handleTaskNameBlur = () => {
    setEditMode(false)
    if (taskName.trim().length === 0) {
      setTaskName('Untitled')
    } else {
      updateTask(taskName)
    }
  }

  return (
    <div className="flex items-center">
      <h2 className="text-2xl font-bold truncate">
        {editMode ? (
          <input
            type="text"
            className="text-2xl font-bold rounded-xl w-full"
            value={taskName}
            onChange={handleTaskNameChange}
            onBlur={handleTaskNameBlur}
            autoFocus
          />
        ) : (
          <div
            onClick={() => setEditMode(true)}
            className="flex truncate items-center cursor-pointer"
          >
            {taskName}
          </div>
        )}
      </h2>
      <div className="ml-auto hover:bg-slate-300 rounded-xl">
        <IoIosClose
          onClick={onClose}
          className="w-8 h-8 text-xl cursor-pointer"
        ></IoIosClose>
      </div>
    </div>
  )
}

export default ModalHeader

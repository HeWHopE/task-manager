import React, { useState } from 'react'
import { ITask } from '../../models/ITask'
import { useParams } from 'react-router-dom'
import TaskModal from './modals/taskModal'
import { RiEqualizerLine } from 'react-icons/ri' // Import the icon for displaying description
import { GoClock } from 'react-icons/go'
export interface TaskItemProps {
  task: ITask
  remove: (task: ITask) => void
  update: (task: ITask) => void
  move: (listId: number, taskId: number, newTaskId: number) => void
  boardId?: number
}

const TaskItem: React.FC<TaskItemProps> = ({ task, remove, update, move }) => {
  const [showModal, setShowModal] = useState(false) // State for modal visibility

  const { yourArg } = useParams<{ yourArg?: string }>()
  const boardId = yourArg ? parseInt(yourArg, 10) : undefined

  if (boardId === undefined) {
    throw new Error('boardId is undefined')
  }

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }

    return date.toLocaleDateString(undefined, options)
  }

  const handleEditClick1 = () => {
    setShowModal(true) // Show the modal when the div is clicked
  }

  const handleRemove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.stopPropagation()
    if (task.id !== undefined) {
      remove(task)
    } else {
      console.error('ID is undefined')
    }
  }
  return (
    <>
      {showModal && (
        <TaskModal
          onClose={() => setShowModal(false)}
          task={task}
          boardId={boardId}
        />
      )}

      <div
        className="w-11/12 h-full flex flex-col rounded-md p-2 text-sm bg-white cursor-pointer duration-300 hover:border-blue-600 border"
        onClick={handleEditClick1}
      >
        <a className="text-gray-800 text-lg font-medium truncate whitespace-no-wrap">
          {task.name}
        </a>

        <div className="flex items-center mt-2">
          {task.description && (
            <div className="relative mr-4">
              <RiEqualizerLine
                className=" h-5 w-5 text-black"
                title="This task has a description"
              />
              <span className="absolute top-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded-md text-xs opacity-0 transition-opacity duration-300 pointer-events-none">
                This task has a description
              </span>
            </div>
          )}

          {task.due_date && (
            <div className="relative">
              <GoClock
                className="text-black h-5 w-5"
                title={`Due date: ${formatDate(task.due_date)}`}
              />
              <span className="absolute top-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded-md text-xs opacity-0 transition-opacity duration-300 pointer-events-none">
                {new Date(task.due_date).getDate()}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default TaskItem

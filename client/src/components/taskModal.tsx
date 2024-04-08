import React, { useState, useEffect } from 'react'
import { ITask } from '../models/ITask'
import { BiCard } from 'react-icons/bi'
import { RiEqualizerLine } from 'react-icons/ri'
import {
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from '../services/TaskService'
import { useFetchListsQuery } from '../services/ListService'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useMoveTaskMutation } from '../services/TaskService'
interface TaskModalProps {
  onClose: () => void
  task: ITask
  boardId: number
}

const TaskModal: React.FC<TaskModalProps> = ({ onClose, task, boardId }) => {
  const [editMode, setEditMode] = useState(false)
  const [taskName, setTaskName] = useState(task.name)
  const [updateTask] = useUpdateTaskMutation()

  const [isTextareaVisible, setIsTextareaVisible] = useState(false)
  const [descriptionText, setDescriptionText] = useState(task.description || '')
  const { data: lists } = useFetchListsQuery({ boardId })
  const [isdateModal, setDateModalOpen] = useState(false)

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [deleteTask] = useDeleteTaskMutation()
  const [moveTask] = useMoveTaskMutation()
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)
  }

  const handleDateButtonClick = () => {
    setDateModalOpen(true)
  }

  const closeDateModal = () => {
    setDateModalOpen(false)
  }

  const toggleTextareaVisibility = () => {
    setIsTextareaVisible(!isTextareaVisible)
  }

  const handleTaskNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value)
  }

  const handleTaskNameBlur = () => {
    setEditMode(false)
    if (taskName.trim().length === 0) {
      setTaskName('Untitled')
    } else if (taskName !== task.name) {
      updateTask({
        listId: Number(task.list_id),
        taskId: Number(task.id),
        task: { ...task, name: taskName },
      })
    }
  }

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescriptionText(event.target.value)
  }

  const handleSave = () => {
    updateTask({
      listId: Number(task.list_id),
      taskId: Number(task.id),
      task: { ...task, description: descriptionText },
    })
    setIsTextareaVisible(false)
  }

  const handleSaveDate = () => {
    updateTask({
      listId: Number(task.list_id),
      taskId: Number(task.id),
      task: {
        ...task,
        due_date: selectedDate !== null ? selectedDate : undefined,
      },
    })
    closeDateModal()
  }

  const handleDelete = () => {
    deleteTask({ taskId: Number(task.id), listId: Number(task.list_id) })
    onClose()
  }

  const handleMoveTask = async (
    listId: number,
    taskId: number,
    newListId: number,
  ) => {
    try {
      const response = moveTask({ listId, taskId, newListId })
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  return (
    <div
      onClick={onClose}
      className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="bg-slate-200 rounded-lg w-5/12 h-5/6 p-8"
      >
        <div className="flex items-center">
          <BiCard className="mr-2 h-6 w-6" />
          {editMode ? (
            <input
              type="text"
              className="text-2xl font-bold w-full"
              value={taskName}
              onChange={handleTaskNameChange}
              onBlur={handleTaskNameBlur}
              autoFocus
            />
          ) : (
            <div
              onClick={() => setEditMode(true)}
              className="flex items-center cursor-pointer"
            >
              <h2 className="text-2xl font-bold truncate">{taskName}</h2>
            </div>
          )}
        </div>
        <div className="modal-body h-5/6 flex pt-8">
          <div className="w-3/4 pr-4">
            <div className="flex items-center mb-2">
              <div style={{ verticalAlign: 'middle' }}>
                <RiEqualizerLine className="mr-2" />
              </div>
              <h3
                className="text-lg font-bold mb-0"
                style={{ verticalAlign: 'middle', lineHeight: '1' }}
              >
                Description
              </h3>
            </div>
            {isTextareaVisible ? (
              <div>
                <textarea
                  value={descriptionText}
                  onChange={handleTextareaChange}
                  rows={4}
                  className="resize-none w-full p-2 border border-gray-300 rounded"
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={handleSave}
                    className="mr-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                  >
                    Save
                  </button>
                  <button
                    onClick={toggleTextareaVisibility}
                    className="px-4 py-2 bg-gray-300 text-black rounded-lg shadow-md hover:bg-gray-400 transition duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <a
                onClick={toggleTextareaVisibility}
                className="cursor-pointer inline-block px-4 py-2 bg-slate-300 text-black rounded-lg shadow-md hover:bg-slate-400 transition duration-300 w-full h-10"
              >
                Add Description
              </a>
            )}
          </div>
          <div className="rounded-lg p-4">
            <div className="mb-6 flex flex-col">
              <h3 className="text-lg font-bold mb-2">Add to the card</h3>
              <button
                className="bg-slate-300 text-black rounded-lg shadow-md hover:bg-slate-400 transition duration-300 w-full h-10 flex items-center justify-center"
                onClick={handleDateButtonClick}
              >
                Due Date
              </button>
              {isdateModal && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                  <div
                    onClick={closeDateModal}
                    className="bg-gray-800 bg-opacity-50 absolute inset-0"
                  ></div>
                  <div className="bg-white rounded-lg shadow-lg p-6 relative">
                    <h2 className="text-lg font-semibold mb-4">
                      Select Due Date
                    </h2>
                    <div className="flex items-center gap-4 mb-4">
                      <DatePicker
                        selected={
                          selectedDate !== null ? selectedDate : undefined
                        }
                        onChange={handleDateChange}
                        placeholderText="Choose Date"
                        dateFormat="yyyy-MM-dd"
                      />
                    </div>
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300 mr-2"
                      onClick={handleSaveDate}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300"
                      onClick={closeDateModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-bold mb-2">Actions</h3>
              <div className="flex flex-col gap-2">
                <select
                  defaultValue={'DEFAULT'}
                  className="bg-slate-300 text-black rounded-lg shadow-md hover:bg-slate-400 transition duration-300 w-full py-2 px-4"
                  onChange={(e) => {
                    handleMoveTask(
                      Number(task.list_id),
                      Number(task.id),
                      parseInt(e.target.value),
                    )
                    onClose()
                  }}
                >
                  <option value="DEFAULT" disabled hidden>
                    Move to
                  </option>
                  {lists &&
                    lists.map((list) => (
                      <option key={list.id} value={list.id}>
                        {list.name}
                      </option>
                    ))}
                </select>
                <button
                  onClick={handleDelete}
                  className=" bg-slate-300 text-black rounded-lg shadow-md hover:bg-slate-400 transition duration-300 w-full h-10"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          className="modal-close bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default TaskModal

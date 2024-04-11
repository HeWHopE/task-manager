import React, { useState } from 'react'
import { ITask } from '../../../models/ITask'
import { BiCard } from 'react-icons/bi'
import { RiEqualizerLine } from 'react-icons/ri'
import {
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from '../../../services/TaskService'
import { useFetchListsQuery } from '../../../services/ListService'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useMoveTaskMutation } from '../../../services/TaskService'
import ModalHeader from './taskModalComponents/ModalHeader '
import DescriptionSection from './taskModalComponents/DescriptionSection '
import ActionsSection from './taskModalComponents/ActionsSection '
import DueDateSection from './taskModalComponents/DueDateSection'
export interface TaskModalProps {
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
        className="bg-slate-200 rounded-lg md:w-3/5 lg:w-1/2 xl:w-1/3 h-5/6 p-8 overflow-y-auto"
      >
      <ModalHeader editMode={editMode} setEditMode={setEditMode} taskName={taskName} setTaskName={setTaskName} updateTask={handleTaskNameBlur} />
        <div className="modal-body flex flex-col md:flex-row md:pt-8">
          <div className="w-full md:w-3/4 md:pr-4">
            <div className="flex items-center mb-2">
              <div style={{ verticalAlign: 'middle' }}>
                <RiEqualizerLine className="mr-2" />
              </div>
              <h3 className="text-lg font-bold mb-0">Description</h3>
            </div>

            <DescriptionSection isTextareaVisible={isTextareaVisible} descriptionText={descriptionText} setDescriptionText={handleTextareaChange} updateTask={handleSave} setIsTextareaVisible={toggleTextareaVisibility} />
          </div>
          <div className="rounded-lg p-4 md:w-1/4">
          <DueDateSection task={task} isdateModal={isdateModal} setDateModalOpen={setDateModalOpen} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
           
            <div>
              <ActionsSection task={task} lists={lists} deleteTask={handleDelete} handleMoveTask={handleMoveTask} />
            </div>
          </div>
        </div>
        <button
          className="modal-close hover:bg-slate-400 bg-slate-500 text-white px-4 py-2 rounded-lg mt-4"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default TaskModal

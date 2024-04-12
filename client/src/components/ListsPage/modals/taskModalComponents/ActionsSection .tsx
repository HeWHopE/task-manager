import React from 'react'
import { ITask } from '../../../../models/ITask'
import { IList } from '../../../../models/IList'
import { BsTrash } from 'react-icons/bs'

interface ActionsSectionProps {
  task: ITask
  lists?: IList[]
  deleteTask: (taskId: number, listId: number) => void
  handleMoveTask: (listId: number, taskId: number, newListId: number) => void // Updated function signature
}

const ActionsSection: React.FC<ActionsSectionProps> = ({
  task,
  lists,
  deleteTask,
  handleMoveTask,
}) => {
  const handleDelete = () => {
    deleteTask(Number(task.id), Number(task.list_id))
  }

  const handleMove = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const listId = parseInt(e.target.value)
    const newListId = listId // Assuming newListId is the same as listId
    handleMoveTask(listId, Number(task.id), newListId)
  }

  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Actions</h3>
      <div className="flex flex-col gap-2">
        <select
          defaultValue={'DEFAULT'}
          className="bg-slate-300 text-black rounded-lg shadow-md hover:bg-slate-400 transition duration-300 w-full py-2 px-4"
          onChange={handleMove}
        >
          <option value="DEFAULT" disabled hidden>
            Move to
          </option>
          {lists?.map(
            (
              list, // Use optional chaining here
            ) => (
              <option key={list.id} value={list.id}>
                {list.name}
              </option>
            ),
          )}
        </select>
        <button
          onClick={handleDelete}
          className="bg-slate-300 text-black rounded-lg shadow-md hover:bg-slate-400 transition duration-300 w-full h-10 flex items-center justify-center"
        >
          <BsTrash className="mr-2" /> Delete
        </button>
      </div>
    </div>
  )
}

export default ActionsSection

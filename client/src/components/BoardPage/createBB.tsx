import React, { useState } from 'react'
import { usePostBoardMutation } from '../../services/BoardService'

const CreateBB: React.FC = () => {
  const [showInput, setShowInput] = useState(false)
  const [newBoardName, setNewBoardName] = useState('')
  const [createBoard] = usePostBoardMutation()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewBoardName(event.target.value)
  }

  const handleAdd = () => {
    if (!newBoardName.trim()) {
      return
    }
    createBoard({ name: newBoardName })
    setNewBoardName('')
    setShowInput(false)
  }

  const handleCloseInput = () => {
    setNewBoardName('')
    setShowInput(false)
  }

  const handleCreate = () => {
    setShowInput(true)
  }

  return (
    <div>
      {!showInput && (
        <button onClick={handleCreate}>
          <div className="w-60 h-20 duration-200 hover:bg-slate-200 cursor-pointer bg-slate-50">
            <div className="flex items-center justify-center h-full">
              Create Board
            </div>
          </div>
        </button>
      )}

      {showInput && (
        <div>
          <div className="mb-4">
            <input
              type="text"
              className="bg-slate-200 rounded-md w-full px-2 py-1 mr-2"
              placeholder="Enter board name"
              value={newBoardName}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between">
            <button
              className="bg-slate-500 hover:bg-slate-300 text-white py-2 px-4 w-3/6 rounded-md shadow-md transition duration-300"
              onClick={handleAdd}
            >
              Add
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-300 text-white py-2 px-4 w-3/6 rounded-md shadow-md transition duration-300 ml-2"
              onClick={handleCloseInput}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CreateBB

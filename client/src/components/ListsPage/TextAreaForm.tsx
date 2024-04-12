import React, { useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { BsPlus } from 'react-icons/bs'
import { IList } from '../../models/IList'
import { taskApi } from '../../services/TaskService'

export interface TextAreaFormProps {
  list: IList
  showTextarea: boolean
  setShowTextarea: React.Dispatch<React.SetStateAction<boolean>>
}

const TextAreaForm: React.FC<TextAreaFormProps> = ({
  list,
  showTextarea,
  setShowTextarea,
}) => {
  const [postTaskMutation] = taskApi.usePostTaskMutation()
  const [text, setText] = useState('')

  const handleAddCard = () => {
    if (!text.trim()) return

    postTaskMutation({
      listId: Number(list.id),
      task: { name: text.trim() },
    })

    setText('')
    setShowTextarea(false)
  }

  const handleClose = () => {
    setText('')
    setShowTextarea(false)
  }

  return (
    <div className="flex justify-center">
      {showTextarea ? (
        <div className="flex flex-col items-center w-full">
          <div className="w-11/12">
            <textarea
              placeholder="Enter a title for this card..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex-grow bg-white rounded-lg shadow border-none p-2 resize-none mb-2 w-full"
            />
          </div>

          <div className="flex items-center justify-center w-full m-2">
            <button
              className="flex-shrink-0 bg-blue-500 text-white px-4 h-8 rounded hover:bg-blue-600 mr-2 w-3/4"
              onClick={handleAddCard}
            >
              Add card
            </button>
            <button
              className="flex-shrink-0 color-black text-black rounded-full duration-300 hover:bg-slate-300 p-1"
              onClick={handleClose}
            >
              <AiOutlineCloseCircle className="w-8 h-8 text-gray-500" />
            </button>
          </div>
        </div>
      ) : (
        <button
          className="flex items-center justify-center hover:bg-slate-300 duration-300 m-1 rounded-lg w-11/12 py-2"
          onClick={() => setShowTextarea(true)}
        >
          <BsPlus className="text-slate-600 h-6 w-6" />
          <span className="text-md text-slate-600">Add Card</span>
        </button>
      )}
    </div>
  )
}

export default TextAreaForm

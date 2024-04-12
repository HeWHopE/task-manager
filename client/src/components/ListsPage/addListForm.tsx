import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import AddListButton from './buttons/AddListButton'
import TextAreaInput from './inputs/TextAreaInput'

interface AddListFormProps {
  isAddingList: boolean
  newListName: string
  handleAddList: () => void
  setNewListName: (value: string) => void
  setIsAddingList: (value: boolean) => void
}

const AddListForm: React.FC<AddListFormProps> = ({
  isAddingList,
  newListName,
  handleAddList,
  setNewListName,
  setIsAddingList,
}) => {
  return (
    <li className="m-4">
      {isAddingList ? (
        <div>
          <TextAreaInput
            placeholder="Enter list name"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
          <div className="flex justify-between items-center mt-2">
            <button
              className="flex-shrink-0 bg-blue-500 text-white px-4 h-8 rounded hover:bg-blue-600 mr-2 w-3/4"
              onClick={handleAddList}
            >
              Add list
            </button>
            <button
              className="flex-shrink-0 color-black text-black rounded-full duration-300 hover:bg-slate-300 p-1"
              onClick={() => setIsAddingList(false)}
            >
              <AiOutlineCloseCircle className="w-8 h-8 text-gray-500" />
            </button>
          </div>
        </div>
      ) : (
        <AddListButton onClick={() => setIsAddingList(true)} />
      )}
    </li>
  )
}

export default AddListForm

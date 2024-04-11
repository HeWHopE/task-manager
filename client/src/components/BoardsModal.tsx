import React, { useState, useEffect, ChangeEvent } from 'react'
import { BsArrowLeftShort } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useFetchBoardsQuery } from '../services/BoardService'
import { RiAddLine } from 'react-icons/ri' // Import the RiAddLine icon
import { usePostBoardMutation } from '../services/BoardService'
import { useDeleteBoardMutation } from '../services/BoardService'

interface BoardsModalProps {
  onOpenChange: (isOpen: boolean) => void
}

const BoardsModal: React.FC<BoardsModalProps> = ({ onOpenChange }) => {
  const [open, setOpen] = useState(false)
  const [activeBoardIndex, setActiveBoardIndex] = useState<number | null>(null) 
  const [showInput, setShowInput] = useState(false) 
  const [newBoardName, setNewBoardName] = useState('')
  const [showDeleteButton, setShowDeleteButton] = useState(false)
  const { data: boards } = useFetchBoardsQuery()
  const [postBoard] = usePostBoardMutation()

  const [deleteBoard] = useDeleteBoardMutation()


  useEffect(() => {
    onOpenChange(open)
  }, [open, onOpenChange])

  const handleCloseInput = () => {
    setShowInput(false) 
  }

  const handleAdd = () => {
    if (newBoardName.trim() !== '') {
      postBoard({ name: newBoardName }) 
      setNewBoardName('') 
      setShowInput(false) 
    }
  }

  const handleAddBoard = () => {
    setShowInput(true) 
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewBoardName(event.target.value)
  }

  const handleDeleteBoard = (id: number) => {
    deleteBoard({ id: id }) 
  }

  return (
    <div className="z-50 ">
      <div
        id="history-modal"
        className={`z-2 min-h-[871px] bg-black border-r-[0.5px]  border-gray-400 border-slate-5  top-12 ${open ? 'w-72' : 'w-4  '} duration-300 absolute overflow-hidden`}
      >
        <nav
          className={` h-20 history-navbar justify-center w-full text-white px-4 duration-300 py-2 flex items-center `}
        >
          <h2
            className={`text-lg flex duration-300 ${open ? '' : 'invisible'} duration-300`}
          >
            Your workspace
          </h2>
        </nav>

        <div className="p-4 border-t-[1px]  border-gray-400 ">
          <h2 className="text-white font-bold mb-4 flex items-center">
            Boards
            <RiAddLine
              className="ml-auto cursor-pointer"
              onClick={handleAddBoard}
            />{' '}
            
          </h2>
          {showInput && ( 
            <div className="flex items-center mb-4">
              <input
                type="text"
                className="bg-white rounded-md px-2 py-1 mr-2"
                placeholder="Enter board name"
                value={newBoardName}
                onChange={handleChange}
              />

              <button
                className="bg-gray-500 hover:bg-gray-200 text-white py-2 px-4 rounded-md shadow-md transition duration-300"
                onClick={handleAdd}
              >
                Add
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300 ml-2"
                onClick={handleCloseInput}
              >
                Close
              </button>
            </div>
          )}

          <ul className="flex flex-col">
            {/* Map through the boards array */}
            {boards &&
  boards.map((board, index) => (
    <div key={index} className="relative">
    <Link to={`/lists/${board.id}`} className="italic flex items-center">
    <li
            className={`text-white w-full hover:bg-slate-400 truncate p-2 rounded-md relative`}
            onClick={() => setActiveBoardIndex(index)}
            onMouseEnter={() => setShowDeleteButton(true)}
            onMouseLeave={() => setShowDeleteButton(false)}
        >
            {board.name}
            {showDeleteButton && ( // Show delete button only when hovering over the li element
                <button
                    className="absolute top-0 right-0 p-2 text-white opacity-100 transition-opacity duration-300 hover:opacity-100"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteBoard(Number(board.id));
                    }}
                >
                    X
                </button>
            )}
        </li>

    </Link>
  </div>
  ))}

          </ul>
        </div>
      </div>

      <BsArrowLeftShort
        className={`z-50  bg-black text-white h-7 w-7  border-[0.5px]  border-gray-400 hover:bg-slate-400   z-1 top-[70px] duration-300 ${
          open ? 'left-64 ' : 'left-[1px] rotate-180'
        } text-dark-purple text-3xl  rounded-full absolute  cursor-pointer transition-all duration-300`}
        onClick={() => setOpen(!open)}
      />
    </div>
  )
}

export default BoardsModal

import React, { useState, useEffect, ChangeEvent } from 'react'
import { BsArrowLeftShort } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useFetchBoardsQuery } from '../services/BoardService'
import { RiAddLine } from 'react-icons/ri' // Import the RiAddLine icon
import { usePostBoardMutation } from '../services/BoardService'
interface BoardsModalProps {
  onOpenChange: (isOpen: boolean) => void
}

const BoardsModal: React.FC<BoardsModalProps> = ({ onOpenChange }) => {
  const [open, setOpen] = useState(false)
  const [activeBoardIndex, setActiveBoardIndex] = useState<number | null>(null) // Додана змінна для визначення активної дошки
  const [showInput, setShowInput] = useState(false) // State to toggle visibility
  const [newBoardName, setNewBoardName] = useState('')

  const { data: boards } = useFetchBoardsQuery()
  const [postBoard] = usePostBoardMutation()

  useEffect(() => {
    onOpenChange(open)
  }, [open, onOpenChange])

  const handleCloseInput = () => {
    setShowInput(false) // Close the input and buttons when the close button is clicked
  }

  const handleAdd = () => {
    if (newBoardName.trim() !== '') {
      postBoard({ name: newBoardName }) // Assuming postBoard is a function to add a new board
      setNewBoardName('') // Clear the input after adding the board
      setShowInput(false) // Close the input and buttons after adding the board
    }
  }

  const handleAddBoard = () => {
    setShowInput(true) // Show the input and buttons when plus icon is clicked
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewBoardName(event.target.value)
  }

  return (
    <div className="z-50">
      <div
        id="history-modal"
        className={`z-2 min-h-[871px] border-l-2 bg-slate-600 border-gray-200 top-12 ${open ? 'w-72' : 'w-4  '} duration-300 absolute overflow-hidden`}
      >
        <nav
          className={` h-20 history-navbar justify-center w-full text-white px-4 duration-300 py-2 flex items-center border-b-2 border-gray-200`}
        >
          <h2
            className={`text-lg flex duration-300 ${open ? '' : 'invisible'} duration-300`}
          >
            Your workspace
          </h2>
        </nav>

        <div className="p-4">
          <h2 className="text-white font-bold mb-4 flex items-center">
            Boards
            <RiAddLine
              className="ml-auto cursor-pointer"
              onClick={handleAddBoard}
            />{' '}
            {/* Plus icon */}
          </h2>
          {showInput && ( // Display the input and buttons if showInput is true
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

          <ul className="flex flex-col ">
            {/* Map through the boards array */}
            {boards &&
              boards.map((board, index) => (
                <div key={index}>
                  <Link to={`/lists/${board.id}`} className="flex items-center">
                    {' '}
                    {/* Add Link component with appropriate path */}
                    <li
                      className={`text-white w-full truncate p-2 rounded-md ${
                        activeBoardIndex === index ? 'bg-gray-400' : ''
                      }`}
                      onClick={() => setActiveBoardIndex(index)} // Оновлення активної дошки при кліці
                      style={{ textAlign: 'left' }} // Align text to the left side
                    >
                      {board.name}
                    </li>
                  </Link>
                </div>
              ))}
          </ul>
        </div>
      </div>

      <BsArrowLeftShort
        className={`bg-slate-600  text-white rotate-180 hover:bg-slate-400 z-1 top-14 duration-300 ${
          open ? 'left-64 ' : 'left-1 rotate-1'
        } text-dark-purple text-3xl  rounded-full absolute  cursor-pointer transition-all duration-300`}
        onClick={() => setOpen(!open)}
      />
    </div>
  )
}

export default BoardsModal

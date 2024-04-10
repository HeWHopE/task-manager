import React from 'react'
import CloseXButton from '../ListsPage/buttons/closeXButton'
import { IBoard } from '../../models/IBoard'
import CreateBB from './createBB'
import { Link } from 'react-router-dom'
import { useDeleteBoardMutation } from '../../services/BoardService'
import { usePostBoardMutation } from '../../services/BoardService' // Add this line to import the useCreateBoardMutation hook

interface Props {
  boards: IBoard[] | undefined
}

const Boards: React.FC<Props> = ({ boards }) => {
  const [deleteBoard] = useDeleteBoardMutation()

  const handleDelete = (id: number) => {
    deleteBoard({ id: id }) // Pass the id parameter to deleteBoard
  }
  return (
    <div className="p-4 flex justify-center min-h-[871px]">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-center">
        <CreateBB />
        {boards &&
          boards.map((board) => (
            <div key={board.id} className="relative group text-white">
              <Link
                to={`/lists/${Number(board.id)}`}
                className="w-60 h-20 bg-gray-300 hover:opacity-70 p-2 rounded cursor-pointer text-black flex items-center justify-center"
              >
                {/* Apply Tailwind's truncate class */}
                <div className="truncate">{board.name}</div>
              </Link>
              <CloseXButton onClick={() => handleDelete(Number(board.id))} />
            </div>
          ))}
      </div>
    </div>
  )
}

export default Boards

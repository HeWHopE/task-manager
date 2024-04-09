import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import {
  useFetchBoardsQuery,
  useUpdateBoardMutation,
} from '../../../services/BoardService'

interface HeaderOfListsProps {
  isHistoryModalOpen: boolean
  isBoardsModalOpen: boolean
}

const HeaderOfLists: React.FC<HeaderOfListsProps> = ({
  isHistoryModalOpen,
  isBoardsModalOpen,
}) => {
  const [editedName, setEditedName] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const { yourArg } = useParams<{ yourArg?: string }>()
  const boardId = yourArg ? parseInt(yourArg, 10) : undefined
  const [updateBoard] = useUpdateBoardMutation()
  if (boardId === undefined) {
    throw new Error('boardId is undefined')
  }
  const { data: boards } = useFetchBoardsQuery()

  const board = boards?.find((board) => board.id === boardId)

  const handleHeaderClick = () => {
    setIsEditing(true)
    setEditedName(board?.name || '')
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(event.target.value)
  }

  const handleInputBlur = async () => {
    console.log('blur')
    await updateBoard({ id: boardId, board: { name: editedName } })

    setIsEditing(false)
  }

  return (
    <header
      className={`z-0 mr-0 ${
        isHistoryModalOpen ? 'mr-72' : ''
      } ${isBoardsModalOpen ? 'ml-72' : ''} p-10 text-xl duration-300 h-20 flex items-center justify-between`}
      onClick={handleHeaderClick}
    >
      {isEditing ? (
        <input
          type="text"
          value={editedName}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          autoFocus
          className=" text-black"
        />
      ) : (
        <span className="truncate">{board?.name}</span>
      )}
    </header>
  )
}

export default HeaderOfLists

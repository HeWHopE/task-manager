import React, { useState } from 'react'
import '../styles.css'
import { useFetchBoardsQuery } from '../services/BoardService'

import BoardsComponent from '../components/BoardPage/myBoards' // Assuming correct path to the Boards component

const BoardsPage: React.FC = () => {
  const { data: boards } = useFetchBoardsQuery()

  return (
    <div>
      <BoardsComponent boards={boards} />
    </div>
  )
}

export default BoardsPage

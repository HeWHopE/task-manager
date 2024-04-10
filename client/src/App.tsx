import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './styles.css'
import Lists from './pages/lists'
import Boards from './pages/boards'
import MyNavbar from './components/myNavbar'
import BoardsModal from './components/BoardsModal'

const App = () => {
  const [isBoardsModalOpen, setBoardsModalOpen] = useState(false)

  const handleCloseBoardsModal = () => {
    setBoardsModalOpen(false)
  }

  return (
    <div className="bg-cover bg-center" style={{ backgroundImage: 'url(https://trello-backgrounds.s3.amazonaws.com/SharedBackground/1440x1920/8ba59a04139f08c9b299da15599f895f/photo-1712291003261-5b3b5cea3f28.jpg)' }}>
      <Router>
        <MyNavbar />
  
        <BoardsModal
          onOpenChange={setBoardsModalOpen}
        />
  
        <Routes>
          {/* Pass the state to the Lists component */}
          <Route
            path="/lists/:yourArg"
            element={<Lists isBoardsModalOpen={isBoardsModalOpen} />}
          />
          <Route path="/" element={<Boards />} />
        </Routes>
      </Router>
    </div>
  );
  
  
}

export default App

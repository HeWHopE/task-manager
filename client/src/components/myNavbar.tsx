import React from 'react'
import { Link } from 'react-router-dom'
const MyNavbar: React.FC = () => {
  return (
    <nav className="bg-black h-12 border-b-[1px] border-gray-400">
      <div className="mx-auto px-4 sm:px-2 md:px-2 lg:px-6 ">
        <div className="flex items-center justify-between h-10">
          <Link to="/" className="flex text-white items-center justify-between h-10">
            MyTaskBoards
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default MyNavbar

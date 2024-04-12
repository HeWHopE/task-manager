import React from 'react'

export interface PopupProps {
  handleClosePopup: () => void
  handleRemove: () => void
}

const listPopup: React.FC<PopupProps> = ({
  handleClosePopup,
  handleRemove,
}) => {
  return (
    <>
      <div
        className="fixed inset-0 bg-black opacity-0 z-10"
        onClick={handleClosePopup}
      ></div>
      <div className="absolute -right-20 mt-2 z-20">
        <div className="bg-white p-4 rounded-lg shadow-md w-56 flex flex-col justify-center items-center">
          <div className="text-lg font-bold mb-4">Actions with List</div>
          <div className="space-x-4 border-t-2 p-2 border-slate-200 w-30">
            <button
              className="px-4 py-2 text-red-800 rounded"
              onClick={handleRemove}
            >
              Delete List
            </button>
          </div>
          <div className="space-x-4 border-t-2 p-2 border-slate-200 w-30">
            <a
              className="px-4 py-2 text-red-800 rounded cursor-pointer"
              onClick={handleClosePopup}
            >
              Close Popup
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default listPopup

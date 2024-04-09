import React from 'react';
import { BiCard } from 'react-icons/bi';
import { RiEqualizerLine } from 'react-icons/ri';

export interface TaskModalProps {
  onClose: () => void;
  boardId: number;
}

const TaskModal: React.FC<TaskModalProps> = ({ onClose, boardId }) => {
  return (
    <div
      onClick={onClose}
      className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="bg-slate-200 rounded-lg md:w-3/5 lg:w-1/2 xl:w-1/3 h-5/6 p-8 overflow-y-auto"
      >
        <div className="flex items-center">
          <BiCard className="mr-2 h-6 w-6" />
          <h2 className="text-2xl font-bold truncate">Name</h2>
        </div>
        <div className="modal-body flex flex-col md:flex-row md:pt-8">
          <div className="w-full md:w-3/4 md:pr-4">
            <div className="flex items-center mb-2">
              <div style={{ verticalAlign: 'middle' }}>
                <RiEqualizerLine className="mr-2" />
              </div>
              <h3 className="text-lg font-bold mb-0">Description</h3>
            </div>
            <a
              className="cursor-pointer inline-block px-4 py-2 bg-slate-300 text-black rounded-lg shadow-md hover:bg-slate-400 transition duration-300 w-full h-10"
            >
              Add Description
            </a>
          </div>
          <div className="rounded-lg p-4 md:w-1/4">
            <div className="mb-6 flex flex-col">
              <h3 className="text-lg font-bold mb-2">Add to the card</h3>
              <button
                className="bg-slate-300 text-black rounded-lg shadow-md hover:bg-slate-400 transition duration-300 w-full h-10 flex items-center justify-center"
              >
                Due Date
              </button>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Actions</h3>
              <div className="flex flex-col gap-2">
                <select
                  defaultValue={'DEFAULT'}
                  className="bg-slate-300 text-black rounded-lg shadow-md hover:bg-slate-400 transition duration-300 w-full py-2 px-4"
                >
                  <option value="DEFAULT" disabled hidden>
                    Move to
                  </option>
                </select>
                <button
                  className=" bg-slate-300 text-black rounded-lg shadow-md hover:bg-slate-400 transition duration-300 w-full h-10"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          className="modal-close bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TaskModal;

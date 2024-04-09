import React from 'react';
import { BsPlus } from 'react-icons/bs';

interface AddListButtonProps {
  onClick: () => void;
}

const AddListButton: React.FC<AddListButtonProps> = ({ onClick }) => {
  return (
    <button className="flex items-center justify-center hover:bg-slate-300 duration-300 m-1 rounded-lg bg-slate-100 w-80 py-2" onClick={onClick}>
      <BsPlus className="text-slate-600 h-6 w-6" />
      <span className="text-md text-slate-600">Add List</span>
    </button>
  );
}

export default AddListButton;

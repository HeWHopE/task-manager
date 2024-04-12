import React from 'react';
import DatePicker from 'react-datepicker';
import { useUpdateTaskMutation } from '../../../../services/TaskService';
import { ITask } from '../../../../models/ITask';
import { GoClock } from 'react-icons/go'
import { IoIosClose } from "react-icons/io";

interface DueDateSectionProps {
  selectedDate: Date | null;
  isdateModal: boolean;
  setDateModalOpen: (isOpen: boolean) => void;
  setSelectedDate: (date: Date | null) => void;
  task: ITask;
}

const DueDateSection: React.FC<DueDateSectionProps> = ({task, selectedDate, isdateModal, setDateModalOpen, setSelectedDate }) => {
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  const [updateTask] = useUpdateTaskMutation()


  const handleDateButtonClick = () => {
    setDateModalOpen(true);
  };

  const closeDateModal = () => {
    setDateModalOpen(false);
  };

  const handleSaveDate = () => {
    updateTask({
      listId: Number(task.list_id),
      taskId: Number(task.id),
      task: {
        ...task,
        due_date: selectedDate !== null ? selectedDate : undefined,
      },
    })
    closeDateModal()
  }
  return (
    <div>
    
        <div className="mb-6 flex flex-col">
          <h3 className="text-lg font-bold mb-2">Add to the card</h3>
          <button
            className="bg-slate-300 text-black rounded-lg shadow-md hover:bg-slate-400 transition duration-300 w-full h-10 flex items-center justify-center"
            onClick={handleDateButtonClick}
          >
          <GoClock className='text-black m-1'/>  Due Date
          </button>
          {isdateModal && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
              <div onClick={closeDateModal} className="bg-gray-800 bg-opacity-50 absolute inset-0"></div>
              <div className="bg-white rounded-lg shadow-lg p-6 relative">
              <div className="flex items-center justify-between mb-4">
  <h2 className="text-lg font-semibold">Select Due Date</h2>
  <div className="ml-auto hover:bg-slate-300 rounded-xl p-1">
    <IoIosClose
      onClick={closeDateModal}
      className="w-8 h-8 text-xl cursor-pointer"
    />
  </div>
</div>

  <div className="flex justify-center items-center gap-4 mb-4">
    <DatePicker
      selected={selectedDate !== null ? selectedDate : undefined}
      onChange={handleDateChange}
      placeholderText="Choose Date"
      dateFormat="yyyy-MM-dd"
      className='border border-gray-300 rounded-md h-10 cursor-pointer text-center'
    />
  </div>
            <div className="flex justify-center">
  <button
    className="bg-gray-500 hover:bg-gray-400 text-white py-2 px-4 rounded-md shadow-md transition duration-300 mr-2"
    onClick={handleSaveDate}
  >
    Save
  </button>  
  </div>
</div>

            </div>
          )}
        </div>
      
    </div>
  );
};

export default DueDateSection;

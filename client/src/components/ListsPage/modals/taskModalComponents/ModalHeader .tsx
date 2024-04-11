import React from 'react';

interface ModalHeaderProps {
  taskName: string;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setTaskName: (taskName: string) => void;
  updateTask: (taskName: string) => void;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ taskName, editMode, setEditMode, setTaskName, updateTask }) => {
  const handleTaskNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  const handleTaskNameBlur = () => {
    setEditMode(false);
    if (taskName.trim().length === 0) {
      setTaskName('Untitled');
    } else {
      updateTask(taskName);
    }
  };

  return (
    <div className="flex items-center">
      <h2 className="text-2xl font-bold truncate">
        {editMode ? (
          <input
            type="text"
            className="text-2xl font-bold w-full"
            value={taskName}
            onChange={handleTaskNameChange}
            onBlur={handleTaskNameBlur}
            autoFocus
          />
        ) : (
          <div
            onClick={() => setEditMode(true)}
            className="flex items-center cursor-pointer"
          >
            {taskName}
          </div>
        )}
      </h2>
    </div>
  );
};

export default ModalHeader;

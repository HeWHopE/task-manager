import React from 'react';

interface DescriptionSectionProps {
  descriptionText: string;
  isTextareaVisible: boolean;
  setIsTextareaVisible: (isVisible: boolean) => void;
  setDescriptionText: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  updateTask: (description: string) => void;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({ descriptionText, isTextareaVisible, setIsTextareaVisible, setDescriptionText, updateTask }) => {
  const toggleTextareaVisibility = () => {
    setIsTextareaVisible(!isTextareaVisible);
  };

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionText(event); 
  };

  const handleSave = () => {
    updateTask(descriptionText);
    setIsTextareaVisible(false);
  };

  return (
    <div>
        {isTextareaVisible ? (
          <div>
            <textarea
              value={descriptionText}
              onChange={handleTextareaChange}
              rows={4}
              className="resize-none w-full p-2 border border-gray-300 rounded"
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={handleSave}
                className="mr-2 px-4 py-2  bg-slate-500 text-white rounded-lg shadow-md hover:bg-gray-400 transition duration-300"
              >
                Save
              </button>
              <button
                onClick={toggleTextareaVisibility}
                className="px-4 py-2 bg-slate-500 text-white rounded-lg shadow-md hover:bg-gray-400 transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <a
            onClick={toggleTextareaVisibility}
            className="cursor-pointer inline-block px-4 py-2 bg-slate-300 text-black rounded-lg shadow-md hover:bg-slate-400 transition duration-300 w-full h-10"
          >
            Add Description
          </a>
        )}
      
    </div>
  );
};

export default DescriptionSection;

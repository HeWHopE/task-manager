import React from 'react';

interface TextAreaInputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({ placeholder, value, onChange }) => {
  return (
    <textarea
      className="flex-grow bg-white rounded-lg shadow border-none p-2 resize-none mb-2 w-80"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default TextAreaInput;

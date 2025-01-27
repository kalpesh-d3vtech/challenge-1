import React from "react";

const InputComp = ({ 
  type = "text", 
  placeholder, 
  label, 
  required = false, 
  value, 
  onChange, 
  handleKeyDown,
  error, 
  name,
  onBlur 
}) => {
  return (
    <div className="w-full mb-4 font-roboto text-sm md:text-base "> 
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        name={name} 
        onBlur={onBlur} 
        className={`w-full px-4 h-[48px] border bg-[#F7FBFF] border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8fc9ff] focus:border-[#8fc9ff] 
          ${error ? 'border-red-500' : ''} 
        `}
      />
      {error && (
        <div className="text-red-500 text-xs mt-2">
          {error} 
        </div>
      )}
    </div>
  );
};

export default InputComp;
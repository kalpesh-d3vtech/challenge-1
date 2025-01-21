import React from "react";

const InputComp = ({ type = "text", placeholder, label, required = false }) => {
    return (
        <div className="w-full mb-4 font-roboto text-sm md:text-base">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <input
                type={type}
                placeholder={placeholder}
                required={required}
                className="w-full px-4 h-[48px] border bg-[#F7FBFF] border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8fc9ff] focus:border-[#8fc9ff]"
            />
        </div>
    );
};

export default InputComp;

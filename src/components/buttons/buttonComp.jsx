import React from "react";

const ButtonComp = ({
    icon,
    children,
    variant = "primary",
    onClick,
    disabled = false,
}) => {
    const baseClasses =
        "w-full px-4 text-center font-roboto rounded-xl flex justify-center items-center  transition-all  duration-150 ease-in-out hover:scale-105 h-[52px]";
    const variantClasses =
        variant === "primary"
            ? "bg-[#162D3A] text-white "
            : "bg-[#F3F9FA] text-[#313957]";

    const disabledClasses = "bg-gray-300 text-gray-500 cursor-not-allowed";

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${
                disabled ? disabledClasses : variantClasses
            }`}
        >
            <div className="flex justify-center items-center ">
                {icon && <span className="mr-4"> {icon}</span>}
                {children}
            </div>
        </button>
    );
};

export default ButtonComp;

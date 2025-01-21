import React from "react";

const Loader = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="relative flex items-center justify-center w-24 h-24">
                <div className="absolute w-full h-full border-4 border-dashed rounded-full border-gradient animate-spin"></div>

                <div className="absolute flex gap-1 items-center">
                    <div className="text-2xl font-bold text-orange">D</div>
                    <div className="text-2xl font-bold text-blue">3</div>
                    <div className="text-2xl font-bold text-orange">V</div>
                </div>
            </div>
        </div>
    );
};

export default Loader;

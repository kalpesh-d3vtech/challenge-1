import React from "react";
import { Outlet } from "react-router-dom";
import Art from "../assets/auth/Art.png";

const AuthLayout = () => {
    return (
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-sm md:text-base">
            <div className=" order-2 md:order-1 flex gap-12 flex-col justify-between  items-center">
                <div className="hidden md:block"></div>
                <Outlet />
                <div className="font-roboto opacity-40">
                    © 2023 ALL RIGHTS RESERVED
                </div>
            </div>
            <div className="order-1 md:order-2">
                <img
                    src={Art}
                    alt="art"
                    className="h-[180px] md:h-full w-full rounded-3xl object-cover"
                />
            </div>
        </div>
    );
};

export default AuthLayout;

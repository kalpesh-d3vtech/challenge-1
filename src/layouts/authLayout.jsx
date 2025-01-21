import React from "react";
import { Outlet } from "react-router-dom";
import Art from "../assets/auth/Art.png";

const AuthLayout = () => {
    return (
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-sm md:text-base">
            <div className=" hidden md:flex gap-12 flex-col justify-between  items-center">
                <div className=""></div>
                <Outlet />
                <div className="font-roboto opacity-40">
                    © 2023 ALL RIGHTS RESERVED
                </div>
            </div>
            <div>
                <img
                    src={Art}
                    alt="art"
                    className="h-[180px] md:h-full w-full rounded-3xl object-cover"
                />
            </div>
            <div className="md:hidden flex gap-12 flex-col justify-between items-center">
                <Outlet />
                <div className="font-roboto opacity-40">
                    © 2023 ALL RIGHTS RESERVED
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;

import React from "react";
import { Outlet } from "react-router-dom";
import SidebarComp from "../components/sidebar";
import NavbarComp from "../components/navbar";
const DashboardLayout = () => {
    return (
        <div className=" max-h-screen font-roboto flex overflow-hidden">
            <SidebarComp />
            <div className="w-full">
                <NavbarComp />
                <main  className="flex-1 p-6 ">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;

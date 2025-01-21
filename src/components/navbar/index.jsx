import React from "react";
import { Search, Settings, Bell } from "lucide-react";
import SearchIcon from "../../assets/icons/Search.svg";
import { Avatar, AvatarFallback } from "../ui/avatar";
const NavbarComp = () => {
    return (
        <nav className="h-[10vh] w-full border-b bg-transparent flex items-center justify-between px-4">
            <div className="flex items-center w-2/5 bg-transparent border border-transparent rounded-md px-3 py-1">
                <img
                    src={SearchIcon}
                    alt="Search"
                    className="h-6 w-6 text-gray-500 mr-4"
                />
                <input
                    type="text"
                    placeholder="Search anything here..."
                    className="w-full bg-transparent outline-none placeholder-gray-500"
                />
            </div>

            <div className="flex items-center space-x-4 mr-4">
                <Settings className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-800" />
                <Bell className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-800" />
                <Avatar className="cursor-pointer">
                    <AvatarFallback className="bg-[#d774744b]">
                        KD
                    </AvatarFallback>
                </Avatar>
            </div>
        </nav>
    );
};

export default NavbarComp;

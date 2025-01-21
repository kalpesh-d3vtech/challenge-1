import React, { useState } from "react";
import EmployeeTable from "../components/tables/employeeTable";
import { CirclePlus, Download, ListFilter } from "lucide-react";
import SearchIcon from "../assets/icons/Search.svg";
const Dashboard = () => {
    const tableData = [
        {
            id: 1,
            firstName: "Marco",
            lastName: "Vein",
            email: "marco@gmail.com",
            status: "active",
            employeeId: "#23454GH6J7YT6",
            role: "Full Stack Developer",
            employementType: "Full Time",
            teams: ["Backend", "Frontend", "Cloud"],
        },
        {
            id: 2,
            firstName: "Lina",
            lastName: "Vein",
            email: "lina@gmail.com",
            status: "active",
            employeeId: "#23454GH6J7UI6",
            role: "Web Developer",
            employementType: "Part Time",
            teams: ["Frontend"],
        },
        {
            id: 3,
            firstName: "Mair",
            lastName: "Pablo",
            email: "mair.pablo@gmail.com",
            status: "inactive",
            employeeId: "#23454GPKJ7YT6",
            role: "UI Designer",
            employementType: "Intern",
            teams: ["UI", "UX"],
        },
        {
            id: 1,
            firstName: "Marco",
            lastName: "Vein",
            email: "marco@gmail.com",
            status: "active",
            employeeId: "#23454GH6J7YT6",
            role: "Full Stack Developer",
            employementType: "Full Time",
            teams: ["Backend", "Frontend", "Cloud"],
        },
        {
            id: 2,
            firstName: "Lina",
            lastName: "Vein",
            email: "lina@gmail.com",
            status: "active",
            employeeId: "#23454GH6J7UI6",
            role: "Web Developer",
            employementType: "Part Time",
            teams: ["Frontend"],
        },
        
    ];
    const [activeTab, setActiveTab] = useState("all");

    return (
        <div className="">
            <div className="flex justify-between mb-5">
                <div className="font-semibold text-3xl">Employees</div>
                <div className="flex gap-4">
                    <button className="px-6 h-10 hover:bg-gray-100  flex gap-3 justify-center items-center border rounded-lg">
                        <Download className="w-5 h-5" /> Export
                    </button>
                    <button className="px-6 h-10  bg-black text-white hover:bg-gray-700  rounded-lg flex gap-3 justify-center items-center">
                        <CirclePlus className="w-5 h-5" /> New Employee
                    </button>
                </div>
            </div>
            <div className="w-full border-b border-gray-300 mb-5">
                <div className="flex space-x-4">
                    <button
                        className={`relative pb-2 text-gray-600 ${
                            activeTab === "all"
                                ? "font-semibold"
                                : "text-gray-500"
                        }`}
                        onClick={() => setActiveTab("all")}
                    >
                        All Employees
                        {activeTab === "all" && (
                            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-black transition-all duration-300"></span>
                        )}
                    </button>
                    <button
                        className={`relative pb-2 text-gray-600 ${
                            activeTab === "deleted"
                                ? "font-semibold"
                                : "text-gray-500"
                        }`}
                        onClick={() => setActiveTab("deleted")}
                    >
                        Deleted Employees
                        {activeTab === "deleted" && (
                            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-black transition-all duration-300"></span>
                        )}
                    </button>
                </div>
            </div>
            <div className="rounded-lg p-4 border mb-5 flex justify-between items-center">
                <div className="flex items-center w-full bg-transparent border border-transparent rounded-md px-3 py-1">
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
                <button className="px-6 h-10  flex gap-3 justify-center items-center border rounded-lg hover:bg-gray-100">
                    <ListFilter className="w-5 h-5" /> Filter
                </button>
            </div>
            <div>
                <EmployeeTable tableData={tableData} />
            </div>
        </div>
    );
};

export default Dashboard;

import React, { useEffect, useState } from "react";
import EmployeeTable from "../components/tables/employeeTable";
import { CirclePlus, Download, ListFilter } from "lucide-react";
import SearchIcon from "../assets/icons/Search.svg";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../components/ui/dialog";
import { apiGET } from "../utils/apiHandler";

const Dashboard = () => {
    const [tableData, setTableData] = useState([]);
    const [activeTab, setActiveTab] = useState("all");
    const [newEmployee, setNewEmployee] = useState(null);
    const [editEmployee, setEditEmployee] = useState(null);
    const [deletingRow, setDeletingRow] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const rowsPerPage = 10;

    const addEmployee = () => {
        setTableData((prevData) => [
            ...prevData,
            { ...newEmployee, id: prevData.length + 1 },
        ]);
        setNewEmployee(null);
    };

    const updateEmployee = () => {
        setTableData((prevData) =>
            prevData.map((employee) =>
                employee.id === editEmployee.id ? editEmployee : employee
            )
        );
        setEditEmployee(null);
    };

    const handleDelete = (id) => {
        const row = tableData.find((employee) => employee.id === id);
        console.log(row);

        setDeletingRow(row);
    };

    const confirmDelete = () => {
        setTableData((prevData) =>
            prevData.filter((row) => row.id !== deletingRow.id)
        );
        setDeletingRow(null);
    };

    const fetchEmployees = async (page) => {
        try {
            const skip = (page - 1) * rowsPerPage;
            const data = await apiGET(
                `/users?limit=${rowsPerPage}&skip=${skip}`
            );
            console.log(data);
            setTotalUsers(data?.total || 0)
            const formattedData = data.users.map((user) => ({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                status: "active",
                employeeId: `#${user.id}`,
                role: user.company?.title || "N/A",
                employementType: "Full Time",
                teams: user.company?.department
                    ? [user.company.department]
                    : [],
            }));

            setTableData(formattedData);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= Math.ceil(totalUsers / rowsPerPage)) {
            setCurrentPage(page);
        }
    };

    useEffect(() => {
        fetchEmployees(currentPage);
    }, [currentPage]);

    return (
        <div className="">
            <div className="flex flex-col md:flex-row justify-between mb-5">
                <div className="font-semibold text-3xl">Employees</div>
                <div className="flex gap-4 mt-6 md:mt-0">
                    <button className="px-6 h-10 hover:bg-gray-100  text-sm md:text-base flex gap-3 justify-center items-center border rounded-lg">
                        <Download className="w-5 h-5" /> Export
                    </button>
                    <button
                        className="px-6 h-10 bg-black text-white hover:bg-gray-700 text-sm md:text-base  rounded-lg flex gap-3 justify-center items-center"
                        onClick={() =>
                            setNewEmployee({
                                firstName: "",
                                lastName: "",
                                email: "",
                                status: "active",
                                employeeId: `#${Math.random()
                                    .toString(36)
                                    .substr(2, 9)}`,
                                role: "",
                                employementType: "Full Time",
                                teams: [],
                            })
                        }
                    >
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
                <button className="px-6 h-10 flex gap-3 justify-center items-center border rounded-lg hover:bg-gray-100">
                    <ListFilter className="w-5 h-5" /> Filter
                </button>
            </div>
            <Dialog
                open={!!deletingRow}
                onOpenChange={(open) => !open && setDeletingRow(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Delete</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this row? This
                            action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <button
                            className="btn btn-secondary bg-red-200 px-4 py-2 rounded-lg"
                            onClick={confirmDelete}
                        >
                            Delete
                        </button>
                        <DialogClose asChild>
                            <button className="btn btn-secondary bg-gray-200 px-4 py-2 rounded-lg">
                                Cancel
                            </button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog
                open={!!newEmployee || !!editEmployee}
                onOpenChange={(open) => {
                    if (!open) {
                        setNewEmployee(null);
                        setEditEmployee(null);
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editEmployee
                                ? "Edit Employee"
                                : "Add New Employee"}
                        </DialogTitle>
                        <DialogDescription>
                            {editEmployee
                                ? "Update the employee details."
                                : "Fill out the details to add a new employee."}
                        </DialogDescription>
                    </DialogHeader>
                    {(newEmployee || editEmployee) && (
                        <div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full border rounded-md p-2"
                                    value={
                                        editEmployee
                                            ? editEmployee.firstName
                                            : newEmployee.firstName
                                    }
                                    onChange={(e) =>
                                        editEmployee
                                            ? setEditEmployee({
                                                  ...editEmployee,
                                                  firstName: e.target.value,
                                              })
                                            : setNewEmployee({
                                                  ...newEmployee,
                                                  firstName: e.target.value,
                                              })
                                    }
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full border rounded-md p-2"
                                    value={
                                        editEmployee
                                            ? editEmployee.lastName
                                            : newEmployee.lastName
                                    }
                                    onChange={(e) =>
                                        editEmployee
                                            ? setEditEmployee({
                                                  ...editEmployee,
                                                  lastName: e.target.value,
                                              })
                                            : setNewEmployee({
                                                  ...newEmployee,
                                                  lastName: e.target.value,
                                              })
                                    }
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="w-full border rounded-md p-2"
                                    value={
                                        editEmployee
                                            ? editEmployee.email
                                            : newEmployee.email
                                    }
                                    onChange={(e) =>
                                        editEmployee
                                            ? setEditEmployee({
                                                  ...editEmployee,
                                                  email: e.target.value,
                                              })
                                            : setNewEmployee({
                                                  ...newEmployee,
                                                  email: e.target.value,
                                              })
                                    }
                                />
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <button
                            className="btn bg-green-200 px-4 py-2 rounded-lg btn-primary mr-3"
                            onClick={
                                editEmployee ? updateEmployee : addEmployee
                            }
                        >
                            {editEmployee ? "Update" : "Add"}
                        </button>
                        <DialogClose asChild>
                            <button className="btn btn-secondary bg-red-200 px-4 py-2 rounded-lg">
                                Cancel
                            </button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div>
                <EmployeeTable
                    tableData={tableData}
                    onEdit={(employee) => setEditEmployee(employee)}
                    onDelete={handleDelete}
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                    totalUsers={totalUsers}
                />
            </div>
        </div>
    );
};

export default Dashboard;

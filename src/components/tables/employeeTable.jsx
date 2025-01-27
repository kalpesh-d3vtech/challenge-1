import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "../ui/dropdown-menu";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "../ui/pagination";

import HamburgerDots from "../../assets/icons/hamburger-dots.svg";
import { Checkbox } from "../ui/checkbox";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ChevronLeft, ChevronRight } from "lucide-react";
const EmployeeTable = ({
    tableData,
    onEdit,
    onDelete,
    handlePageChange,
    currentPage,
    totalUsers,
}) => {
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState({});

    const rowsPerPage = 10;

    const totalPages = Math.ceil(totalUsers / rowsPerPage);

    const handleSelectAll = () => {
        const allSelected = !selectAll;
        setSelectAll(allSelected);
        setSelectedRows(
            allSelected
                ? rows.reduce((acc, row) => ({ ...acc, [row.id]: true }), {})
                : {}
        );
    };

    const handleRowSelect = (id) => {
        setSelectedRows((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <div className="flex flex-col h-[calc(100vh-10vh-300px)] md:h-[calc(100vh-10vh-250px)] rounded-lg">
            <div className="flex-1 overflow-y-auto">
                <Table className="border  ">
                    <TableHeader>
                        <TableRow className="bg-gray-100 ">
                            <TableHead className="w-[50px] py-4">
                                <Checkbox
                                    checked={selectAll}
                                    onCheckedChange={handleSelectAll}
                                    aria-label="Select all"
                                />
                            </TableHead>
                            <TableHead className="w-[250px]">Name</TableHead>
                            <TableHead className="w-[200px]">
                                Employee ID
                            </TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="w-[200px]">Teams</TableHead>
                            <TableHead className="w-[100px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="">
                        {tableData.length > 0 ? (
                            tableData.map((row) => (
                                <TableRow key={row.id} className="py-2">
                                    <TableCell className="w-[50px] ">
                                        <Checkbox
                                            checked={!!selectedRows[row.id]}
                                            onCheckedChange={() =>
                                                handleRowSelect(row.id)
                                            }
                                            aria-label={`Select row ${row.id}`}
                                        />
                                    </TableCell>
                                    <TableCell className="w-[250px]">
                                        <div className="flex items-center gap-2">
                                            <Avatar className="">
                                                <AvatarFallback className="bg-[#d7747425]">
                                                    {row.firstName[0]}
                                                    {row.lastName[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="text-sm">
                                                <div>
                                                    {row.firstName +
                                                        " " +
                                                        row.lastName}
                                                </div>
                                                {row.email}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        <span className="bg-gray-300 rounded-full  !text-xs  px-2 py-1">
                                            {row.employeeId}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">
                                            {row.role}
                                        </div>
                                        <div className="text-xs">
                                            {row.employementType}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {row.status == "active" ? (
                                            <div className="text-green-500 bg-green-100 w-[90px] px-2 py-1 rounded-full flex items-center gap-2 justify-center">
                                                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                                                Active
                                            </div>
                                        ) : (
                                            <div className="text-red-500 bg-red-100 w-[120px] px-2 py-1 rounded-full flex items-center gap-2 justify-center">
                                                <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                                                In Active
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell className="">
                                        <div className="flex gap-2">
                                            {row?.teams?.length > 0
                                                ? row.teams?.map(
                                                      (team, index) => (
                                                          <div
                                                              key={`${row.id}-${team}-${index}`}
                                                              className="text-xs bg-gray-200 px-2 py-1 rounded-full font-medium flex items-center gap-1"
                                                          >
                                                              {team}
                                                          </div>
                                                      )
                                                  )
                                                : ""}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger
                                                asChild
                                                className="flex justify-end"
                                            >
                                                <button
                                                    className=" w-full justify-end px-4"
                                                    aria-label="Options"
                                                >
                                                    <img
                                                        src={HamburgerDots}
                                                        alt="HamburgerDots"
                                                        className="w-10 h-10 md:w-4 md:h-4"
                                                    />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem
                                                    onClick={() => onEdit(row)}
                                                >
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        onDelete(row.id)
                                                    }
                                                >
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan="6">
                                    No rows available.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <Pagination className="p-4 bg-gray-100">
                    <PaginationContent className="flex justify-between w-full">
                        <PaginationItem>
                            <PaginationLink
                                onClick={() =>
                                    handlePageChange(currentPage - 1)
                                }
                                disabled={currentPage === 1}
                                aria-label="Previous"
                                className={
                                    "border bg-white w-28 cursor-pointer"
                                }
                            >
                                <ChevronLeft /> Previous
                            </PaginationLink>
                        </PaginationItem>

                        {/* Page Numbers */}
                        <div className="flex gap-1">
                            {totalPages <= 4 ? (
                                Array.from({ length: totalPages }).map(
                                    (_, index) => (
                                        <PaginationItem key={index}>
                                            <PaginationLink
                                                isActive={
                                                    currentPage === index + 1
                                                }
                                                onClick={() =>
                                                    handlePageChange(index + 1)
                                                }
                                            >
                                                {index + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    )
                                )
                            ) : (
                                <>
                                    <PaginationItem>
                                        <PaginationLink
                                            isActive={currentPage === 1}
                                            onClick={() => handlePageChange(1)}
                                        >
                                            1
                                        </PaginationLink>
                                    </PaginationItem>

                                    {currentPage > 2 && (
                                        <PaginationItem>
                                            <PaginationLink
                                                className="cursor-default"
                                                disabled
                                            >
                                                ...
                                            </PaginationLink>
                                        </PaginationItem>
                                    )}

                                    {Array.from({ length: 3 })
                                        .map(
                                            (_, index) =>
                                                currentPage - 1 + index
                                        )
                                        .filter(
                                            (page) =>
                                                page > 1 && page < totalPages
                                        )
                                        .map((page) => (
                                            <PaginationItem key={page}>
                                                <PaginationLink
                                                    isActive={
                                                        currentPage === page
                                                    }
                                                    onClick={() =>
                                                        handlePageChange(page)
                                                    }
                                                >
                                                    {page}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ))}

                                    {currentPage < totalPages - 1 && (
                                        <PaginationItem>
                                            <PaginationLink
                                                className="cursor-default"
                                                disabled
                                            >
                                                ...
                                            </PaginationLink>
                                        </PaginationItem>
                                    )}

                                    <PaginationItem>
                                        <PaginationLink
                                            isActive={
                                                currentPage === totalPages
                                            }
                                            onClick={() =>
                                                handlePageChange(totalPages)
                                            }
                                        >
                                            {totalPages}
                                        </PaginationLink>
                                    </PaginationItem>
                                </>
                            )}
                        </div>

                        <PaginationItem>
                            <PaginationLink
                                onClick={() =>
                                    handlePageChange(currentPage + 1)
                                }
                                disabled={currentPage === totalPages}
                                aria-label="Next"
                                className={
                                    "border w-28 bg-white cursor-pointer"
                                }
                            >
                                Next <ChevronRight />
                            </PaginationLink>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
};

export default EmployeeTable;

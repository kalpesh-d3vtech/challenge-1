import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
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
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "../ui/dialog";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
} from "../ui/pagination";

import HamburgerDots from "../../assets/icons/hamburger-dots.svg";
import { Checkbox } from "../ui/checkbox";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ChevronLeft, ChevronRight } from "lucide-react";
const EmployeeTable = ({ tableData }) => {
    const [rows, setRows] = useState(tableData);

    const [editingRow, setEditingRow] = useState(null);
    const [deletingRow, setDeletingRow] = useState(null);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedRows, setPaginatedRows] = useState([]);

    const rowsPerPage = 5;

    const totalPages = Math.ceil(rows.length / rowsPerPage);

    useEffect(() => {
        const startIdx = (currentPage - 1) * rowsPerPage;
        const endIdx = startIdx + rowsPerPage;
        const newPaginatedRows = rows.slice(startIdx, endIdx);
        setPaginatedRows(newPaginatedRows);
    }, [rows, currentPage, rowsPerPage]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleEdit = (row) => setEditingRow(row);
    const handleDelete = (row) => setDeletingRow(row);

    const saveEdit = () => {
        setRows((prevRows) =>
            prevRows.map((row) => (row.id === editingRow.id ? editingRow : row))
        );
        setEditingRow(null);
    };

    const confirmDelete = () => {
        setRows((prevRows) =>
            prevRows.filter((row) => row.id !== deletingRow.id)
        );
        setDeletingRow(null);
    };

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
        <div>
            <Table className="border h-[30vh] ">
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
                        <TableHead className="w-[200px]">Employee ID</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[200px]">Teams</TableHead>
                        <TableHead className="w-[100px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="">
                    {paginatedRows.length > 0 ? (
                        paginatedRows.map((row) => (
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
                                            ? row.teams?.map((team, index) => (
                                                  <div
                                                      key={`${row.id}-${team}-${index}`}
                                                      className="text-xs bg-gray-200 px-2 py-1 rounded-full font-medium flex items-center gap-1"
                                                  >
                                                      {team}
                                                  </div>
                                              ))
                                            : ""}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger
                                            asChild
                                            className="flex justify-center"
                                        >
                                            <button
                                                className="text-muted-foreground hover:text-accent-foreground flex ml-8 justify-center"
                                                aria-label="Options"
                                            >
                                                <img
                                                    src={HamburgerDots}
                                                    alt="HamburgerDots"
                                                    className="w-4 h-4"
                                                />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem
                                                onClick={() => handleEdit(row)}
                                            >
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    handleDelete(row)
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
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            aria-label="Previous"
                            className={"border bg-white w-28 cursor-pointer"}
                        >
                            <ChevronLeft /> Previous
                        </PaginationLink>
                    </PaginationItem>
                    <div className="flex gap-1">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    isActive={currentPage === index + 1}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                    </div>
                    <PaginationItem>
                        <PaginationLink
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            aria-label="Next"
                            className={"border w-28 bg-white cursor-pointer"}
                        >
                            Next <ChevronRight />
                        </PaginationLink>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
            <Dialog
                open={!!editingRow}
                onOpenChange={(open) => !open && setEditingRow(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Row</DialogTitle>
                        <DialogDescription>
                            Modify the details of the Employee.
                        </DialogDescription>
                    </DialogHeader>
                    {editingRow && (
                        <div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full border rounded-md p-2"
                                    value={editingRow.firstName}
                                    onChange={(e) =>
                                        setEditingRow({
                                            ...editingRow,
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
                                    value={editingRow.lastName}
                                    onChange={(e) =>
                                        setEditingRow({
                                            ...editingRow,
                                            lastName: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <button
                            className="btn bg-green-200 px-4 py-2 rounded-lg btn-primary mr-3"
                            onClick={saveEdit}
                        >
                            Save
                        </button>
                        <DialogClose asChild>
                            <button className="btn btn-secondary bg-red-200 px-4 py-2 rounded-lg">
                                Cancel
                            </button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

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
                    {deletingRow && (
                        <p className="mb-4">Invoice: {deletingRow.invoice}</p>
                    )}
                    <DialogFooter>
                        <button
                            className="btn btn-danger"
                            onClick={confirmDelete}
                        >
                            Delete
                        </button>
                        <DialogClose asChild>
                            <button className="btn btn-secondary">
                                Cancel
                            </button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default EmployeeTable;

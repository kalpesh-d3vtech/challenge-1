import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import D3vLogo from "../../assets/logos/d3v-logo.png";
import { SidebarProvider, Sidebar } from "../ui/sidebar";
import { ChartPie, LogOut, Newspaper, Settings, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const menuItems = [
    {
        icon: <Users className="w-4" />,
        label: "Employees",
        children: [
            { label: "All Employees", path: "/dashboard" },
            { label: "Recent Hires", path: "#" },
        ],
    },
    { icon: <Newspaper className="w-4" />, label: "Payroll", path: "#" },
    { icon: <ChartPie className="w-4" />, label: "Report", path: "#" },
    { icon: <Settings className="w-4" />, label: "Settings", path: "#" },
];

const SidebarComp = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const [openMenu, setOpenMenu] = useState(() => {
        const activeMenuIndex = menuItems.findIndex(
            (item) =>
                item.children &&
                item.children.some((child) => location.pathname === child.path)
        );
        return activeMenuIndex !== -1 ? activeMenuIndex : null;
    });
    const toggleMenu = (menu) => {
        setOpenMenu((prev) => (prev === menu ? null : menu));
    };

    const isActive = (path) => location.pathname === path;

    const isParentActive = (children) =>
        children.some((child) => isActive(child.path));

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("email");

        navigate("/");

        window.location.reload();
    };

    return (
        <SidebarProvider className="w-[261px] bg-white flex flex-col border-l">
            <Sidebar>
                <Link
                    to={"/dashboard"}
                    className="py-4 px-8 text-2xl font-bold h-[14vh]"
                >
                    <img src={D3vLogo} alt="D3V Logo" />
                </Link>
                <nav className="max-h-full overflow-auto h-full mt-6">
                    <ul className="space-y-2 px-4">
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                {item.children ? (
                                    <div>
                                        <div
                                            className={` px-4 py-2 cursor-pointer flex items-center gap-2 hover:bg-blue-500 ${
                                                isParentActive(item.children) ||
                                                openMenu === index
                                                    ? "bg-black rounded-2xl text-white"
                                                    : ""
                                            }`}
                                            onClick={() => toggleMenu(index)}
                                        >
                                            {item?.icon ? item.icon : ""}
                                            {item.label}
                                        </div>
                                        <div
                                            className={`ml-4 overflow-hidden transition-all duration-500 ease-in-out ${
                                                openMenu === index
                                                    ? "max-h-screen mt-2"
                                                    : "max-h-0"
                                            }`}
                                        >
                                            <ul className="space-y-2">
                                                {item.children.map(
                                                    (child, idx) => (
                                                        <li key={idx}>
                                                            <Link
                                                                to={child.path}
                                                                className={`flex items-center gap-3 px-4 py-2 hover:bg-blue-500 ${
                                                                    isActive(
                                                                        child.path
                                                                    )
                                                                        ? "font-bold "
                                                                        : ""
                                                                }`}
                                                            >
                                                                {isActive(
                                                                    child.path
                                                                ) ? (
                                                                    <div className="w-2 h-2 rounded-full bg-black"></div>
                                                                ) : (
                                                                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                                                                )}

                                                                {child.label}
                                                            </Link>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        to={item.path}
                                        className={`flex items-center gap-3 px-4 py-2 hover:bg-blue-500 ${
                                            isActive(item.path)
                                                ? "bg-black text-white"
                                                : ""
                                        }`}
                                    >
                                        {item?.icon ? item.icon : ""}
                                        {item.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="flex gap-4 items-center  h-20 border-t">
                    <div
                        onClick={handleLogout}
                        className="px-8 cursor-pointer py-2 flex items-center gap-3 font-medium bg-blue-500 rounded-xl hover:bg-blue-600"
                    >
                        <LogOut />
                        Logout
                    </div>
                </div>
            </Sidebar>
        </SidebarProvider>
    );
};

export default SidebarComp;

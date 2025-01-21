import React from "react";
import { Outlet, Link } from "react-router-dom";

const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen">
            <aside className="w-64 bg-blue-600 text-white">
                <div className="p-4 text-2xl font-bold">D3V Dashboard</div>
                <nav className="mt-4">
                    <ul>
                        <li>
                            <Link
                                to="/dashboard"
                                className="block px-4 py-2 hover:bg-blue-500"
                            >
                                Dashboard
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>

            <main className="flex-1 p-6 bg-gray-50">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;

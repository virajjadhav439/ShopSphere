import React from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <div className="flex min-h-screen">

            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white p-5">
                <h2 className="text-2xl font-bold">Admin Panel</h2>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 bg-slate-100">
                <Outlet />
            </main>

        </div>
    );
};

export default AdminLayout;
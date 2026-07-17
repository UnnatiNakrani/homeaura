import { Outlet } from "react-router-dom";
import Sidebar from "./layout/Sidebar";

function AdminLayout() {
    return (
        <div className="admin-layout">
            <Sidebar />

            <div className="admin-content">
                <Outlet />
            </div>
        </div>
    );
}

export default AdminLayout;
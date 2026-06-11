import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function AdminLayout() {
    return (
        <div className="admin-layout">
            <Sidebar />

            <div className="admin-content">
                {/* <Topbar /> */}

                <Outlet />
            </div>
        </div>
    );
}

export default AdminLayout;
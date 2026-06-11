import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <aside className="admin-sidebar">

            <div className="admin-logo">
                Furni Admin
            </div>

            <ul className="admin-menu">

                <li>
                    <NavLink to="/admin/dashboard">
                        <i className="bi bi-speedometer2"></i>
                        Dashboard
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/admin/products">
                        <i className="bi bi-box-seam"></i>
                        Products
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/admin/categories">
                        <i className="bi bi-grid"></i>
                        Categories
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/admin/orders">
                        <i className="bi bi-bag-check"></i>
                        Orders
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/admin/users">
                        <i className="bi bi-people"></i>
                        Users
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/admin/blogs">
                        <i className="bi bi-journal-text"></i>
                        Blogs
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/admin/media">
                        <i className="bi bi-images"></i>
                        Media Library
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/admin/analytics">
                        <i className="bi bi-bar-chart"></i>
                        Analytics
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/admin/support">
                        <i className="bi bi-chat-dots"></i>
                        Support
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/admin/settings">
                        <i className="bi bi-gear"></i>
                        Settings
                    </NavLink>
                </li>

            </ul>
        </aside>
    );
}

export default Sidebar;
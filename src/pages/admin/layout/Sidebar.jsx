import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <aside className="admin-sidebar">

            <div className="admin-logo">
                Furni Admin
            </div>

            <ul className="admin-menu">

                <li>
                    <NavLink to="/dashboard">
                        <i className="bi bi-speedometer2"></i>
                        Dashboard
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/products">
                        <i className="bi bi-box-seam"></i>
                        Products
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/categories">
                        <i className="bi bi-grid"></i>
                        Categories
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/orders">
                        <i className="bi bi-bag-check"></i>
                        Orders
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/users">
                        <i className="bi bi-people"></i>
                        Users
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/blogs">
                        <i className="bi bi-journal-text"></i>
                        Blogs
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/media">
                        <i className="bi bi-images"></i>
                        Media Library
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/analytics">
                        <i className="bi bi-bar-chart"></i>
                        Analytics
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/support">
                        <i className="bi bi-chat-dots"></i>
                        Support
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/settings">
                        <i className="bi bi-gear"></i>
                        Settings
                    </NavLink>
                </li>

            </ul>
        </aside>
    );
}

export default Sidebar;
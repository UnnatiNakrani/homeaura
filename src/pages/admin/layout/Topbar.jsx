import React from "react";
import { useNavigate } from "react-router-dom";
import { authLogout } from "../../../helper/AuthHelper";

function Topbar() {

    const navigate = useNavigate();

    const handleLogout = async () => {
        await authLogout();
        navigate("/login");
    };

    return (
        <header
            className="d-flex justify-content-between align-items-center px-4 py-3 bg-white border-bottom shadow-sm"
            style={{
                height: "70px",
                position: "sticky",
                top: 0,
                zIndex: 1000,
            }}
        >

            {/* Left Side */}
            <div>
                <h4 className="mb-0 fw-bold">
                    Dashboard
                </h4>
                <small className="text-muted">
                    Welcome back, Admin 👋
                </small>
            </div>

            {/* Right Side */}
            <div className="d-flex align-items-center gap-3">

                {/* Search */}
                <div className="position-relative">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                        style={{
                            width: "250px",
                            paddingLeft: "40px"
                        }}
                    />

                    <i
                        className="bi bi-search position-absolute"
                        style={{
                            left: "15px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "#888"
                        }}
                    ></i>
                </div>

                {/* Notification */}
                <button className="btn btn-light position-relative">

                    <i className="bi bi-bell fs-5"></i>

                    <span
                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    >
                        3
                    </span>

                </button>

                {/* Profile */}
                <div className="dropdown">

                    <button
                        className="btn btn-light dropdown-toggle d-flex align-items-center"
                        data-bs-toggle="dropdown"
                    >

                        <img
                            src="https://ui-avatars.com/api/?name=Admin"
                            alt="Admin"
                            width="40"
                            height="40"
                            className="rounded-circle me-2"
                        />

                        <span>Admin</span>

                    </button>

                    <ul className="dropdown-menu dropdown-menu-end">

                        <li>
                            <button className="dropdown-item">
                                <i className="bi bi-person me-2"></i>
                                Profile
                            </button>
                        </li>

                        <li>
                            <button className="dropdown-item">
                                <i className="bi bi-gear me-2"></i>
                                Settings
                            </button>
                        </li>

                        <li>
                            <hr className="dropdown-divider" />
                        </li>

                        <li>
                            <button
                                className="dropdown-item text-danger"
                                onClick={handleLogout}
                            >
                                <i className="bi bi-box-arrow-right me-2"></i>
                                Logout
                            </button>
                        </li>

                    </ul>

                </div>

            </div>

        </header>
    );
}

export default Topbar;
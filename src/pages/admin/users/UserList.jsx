import { Link } from "react-router-dom";

function UserList() {

    const users = [
        {
            id: 1,
            name: "John Doe",
            email: "john@gmail.com",
            role: "Customer",
            status: "Active"
        },
        {
            id: 2,
            name: "Emma Watson",
            email: "emma@gmail.com",
            role: "Customer",
            status: "Inactive"
        }
    ];

    return (
        <div className="admin-card">

            <div className="page-header">
                <h2 className="page-title">
                    Users
                </h2>
            </div>

            <div className="table-responsive">

                <table className="table align-middle">

                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {users.map((user, index) => (
                            <tr key={user.id}>

                                <td>{index + 1}</td>

                                <td>
                                    <div className="d-flex align-items-center">
                                        <img
                                            src="https://via.placeholder.com/50"
                                            alt=""
                                            className="rounded-circle me-2"
                                            width="40"
                                            height="40"
                                        />

                                        {user.name}
                                    </div>
                                </td>

                                <td>{user.email}</td>

                                <td>{user.role}</td>

                                <td>

                                    <span
                                        className={
                                            user.status === "Active"
                                                ? "status status-success"
                                                : "status status-danger"
                                        }
                                    >
                                        {user.status}
                                    </span>

                                </td>

                                <td>

                                    <Link
                                        to={`/admin/users/${user.id}`}
                                        className="btn btn-admin btn-sm"
                                    >
                                        View
                                    </Link>

                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default UserList;
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

function UserList() {

const [users, setUsers] = useState([]);
useEffect(() => {
    getUsers();
}, []);

const getUsers = async () => {
    try {
        const snapshot = await getDocs(collection(db, "users"));

        const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        setUsers(data);

    } catch (error) {
        console.log(error);
    }
};

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
    src={
        user.image ||
        `https://ui-avatars.com/api/?name=${user.fname}+${user.lname}`
    }
    alt=""
    className="rounded-circle me-2"
    width="40"
    height="40"
/>
{user.fname} {user.lname}
                                    </div>
                                </td>

                                <td>{user.email}</td>

                                <td>{user.role}</td>

                                <td>

                                    
<span
    className={
        user.isDeleted
            ? "status status-danger"
            : "status status-success"
    }
>
    {user.isDeleted ? "Inactive" : "Active"}
</span>                                    

                                </td>

                                <td>

                                    <Link
                                        to={`/users/${user.id}`}
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
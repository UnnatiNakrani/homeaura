import React from "react";

function ProfileCard({ user }) {
  if (!user) {
    return (
      <div className="text-center py-5">
        <h5>Loading Profile...</h5>
      </div>
    );
  }

  return (
    <div className="card shadow border-0">
      <div className="card-header bg-dark text-white">
        <h4 className="mb-0">My Profile</h4>
      </div>
      <div className="card-body">
        <div className="text-center mb-4">
          <img
            src={
              user.image
                ? user.image
                : "https://ui-avatars.com/api/?name=" +
                  encodeURIComponent(user.name)
            }
            alt={user.name}
            className="rounded-circle border"
            width="140"
            height="140"
            style={{
              objectFit: "cover",
            }}
          />

          <h3 className="mt-3 mb-1">
            {user.name}
          </h3>

          <span className="badge bg-success">
            {user.role}
          </span>

        </div>

        <table className="table">

          <tbody>

            <tr>
              <th width="180">Email</th>
              <td>{user.email}</td>
            </tr>

            <tr>
              <th>Mobile</th>
              <td>{user.mobile || "-"}</td>
            </tr>

            <tr>
              <th>Gender</th>
              <td>{user.gender || "-"}</td>
            </tr>

            <tr>
              <th>Date of Birth</th>
              <td>{user.dob || "-"}</td>
            </tr>

            <tr>
              <th>Address</th>
              <td>{user.address || "-"}</td>
            </tr>

            <tr>
              <th>City</th>
              <td>{user.city || "-"}</td>
            </tr>

            <tr>
              <th>State</th>
              <td>{user.state || "-"}</td>
            </tr>

            <tr>
              <th>Pincode</th>
              <td>{user.pincode || "-"}</td>
            </tr>

            <tr>
              <th>Country</th>
              <td>{user.country || "-"}</td>
            </tr>

            <tr>
              <th>Member Since</th>
              <td>
                {user.createdAt?.toDate
                  ? user.createdAt.toDate().toLocaleDateString()
                  : "-"}
              </td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ProfileCard;
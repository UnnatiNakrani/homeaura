import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";

function InquiryList() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const getInquiries = async () => {
    try {
      const snapshot = await getDocs(collection(db, "inquiries"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Sort latest first
      data.sort((a, b) => {
        if (!a.createdAt || !b.createdAt) return 0;
        return b.createdAt.seconds - a.createdAt.seconds;
      });

      setInquiries(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInquiries();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this record?");

    if (!confirm) return;

    try {
      await deleteDoc(doc(db, "inquiries", id));

      toast.success("Record deleted successfully");

      getInquiries();
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="container-fluid">

      <div className="card shadow">

        <div className="card-header bg-dark text-white">
          <h4 className="mb-0">Contact & Newsletter</h4>
        </div>

        <div className="card-body">

          {loading ? (
            <h5 className="text-center">Loading...</h5>
          ) : (
            <div className="table-responsive">

              <table className="table table-bordered table-hover align-middle">

                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Date</th>
                    <th width="120">Action</th>
                  </tr>

                </thead>

                <tbody>

                  {inquiries.length > 0 ? (
                    inquiries.map((item, index) => (

                      <tr key={item.id}>

                        <td>{index + 1}</td>

                        <td>
                          <span>
                            {item.type}
                          </span>
                        </td>

                        <td>
                          {item.type === "contact"
                            ? `${item.fname} ${item.lname}`
                            : item.name}
                        </td>

                        <td>{item.email}</td>

                        <td>
                          {item.type === "contact"
                            ? item.message
                            : "-"}
                        </td>

                        <td>
                          {item.createdAt
                            ? item.createdAt.toDate().toLocaleDateString()
                            : "-"}
                        </td>

                        <td>

                          <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(item.id)}
                        title="Delete"
                      >
                        <i className="bi bi-trash"></i>
                      </button>

                        </td>

                      </tr>

                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center"
                      >
                        No Records Found
                      </td>
                    </tr>
                  )}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default InquiryList;
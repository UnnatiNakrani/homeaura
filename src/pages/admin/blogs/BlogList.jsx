import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "../../../firebase";

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    try {
      setLoading(true);

      const q = query(
        collection(db, "blogs"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBlogs(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "blogs", id));

      alert("Blog deleted successfully.");

      getBlogs();
    } catch (error) {
      console.log(error);
      alert("Failed to delete blog.");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <h5>Loading...</h5>
      </div>
    );
  }

  return (
    <>
      {blogs.length === 0 ? (
        <div className="text-center py-5">
          <h4>No Blogs Found</h4>
        </div>
      ) : (
        <div className="table-responsive">

          <table className="table table-bordered table-hover align-middle">

            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Author</th>
                <th>Status</th>
                <th>Date</th>
                <th width="220">Actions</th>
              </tr>
            </thead>

            <tbody>

              {blogs.map((blog) => (

                <tr key={blog.id}>

                  <td width="100">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      width="80"
                      height="80"
                      style={{
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </td>

                  <td>{blog.title}</td>

                  <td>{blog.category}</td>

                  <td>{blog.author}</td>
                  <td>
                    <span
                      className="badge"
                      style={{ backgroundColor: "green", color: "white" }}
                    >
                      {blog.status}
                    </span>
                  </td>
                  <td>
                    {blog.createdAt?.seconds
                      ? new Date(
                        blog.createdAt.seconds * 1000
                      ).toLocaleDateString()
                      : "-"}
                  </td>

                  <td>

                    <Link
                      to={`/blog/${blog.slug}`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      View
                    </Link>

                    <Link
                      to={`/products/edit/${blog.id}`}
                      className="btn btn-sm btn-outline-primary"
                      title="Edit"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Link>


                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(blog.id)}
                      title="Delete"
                    >
                      <i className="bi bi-trash"></i>
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}
    </>
  );
}

export default BlogList;
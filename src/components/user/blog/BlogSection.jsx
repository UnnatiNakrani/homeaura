import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { db } from "../../../firebase";
import BlogCard from "./BlogCard";

function BlogSection({ limit }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogs();
  }, []);

const getBlogs = async () => {
  try {
    setLoading(true);

    const snapshot = await getDocs(collection(db, "blogs"));

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Blogs:", data);

    setBlogs(data);
  } catch (error) {
    console.error("Firestore Error:", error);
  } finally {
    setLoading(false);
  }
};

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h4>Loading...</h4>
      </div>
    );
  }

  const displayBlogs = limit
    ? blogs.slice(0, limit)
    : blogs;

  return (
    <div className="blog-section py-5">
      <div className="container">
        <div className="row">

          {displayBlogs.length === 0 ? (
            <div className="col-12 text-center">
              <h4>No Blogs Found</h4>
            </div>
          ) : (
            displayBlogs.map((blog) => (
              <div
                className="col-md-6 col-lg-4 mb-5"
                key={blog.id}
              >
                <BlogCard blog={blog} />
              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
}

export default BlogSection;
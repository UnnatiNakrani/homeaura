import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "../../firebase";

import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

function BlogDetails() {

  const { slug } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlog();
  }, [slug]);

  const getBlog = async () => {
    try {
      setLoading(true);

      const q = query(
        collection(db, "blogs"),
        where("slug", "==", slug),
        where("status", "==", "Published")
      );

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        setBlog({
          id: snapshot.docs[0].id,
          ...snapshot.docs[0].data(),
        });
      } else {
        setBlog(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="container py-5 text-center">
          <h3>Loading...</h3>
        </div>
        <Footer />
      </>
    );
  }

  if (!blog) {
    return (
      <>
        <Header />

        <div className="container py-5 text-center">

          <h2>Blog Not Found</h2>

          <Link
            to="/blog"
            className="btn btn-success mt-3"
          >
            Back to Blogs
          </Link>

        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="container py-5">

        <Link
          to="/blog"
          className="btn btn-outline-success mb-4"
        >
          ← Back to Blogs
        </Link>

        <img
          src={blog.image}
          alt={blog.title}
          className="img-fluid rounded mb-4"
          style={{
            width: "100%",
            maxHeight: "500px",
            objectFit: "cover",
          }}
        />

        <h1>{blog.title}</h1>

        <div className="mb-4 text-muted">

          <span>
            <strong>Author:</strong> {blog.author}
          </span>

          <span className="mx-3">|</span>

          <span>
            <strong>Category:</strong> {blog.category}
          </span>

          <span className="mx-3">|</span>

          <span>
            <strong>Date:</strong>{" "}
            {blog.createdAt?.seconds
              ? new Date(
                  blog.createdAt.seconds * 1000
                ).toLocaleDateString()
              : ""}
          </span>

        </div>

        <p className="lead">
          {blog.description}
        </p>

        <hr />

        <div
          style={{
            whiteSpace: "pre-line",
            lineHeight: "1.9",
            fontSize: "17px",
          }}
        >
          {blog.content}
        </div>

      </div>

      <Footer />
    </>
  );
}

export default BlogDetails;
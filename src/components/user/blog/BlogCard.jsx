import React from "react";
import { Link } from "react-router-dom";

function BlogCard({ blog }) {
    return (
        <div className="post-entry h-100">

            {/* Blog Image */}
            <Link
                to={`/blog/${blog.slug}`}
                className="post-thumbnail d-block"
            >
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="img-fluid rounded"
                    style={{
                        width: "100%",
                        height: "250px",
                        objectFit: "cover",
                    }}
                />
            </Link>

            {/* Blog Content */}
            <div className="post-content-entry mt-3">

                <h3>
                    <Link
                        to={`/blog/${blog.slug}`}
                        className="text-decoration-none text-dark"
                    >
                        {blog.title}
                    </Link>
                </h3>

                <p className="text-muted">
                    {blog.description}
                </p>

                <div className="meta mb-3">

                    <span>
                        By <strong>{blog.author}</strong>
                    </span>

                    <br />

                    <span>
                        {blog.createdAt?.seconds
                            ? new Date(
                                  blog.createdAt.seconds * 1000
                              ).toLocaleDateString()
                            : ""}
                    </span>

                </div>

                <Link
                    to={`/blog/${blog.slug}`}
                    className="btn btn-success btn-sm"
                >
                    Read More
                </Link>

            </div>

        </div>
    );
}

export default BlogCard;
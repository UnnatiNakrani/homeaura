import React from "react";
import { Link } from "react-router-dom";
import BlogList from "./BlogList";

function BlogManager() {
    return (
        <div className="container-fluid">

            {/* Page Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="mb-1">Blog Manager</h2>
                    <p className="text-muted mb-0">
                        Manage all blog posts
                    </p>
                </div>

                <Link
                    to="/blogs/create"
                    className="btn btn-success"
                >
                    <i className="bi bi-plus-circle me-2"></i>
                    Add Blog
                </Link>
            </div>

            {/* Blog List */}
            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <BlogList />
                </div>
            </div>

        </div>
    );
}

export default BlogManager;


function BlogManager() {

    const blogs = [
        {
            id: 1,
            image: "https://via.placeholder.com/80",
            title: "Modern Furniture Trends",
            category: "Furniture",
            status: "Published",
            date: "10 Jun 2026"
        },
        {
            id: 2,
            image: "https://via.placeholder.com/80",
            title: "Interior Design Tips",
            category: "Interior",
            status: "Draft",
            date: "12 Jun 2026"
        }
    ];

    return (
        <div className="admin-card">

            <div className="page-header">

                <h2 className="page-title">
                    Blog Manager
                </h2>

                <button className="btn btn-admin">
                    Add Blog
                </button>

            </div>

            <div className="table-responsive">

                <table className="table align-middle">

                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th width="180">Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {blogs.map((blog) => (

                            <tr key={blog.id}>

                                <td>
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        width="70"
                                        height="70"
                                        style={{
                                            objectFit: "cover",
                                            borderRadius: "10px"
                                        }}
                                    />
                                </td>

                                <td>{blog.title}</td>

                                <td>{blog.category}</td>

                                <td>

                                    <span
                                        className={
                                            blog.status === "Published"
                                                ? "status status-success"
                                                : "status status-warning"
                                        }
                                    >
                                        {blog.status}
                                    </span>

                                </td>

                                <td>{blog.date}</td>

                                <td>

                                    <button
                                        className="btn btn-sm btn-warning me-2"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-sm btn-danger"
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default BlogManager;
import React from "react";

function CategoryForm({
    values,
    handleChange,
    handleSubmit,
    buttonText = "Save"
}) {
    return (
        <form onSubmit={handleSubmit}>

            <div className="admin-card">

                <div className="mb-3">
                    <label className="form-label">
                        Category Name
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Slug
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        name="slug"
                        value={values.slug}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Description
                    </label>

                    <textarea
                        rows="4"
                        className="form-control"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Image
                    </label>

                    <input
                        type="file"
                        className="form-control"
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label">
                        Status
                    </label>

                    <select
                        className="form-select"
                        name="status"
                        value={values.status}
                        onChange={handleChange}
                    >
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>
                </div>

                <button
                    className="btn btn-admin"
                    type="submit"
                >
                    {buttonText}
                </button>

            </div>

        </form>
    );
}

export default CategoryForm;
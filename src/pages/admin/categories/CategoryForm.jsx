import React from "react";

function CategoryForm(props) {
//   console.log("Props:", props);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    // handleImageChange,
    buttonText,
  } = props;
    return (
        <form onSubmit={handleSubmit}>

            <div className="card shadow border-0">

                <div className="card-header bg-dark text-white">
                    <h4 className="mb-0">
                        Category Information
                    </h4>
                </div>

                <div className="card-body">

                    {/* Name */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">
                            Category Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            className={`form-control ${touched.name && errors.name ? "is-invalid" : ""
                                }`}
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter category name"
                        />

                        {touched.name && errors.name && (
                            <div className="invalid-feedback">
                                {errors.name}
                            </div>
                        )}
                    </div> 

                    {/* Slug */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">
                            Slug
                        </label>

                        <input
                            type="text"
                            name="slug"
                            className={`form-control ${touched.slug && errors.slug ? "is-invalid" : ""
                                }`}
                            value={values.slug}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="living-room"
                        />

                        {touched.slug && errors.slug && (
                            <div className="invalid-feedback">
                                {errors.slug}
                            </div>
                        )}
                    </div>

                    {/* Parent Category */}
                    <div className="mb-3">

                        <label className="form-label fw-bold">
                            Parent Category
                        </label>

                        <select
                            name="parentId"
                            className="form-select"
                            value={values.parentId}
                            onChange={handleChange}
                        >

                            <option value="">
                                No Parent Category
                            </option>

                            <option value="living-room">
                                Living Room
                            </option>

                            <option value="bedroom">
                                Bedroom
                            </option>

                            <option value="office">
                                Office
                            </option>

                        </select>

                    </div>

                    {/* Description */}
                    <div className="mb-3">

                        <label className="form-label fw-bold">
                            Description
                        </label>

                        <textarea
                            rows="5"
                            name="description"
                            className={`form-control ${touched.description && errors.description
                                ? "is-invalid"
                                : ""
                                }`}
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter category description"
                        />

                        {touched.description && errors.description && (
                            <div className="invalid-feedback">
                                {errors.description}
                            </div>
                        )}

                    </div>

                    {/* Image */}
                    {/* <div className="mb-4">

                        <label className="form-label fw-bold">
                            Category Image
                        </label>

                        <input
                            type="file"
                            className={`form-control ${touched.image && errors.image
                                ? "is-invalid"
                                : ""
                                }`}
                            accept="image/*"
                            onChange={handleImageChange}
                        />

                        {touched.image && errors.image && (
                            <div className="invalid-feedback">
                                {errors.image}
                            </div>
                        )}

                    </div> */}

                </div>

                <div className="card-footer text-end">

                    <button
                        type="submit"
                        className="btn btn-dark px-4"
                    >
                        {buttonText}
                    </button>

                </div>

            </div>

        </form>
    );
}

export default CategoryForm;
import React, { useState } from "react";

function MediaLibrary() {
    const [media, setMedia] = useState([
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858",
        "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8"
    ]);

    const handleUpload = (e) => {
        const files = Array.from(e.target.files);

        const imageUrls = files.map((file) =>
            URL.createObjectURL(file)
        );

        setMedia([...media, ...imageUrls]);
    };

    const handleDelete = (index) => {
        setMedia(media.filter((_, i) => i !== index));
    };

    return (
        <div className="admin-card">

            <div className="page-header">
                <h2 className="page-title">
                    Media Library
                </h2>

                <label className="btn btn-admin">
                    Upload Images

                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        hidden
                        onChange={handleUpload}
                    />
                </label>
            </div>

            <div className="media-grid">

                {media.map((image, index) => (
                    <div
                        key={index}
                        className="media-item"
                    >
                        <img
                            src={image}
                            alt="media"
                        />

                        <div className="p-3 text-center">

                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                    handleDelete(index)
                                }
                            >
                                Delete
                            </button>

                        </div>
                    </div>
                ))}

            </div>

        </div>
    );
}

export default MediaLibrary;
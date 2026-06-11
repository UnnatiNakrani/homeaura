import React, { useState } from "react";

function SiteSettings() {
    const [settings, setSettings] = useState({
        siteName: "HomeAura",
        email: "info@homeaura.com",
        phone: "+91 9876543210",
        address: "Surat, Gujarat, India",
        facebook: "",
        instagram: "",
        twitter: "",
        metaTitle: "",
        metaDescription: ""
    });

    const handleChange = (e) => {
        setSettings({
            ...settings,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(settings);

        alert("Settings Saved Successfully!");
    };

    return (
        <div className="container-fluid">

            <div className="page-header mb-4">
                <h2 className="page-title">
                    Site Settings
                </h2>
            </div>

            <form onSubmit={handleSubmit}>

                <div className="row">

                    {/* General Settings */}
                    <div className="col-lg-6 mb-4">

                        <div className="admin-card">

                            <h5 className="mb-4">
                                General Settings
                            </h5>

                            <div className="mb-3">
                                <label className="form-label">
                                    Site Name
                                </label>

                                <input
                                    type="text"
                                    name="siteName"
                                    className="form-control"
                                    value={settings.siteName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={settings.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Phone
                                </label>

                                <input
                                    type="text"
                                    name="phone"
                                    className="form-control"
                                    value={settings.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Address
                                </label>

                                <textarea
                                    className="form-control"
                                    rows="3"
                                    name="address"
                                    value={settings.address}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                    </div>

                    {/* Social Links */}
                    <div className="col-lg-6 mb-4">

                        <div className="admin-card">

                            <h5 className="mb-4">
                                Social Media
                            </h5>

                            <div className="mb-3">
                                <label>Facebook</label>

                                <input
                                    type="text"
                                    name="facebook"
                                    className="form-control"
                                    value={settings.facebook}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label>Instagram</label>

                                <input
                                    type="text"
                                    name="instagram"
                                    className="form-control"
                                    value={settings.instagram}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label>Twitter</label>

                                <input
                                    type="text"
                                    name="twitter"
                                    className="form-control"
                                    value={settings.twitter}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                    </div>

                    {/* SEO Settings */}
                    <div className="col-12 mb-4">

                        <div className="admin-card">

                            <h5 className="mb-4">
                                SEO Settings
                            </h5>

                            <div className="mb-3">
                                <label>Meta Title</label>

                                <input
                                    type="text"
                                    name="metaTitle"
                                    className="form-control"
                                    value={settings.metaTitle}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label>Meta Description</label>

                                <textarea
                                    rows="4"
                                    name="metaDescription"
                                    className="form-control"
                                    value={settings.metaDescription}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                    </div>

                </div>

                <button
                    type="submit"
                    className="btn btn-admin"
                >
                    Save Settings
                </button>

            </form>

        </div>
    );
}

export default SiteSettings;
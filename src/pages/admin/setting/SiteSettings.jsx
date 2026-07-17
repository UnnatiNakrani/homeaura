import React, { useEffect, useState } from "react";
import {
    doc,
    getDoc,
    setDoc,
    Timestamp
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../../firebase";

function SiteSettings() {
    const [settings, setSettings] = useState({
        siteName: "HomeAura",
        email: "info@homeaura.com",
        phone: "+91 9876543210",
        address: "Surat, Gujarat, India",
        metaTitle: "",
        metaDescription: ""
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        getSettings();
    }, []);

    const getSettings = async () => {
        try {
            const docRef = doc(db, "settings", "site");

            const snapshot = await getDoc(docRef);

            if (snapshot.exists()) {
                setSettings(snapshot.data());
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setSettings({
            ...settings,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            setSaving(true);

            await setDoc(
                doc(db, "settings", "site"),
                {
                    ...settings,
                    updatedAt: Timestamp.now(),
                }
            );

            toast.success("Settings Saved Successfully");

        } catch (error) {

            console.log(error);

            toast.error("Something went wrong");

        } finally {

            setSaving(false);

        }
    };

    if (loading) {
        return (
            <div className="container text-center py-5">
                <h4>Loading Settings...</h4>
            </div>
        );
    }

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
                    <div className=" mb-4">

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
                    disabled={saving}
                >
                    {saving ? "Saving..." : "Save Settings"}
                </button>
            </form>

        </div>
    );
}

export default SiteSettings;
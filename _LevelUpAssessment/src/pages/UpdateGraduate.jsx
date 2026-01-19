import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import { fetchGraduate, updateGraduate } from "../services/graduateApi";
import { formatDateInput } from "../utils/date";
import "../App.css";

const UpdateGraduate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        emailAddress: "",
        dateOfBirth: "",
    });
    const [error, setError] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const loadGraduate = async () => {
            try {
                const data = await fetchGraduate(id);
                setFormData({
                    firstName: data.firstName || "",
                    lastName: data.lastName || "",
                    phoneNumber: data.phoneNumber || "",
                    emailAddress: data.emailAddress || "",
                    dateOfBirth: formatDateInput(data.dateOfBirth),
                });
            } catch (err) {
                setError(err.message || "Unable to load graduate.");
            }
        };
        loadGraduate();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSaving(true);
        try {
            await updateGraduate(id, formData);
            navigate("/viewall");
        } catch (err) {
            setError(err.message || "Unable to update graduate.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="page-shell">
            <Navbar />
            <section className="content-wrapper">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="micro-5 uppercase text-white/60 tracking-[0.5em] text-xs md:text-sm">
                            Level Up 2024
                        </p>
                        <h2 className="orbitron-bold text-3xl md:text-5xl headline mt-2">
                            Update Graduate
                        </h2>
                    </div>
                    <div className="rainbow-bar w-40 md:w-60">
                        <span className="rainbow-blue"></span>
                        <span className="rainbow-orange"></span>
                        <span className="rainbow-green"></span>
                        <span className="rainbow-red"></span>
                    </div>
                </div>

                {error && (
                    <p className="mt-6 text-red-400 micro-5 tracking-[0.3em] text-sm uppercase">
                        {error}
                    </p>
                )}

                <form className="mt-10 grid md:grid-cols-2 gap-8" onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        <div>
                            <label className="micro-5 uppercase tracking-[0.3em] text-xs">Name</label>
                            <input
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full bg-transparent border-b border-white/40 focus:outline-none py-2 text-white form-input"
                                required
                            />
                        </div>
                        <div>
                            <label className="micro-5 uppercase tracking-[0.3em] text-xs">Phone Number</label>
                            <input
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="w-full bg-transparent border-b border-white/40 focus:outline-none py-2 text-white form-input"
                            />
                        </div>
                        <div>
                            <label className="micro-5 uppercase tracking-[0.3em] text-xs">Date Of Birth</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                className="w-full bg-transparent border-b border-white/40 focus:outline-none py-2 text-white form-input"
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <label className="micro-5 uppercase tracking-[0.3em] text-xs">Surname</label>
                            <input
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full bg-transparent border-b border-white/40 focus:outline-none py-2 text-white form-input"
                                required
                            />
                        </div>
                        <div>
                            <label className="micro-5 uppercase tracking-[0.3em] text-xs">Email Address</label>
                            <input
                                type="email"
                                name="emailAddress"
                                value={formData.emailAddress}
                                onChange={handleChange}
                                className="w-full bg-transparent border-b border-white/40 focus:outline-none py-2 text-white form-input"
                                required
                            />
                        </div>
                        <div className="flex md:justify-end">
                            <button type="submit" className="btn-pill btn-primary mt-4" disabled={isSaving}>
                                {isSaving ? "Saving..." : "Update Graduates"}
                                <img src="/assets/icons/rocket_white.webp" alt="" className="h-6" />
                            </button>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default UpdateGraduate;

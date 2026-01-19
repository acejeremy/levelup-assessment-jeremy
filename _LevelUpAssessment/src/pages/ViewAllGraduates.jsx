import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import { deleteGraduate, fetchGraduates } from "../services/graduateApi";
import "../App.css";

const ViewAllGraduates = () => {
    const [graduates, setGraduates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedGraduate, setSelectedGraduate] = useState(null);

    const loadGraduates = async () => {
        try {
            setIsLoading(true);
            const data = await fetchGraduates();
            setGraduates(data || []);
            setError("");
        } catch (err) {
            setError(err.message || "Unable to load graduates.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadGraduates();
    }, []);

    const handleDeleteConfirm = async () => {
        if (!selectedGraduate) {
            return;
        }
        try {
            await deleteGraduate(selectedGraduate.graduateId);
            setSelectedGraduate(null);
            loadGraduates();
        } catch (err) {
            setError(err.message || "Unable to delete graduate.");
        }
    };

    const renderContact = (graduate) => {
        if (graduate.emailAddress) {
            return graduate.emailAddress;
        }
        if (graduate.phoneNumber) {
            return graduate.phoneNumber;
        }
        return <span className="field-empty">Field Empty</span>;
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
                            Graduate List
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

                {isLoading ? (
                    <p className="mt-10 text-white/70 orbitron-regular">Loading graduates...</p>
                ) : (
                    <>
                        <div className="hidden md:block mt-8">
                            <table className="w-full border border-white/40 rounded-xl overflow-hidden">
                                <thead className="table-header uppercase micro-5 text-2xl">
                                    <tr>
                                        <th className="py-3 px-6 text-left">
                                            <div className="relative flex items-center gap-4">
                                                Full Name/Names
                                                <img src="/assets/icons/rocket_black.webp" className="h-6" alt="" />
                                            </div>
                                        </th>
                                        <th className="py-3 px-6 text-left">
                                            <div className="relative flex items-center gap-4">
                                                Contact Details
                                                <img src="/assets/icons/rocket_black.webp" className="h-6" alt="" />
                                            </div>
                                        </th>
                                        <th className="py-3 px-6 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-white/90">
                                    {graduates.map((graduate) => (
                                        <tr key={graduate.graduateId} className="border-t border-white/20">
                                            <td className="py-4 px-6">
                                                {graduate.firstName} {graduate.lastName}
                                            </td>
                                            <td className="py-4 px-6">{renderContact(graduate)}</td>
                                            <td className="py-4 px-6">
                                                <div className="flex gap-3">
                                                    <Link className="btn-pill btn-outline orange" to={`/customer/${graduate.graduateId}`}>
                                                        View Mode
                                                    </Link>
                                                    <Link className="btn-pill btn-outline green" to={`/update/${graduate.graduateId}`}>
                                                        Update
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        className="btn-pill btn-outline red"
                                                        onClick={() => setSelectedGraduate(graduate)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="grid md:hidden gap-4 mt-8">
                            {graduates.map((graduate) => (
                                <div key={graduate.graduateId} className="glass-panel p-4">
                                    <p className="text-lg">{graduate.firstName} {graduate.lastName}</p>
                                    <p className="text-sm mt-1">{renderContact(graduate)}</p>
                                    <div className="flex flex-wrap gap-3 mt-4">
                                        <Link className="btn-pill btn-outline orange" to={`/customer/${graduate.graduateId}`}>
                                            View
                                        </Link>
                                        <Link className="btn-pill btn-outline green" to={`/update/${graduate.graduateId}`}>
                                            Update
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn-pill btn-outline red"
                                            onClick={() => setSelectedGraduate(graduate)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </section>

            {selectedGraduate && (
                <div className="modal-backdrop">
                    <div className="modal-card">
                        <p className="micro-5 uppercase tracking-[0.4em] text-sm text-black/70">Delete Graduate</p>
                        <h3 className="orbitron-bold text-3xl mt-2">Delete</h3>
                        <p className="mt-2 text-lg">
                            {selectedGraduate.firstName} {selectedGraduate.lastName}
                        </p>
                        <div className="flex flex-col gap-3 mt-6">
                            <button type="button" className="btn-pill btn-outline red" onClick={handleDeleteConfirm}>
                                Delete
                            </button>
                            <button type="button" className="btn-pill btn-outline green" onClick={() => setSelectedGraduate(null)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewAllGraduates;

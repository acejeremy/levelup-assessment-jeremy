import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import { fetchGraduate } from "../services/graduateApi";
import { calculateAge, formatDate } from "../utils/date";
import "../App.css";

const ViewGraduate = () => {
    const { id } = useParams();
    const [graduate, setGraduate] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadGraduate = async () => {
            try {
                const data = await fetchGraduate(id);
                setGraduate(data);
            } catch (err) {
                setError(err.message || "Unable to load graduate.");
            }
        };
        loadGraduate();
    }, [id]);

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
                            View Graduate Details
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

                {graduate && (
                    <div className="mt-10">
                        <div className="bg-white text-black px-4 py-3 rounded-xl orbitron-bold text-lg md:text-2xl">
                            {graduate.firstName} {graduate.lastName}
                        </div>

                        <div className="mt-8 grid md:grid-cols-3 gap-6 text-sm md:text-base">
                            <div>
                                <p className="micro-5 uppercase tracking-[0.3em] text-xs text-white/70">Phone Number</p>
                                <p className="mt-1">{graduate.phoneNumber || "N/A"}</p>
                            </div>
                            <div>
                                <p className="micro-5 uppercase tracking-[0.3em] text-xs text-white/70">Email Address</p>
                                <p className="mt-1">{graduate.emailAddress}</p>
                            </div>
                            <div>
                                <p className="micro-5 uppercase tracking-[0.3em] text-xs text-white/70">Age</p>
                                <p className="mt-1">{graduate.age ?? calculateAge(graduate.dateOfBirth)}</p>
                            </div>
                        </div>

                        <div className="divider my-8"></div>

                        <div className="grid md:grid-cols-2 gap-6 text-sm md:text-base">
                            <div>
                                <p className="micro-5 uppercase tracking-[0.3em] text-xs text-white/70">Date Created</p>
                                <p className="mt-1">{formatDate(graduate.dateCreated)}</p>
                            </div>
                            <div>
                                <p className="micro-5 uppercase tracking-[0.3em] text-xs text-white/70">Last Edited</p>
                                <p className="mt-1">{graduate.dateEdited ? formatDate(graduate.dateEdited) : "Not edited"}</p>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default ViewGraduate;

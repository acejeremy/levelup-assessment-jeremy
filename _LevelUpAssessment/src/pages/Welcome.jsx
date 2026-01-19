import React from "react";
import { Link } from "react-router-dom";
import '../App.css';

const Welcome = () => {
    return (
        <div className="page-shell">
            <div className="content-wrapper hero-shell">
                <div className="hero-logo fade-in">
                    <img
                        src="/assets/logos/softserve-logo.webp"
                        alt="Softserve logo"
                        className="hero-logo-img"
                    />
                </div>
                <div className="hero-grid">
                    <div className="hero-copy slide-up">
                        <h1 className="hero-title micro-5">
                            <span className="hero-title-lead">Time to</span>
                            <span className="hero-title-accent">Level Up!</span>
                        </h1>
                        <p className="hero-subtitle micro-5">
                            The graduate experience
                        </p>
                        <Link to="/viewall" className="btn-pill btn-primary hero-cta">
                            View Graduates
                            <img src="/assets/icons/rocket_white.webp" alt="" className="h-6" />
                        </Link>
                    </div>
                    <div className="hero-art slide-up delay-2">
                        <img
                            src="/assets/illustrations/cover.webp"
                            alt="Level Up crew"
                            className="hero-art-img"
                        />
                    </div>
                </div>
                <div className="hero-rainbow">
                    <div className="rainbow-bar w-full max-w-xl">
                        <span className="rainbow-blue"></span>
                        <span className="rainbow-orange"></span>
                        <span className="rainbow-green"></span>
                        <span className="rainbow-red"></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcome;

import React from "react";

import '../App.css';
import '../index.css';
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className='sticky top-0 left-0 right-0 bg-black/95 backdrop-blur micro-5 md:text-3xl text-lg z-40'>
            <div className="border-b border-white/70 md:px-12 px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <img src="/assets/logos/level-up-logo.webp" className="h-8 md:h-10 md:block hidden" alt="Level Up logo" />
                    <img src="/assets/logos/level-up-logo_mini.webp" className="h-8 md:hidden block" alt="Level Up logo" />
                </div>
                <div className="flex md:gap-16 gap-6 items-center uppercase tracking-[0.2em] text-sm md:text-base">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "text-orange" : "text-white"
                        }>
                        Home
                    </NavLink>
                    <NavLink
                        to="/viewall"
                        className={({ isActive }) =>
                            isActive ? "text-orange" : "text-white"
                        }>
                        Graduate List
                    </NavLink>
                    <NavLink
                        to="/create"
                        className={({ isActive }) =>
                            isActive ? "text-orange" : "text-white"
                        }>
                        Create Graduate
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;

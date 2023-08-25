import React from "react";
import style from "./LandingPage.module.css";

import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className={style.div} >
            <h1>Welcome to World Travels...</h1>
            <Link to= "/home">
                <p>We are a company that since 2010 provides the highest quality in trips across the 7 continents.</p>
                <p>Here begins your next adventure...</p>
                <button>GO !!</button>
            </Link>
        </div>
    )
}

export default LandingPage;
import React from "react";
import { Link, useLocation } from "react-router-dom";

const MenuItem = ({ icon, title, link }) => {

    const location = useLocation()
    const pathName = location.pathname

    return (
        <Link to={link} className={`nav-item text-decoration-none ps-3 py-3 user-select-none fw-bold ${pathName.includes(link) ? "text-primary" : "text-black-50"}`}>
            <span className='pe-2 fs-5'>{icon}</span>
            <span style={{ fontSize: '14px' }}>{title}</span>
        </Link>
    );
}

export default MenuItem;

import React from 'react';
import { Link } from 'react-router-dom';

function Menu() {
    return (
        <nav>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li style={{ margin: '10px 0' }}>
                    <Link to="/search" style={{ textDecoration: 'none' }}>Pesquisa</Link>
                </li>
                <li style={{ margin: '10px 0' }}>
                    <Link to="/upload" style={{ textDecoration: 'none' }}>Upload</Link>
                </li>
                <li style={{ margin: '10px 0' }}>
                    <Link to="/logout" style={{ textDecoration: 'none' }}>Sair</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Menu;

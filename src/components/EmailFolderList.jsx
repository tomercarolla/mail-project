import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export function EmailFolderList({emailsCount}) {
    const navigate = useNavigate();
    const location = useLocation();
    const folder = location.pathname.split('/').pop();
    const links = [
        {to: '/email/inbox', text: 'Inbox'},
        {to: '/email/starred', text: 'Starred'},
        {to: '/email/sent', text: 'Sent'},
        {to: '/email/draft', text: 'Draft'},
        {to: '/email/trash', text: 'Trash'},
    ];

    const handleClick = () => {
        const params = new URLSearchParams(location.search);
        params.set('compose', 'new');

        navigate(`${location.pathname}?${params.toString()}`);
    };

    return (
        <aside className='aside-menu'>
            <button className='compose-btn' onClick={handleClick}>Compose</button>

            <hr/>

            <nav>
                {links.map(link => (
                    <NavLink key={link.to} to={link.to}>
                        {link.text}
                        {emailsCount > 0 && link.text.toLowerCase() === 'inbox' ? (<span>{emailsCount}</span>) : null}
                    </NavLink>
                ))}
            </nav>
        </aside>
    )
}

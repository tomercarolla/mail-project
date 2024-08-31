import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export function EmailFolderList({emailsCount, filterBy, onSetFilterBy}) {
    const navigate = useNavigate();
    const location = useLocation();
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy);
    const folder = location.pathname.split('/').pop();
    const links = [
        {to: '/email/inbox', text: 'Inbox', folder: ''},
        {to: '/email/starred', text: 'Starred', folder: 'starred'},
        {to: '/email/sent', text: 'Sent', folder: 'sent'},
        {to: '/email/draft', text: 'Draft', folder: 'draft'},
        {to: '/email/trash', text: 'Trash', folder: 'trash'},
    ]

    useEffect(() => {
        onSetFilterBy(filterByToEdit);
    }, [filterByToEdit]);

    const handleClick = () => {
        const params = new URLSearchParams(location.search);
        params.set('compose', 'new');

        navigate(`${location.pathname}?${params.toString()}`);
    };

    function handleChange(folder) {
        setFilterByToEdit(prev => ({...prev, folder}));
    }
    //todo - fix email count delay - 2

    return (
        <aside className='aside-menu'>
            <button className='compose-btn' onClick={handleClick}>Compose</button>

            <hr/>

            <nav>
                {links.map(link => (
                    <NavLink key={link.to} onClick={() => handleChange(link.folder)} to={link.to}>
                        {link.text}
                        {folder === link.text.toLowerCase() ? (<span>{emailsCount}</span>) : null}
                    </NavLink>
                ))}
            </nav>
        </aside>
    )
}

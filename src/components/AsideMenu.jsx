import {NavLink} from "react-router-dom";

export function AsideMenu() {
    return (
        <aside className='aside-menu'>
            <button className='compose-btn'>Compose</button>
            <hr/>

            <nav>
                <NavLink to='/inbox'>Inbox</NavLink>
                <NavLink to='/starred'>Starred</NavLink>
                <NavLink to='/sent'>Sent</NavLink>
                <NavLink to='/draft'>Draft</NavLink>
                <NavLink to='/trash'>Trash</NavLink>
            </nav>

        </aside>
    )
}

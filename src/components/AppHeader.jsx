import { NavLink } from "react-router-dom"

export function AppHeader() {
    return <header className="app-header">
        <h1>Emails</h1>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/email/inbox">Emails</NavLink>
        </nav>
    </header>
}

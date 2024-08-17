import {Route, HashRouter as Router, Routes} from "react-router-dom";
import {AppHeader} from "./components/AppHeader.jsx";
import {AppFooter} from "./components/AppFooter.jsx";
import {Home} from "./pages/Home.jsx";

export function App() {
    return (
        <Router>
            <AppHeader />

            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </main>

            <AppFooter />
        </Router>
    )
}
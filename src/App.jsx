import {Route, HashRouter as Router, Routes} from "react-router-dom";
import {AppHeader} from "./components/AppHeader.jsx";
import {AppFooter} from "./components/AppFooter.jsx";
import {Home} from "./pages/Home.jsx";
import {About} from "./pages/About.jsx";
import {EmailIndex} from "./pages/EmailIndex.jsx";
import {EmailDetails} from "./pages/EmailDetails.jsx";
import {UserMsg} from "./components/UserMessage.jsx";

export function App() {
    return (
        <Router>
            <AppHeader/>

            <main>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/email/:folder" element={<EmailIndex/>}>
                        <Route path="/email/:folder/:id" element={<EmailDetails/>}/>
                    </Route>
                </Routes>
            </main>

            <UserMsg />
            <AppFooter/>
        </Router>
    )
}
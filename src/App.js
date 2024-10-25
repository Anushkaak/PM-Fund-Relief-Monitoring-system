import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/navbar';
import React from 'react';
import Form from './components/form';
import Home from './components/Home';

function App() {
    return (
        <Router>
            <Main />
        </Router>
    );
}

// Main component to handle routing and Navbar visibility
function Main() {
    const location = useLocation(); // Get the current location/path

    // Determine if the Navbar should be shown based on the current path
    const showNavbar = location.pathname !== '/Form'; // Hide Navbar on /Form route

    return (
        <>
            {showNavbar && <Navbar />} {/* Only render Navbar if showNavbar is true */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Form" element={<Form />} />
                <Route path="/home" element={<Home />} />
                {/* Add more routes as needed */}
            </Routes>
        </>
    );
}

export default App;






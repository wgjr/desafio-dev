// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FileUpload from "./components/FileUpload";
import Login from "./components/Login";
import Search from "./components/Search";
import Signup from "./components/Signup"; // Para definir as rotas


function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/upload" element={<FileUpload />} />
                <Route path="/logout" element={<Login />} />
                <Route path="/search" element={<Search />} />
            </Routes>
        </div>
    );
}

export default App;

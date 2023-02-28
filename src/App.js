import './App.css';
import Login from "./components/login";
import Register from "./components/register";
import Dashboard from "./components/dashboard";
import CreateUpdateEvent from "./components/createUpdateEvent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if(user){
            dispatch({
                type: "SET_USER",
                user
            });
        }
    }, []);

        return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}>
                </Route>
                <Route path="/register" element={<Register />}>
                </Route>
                <Route path="/dashboard" element={<Dashboard />}>
                </Route>
                <Route path="/createEvent" element={<CreateUpdateEvent />}>
                </Route>
                <Route path="/updateEvent" element={<CreateUpdateEvent />}>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

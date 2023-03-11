import './App.css';
import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './LandingPage';
import { LoginPage } from './LoginPage';
import { HomePage } from './HomePage';

export const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={ <LandingPage/> }/>
                <Route path='/login' element={ <LoginPage/>}/>
                <Route path='/home' element={ <HomePage/> }/>
            </Routes>
        </Router>
    )
};

export default App;
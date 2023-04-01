import './App.css';
import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './LandingPage';
import { LoginPage } from './LoginPage';
import { HomePage } from './HomePage';
import { SignupPage } from './SignupPage';

export const UserContext = createContext();

export const App = () => {
    const [ currentUser, setCurrentUser ] = useState(undefined);
    const _setCurrentUser = user => setCurrentUser(user);
    
    useEffect(() => {
      const temp = window.localStorage.getItem('CURRENT_USER');
      if (temp !== 'undefined') setCurrentUser(JSON.parse(temp));
    }, [])
    useEffect(() => {
      window.localStorage.setItem('CURRENT_USER', JSON.stringify(currentUser));
    }, [currentUser])  

    if (!currentUser) {
        console.log('NO CURRENT USER')
        return (
            <Router>
                <Routes>
                    <Route path='/' element={ <LandingPage/> }/>
                    <Route path='/login' element={ <LoginPage setCurrentUser={ _setCurrentUser }/> }/>
                    <Route path='/signup' element={ <SignupPage/> }/>
                </Routes>
            </Router>
        )    
    }

    console.log('THERE IS A CURRENT USER')
    console.log(currentUser)
    return (
        <UserContext.Provider value={ currentUser }>
            <Router>
                <Routes>
                    <Route path='/' element={ <LandingPage/> }/>
                    <Route path='/login' element={ <LoginPage setCurrentUser={ _setCurrentUser }/> }/>
                    <Route path='/home' element={ <HomePage setCurrentUser={ _setCurrentUser }/> }/>
                    <Route path='/signup' element={ <SignupPage/> }/>
                </Routes>
            </Router>
        </UserContext.Provider>
    )
};

export default App;
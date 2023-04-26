import './App.css';
import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './LandingPage';
import { LoginPage } from './LoginPage';
import { HomePage } from './HomePage';
import { SignupPage } from './SignupPage';
import { AddTransaction } from './components/transaction/addTransaction';
import { EditTransaction } from './components/transaction/editTransaction';
import { ViewListTransaction } from './components/transaction/viewListTransaction';
import { AppealTransaction } from './components/transaction/appealTransaction';
import { EmployeeList } from './components/employeeList';


export const UserContext = createContext();

export const App = () => {
    const [ currentUser, setCurrentUser ] = useState(undefined);
    const _setCurrentUser = user => setCurrentUser(user);
    
    //the following useEffects allow for user persistence (so if the page is reloaded, you aren't logged out)
    useEffect(() => { 
      const temp = window.localStorage.getItem('CURRENT_USER');
      if (temp !== 'undefined') setCurrentUser(JSON.parse(temp));
    }, [])
    useEffect(() => {
      window.localStorage.setItem('CURRENT_USER', JSON.stringify(currentUser));
    }, [currentUser])  

    if (!currentUser) { //if no one is logged in
        return (
            <Router>
                <Routes>
                    <Route path='/' element={ <LandingPage/> }/>
                    <Route path='/login' element={ <LoginPage setCurrentUser={ _setCurrentUser }/> }/>
                    <Route path='/signup' element={ <SignupPage setCurrentUser={ _setCurrentUser }/> }/>
                </Routes>
            </Router>
        )    
    }

    return ( //if someone is logged in
        <UserContext.Provider value={ currentUser }>
            <Router>
                <Routes>
                    <Route path='/' element={ <LandingPage/> }/>
                    <Route path='/login' element={ <LoginPage setCurrentUser={ _setCurrentUser }/> }/>
                    <Route path='/home' element={ <HomePage setCurrentUser={ _setCurrentUser }/> }/>
                    <Route path='/signup' element={ <SignupPage setCurrentUser={ _setCurrentUser }/> }/>
                    <Route path='/addTransaction' element={ <AddTransaction setCurrentUser={ _setCurrentUser }/> }/>
                    <Route path='/editTransaction' element={ <EditTransaction setCurrentUser={ _setCurrentUser }/>}/>
                    <Route path='/viewTransactions' element= {<ViewListTransaction setCurrentUser={ _setCurrentUser }/>}/>
                    <Route path='/appealTransaction' element= {<AppealTransaction setCurrentUser={ _setCurrentUser }/>}/>
                    <Route path='/employeeList' element = {<EmployeeList setCurrentUser={_setCurrentUser}/>}/>
                </Routes>
            </Router>
        </UserContext.Provider>
    )
}

export default App; 
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Statistics from './pages/Statistics/Statistics'
import ExamDetails from './pages/ExamDetails/ExamDetails';

import './App.css'
import ExamHistory from './pages/ExamsHistory/ExamsHistory';
import Login from './pages/Login/Login';


// import Main from './pages/Main';
// import Login from './pages/roles/Login';
// import Admin from './pages/roles/Admin';
// import Teacher from './pages/roles/Teacher';
// import Student from './pages/roles/Student';

function App() {


    // const [loggedIn, setLoggedIn] = useState(false);
    // const [userRole, setUserRole] = useState('');

    {/* {!loggedIn ? (
        <Login setLoggedIn={setLoggedIn} setUserRole={setUserRole} />
    ) : userRole === 'administrator' ? (
        <Admin />
    ) : userRole === 'teacher' ? (
        <Teacher />
    ) : (
        <Student />
    )} */}


    return (
        <Router>
                <Routes>
                    <Route path="/" element={<Statistics />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/detalhes" element={<ExamDetails />} />
                    {/* <Route path="*" element={<NotFound />} /> */}
                    <Route path="/historico" element={<ExamHistory />} />
                </Routes>
        </Router>
    );
}

export default App;

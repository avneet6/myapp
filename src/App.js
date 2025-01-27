
import React from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() {
const[user] = useAuthState(auth);

  return (
    <div>
      <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
      </Routes>
    </Router>
      
    

    </div>
  );
}

export default App;

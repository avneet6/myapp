import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import StudentsPage from './StudentsPage';
import "./Dashboard.css";

function Dashboard() {
  const [currentPage, setCurrentPage] = useState('students');

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  return (
    <div className="dashboard">
      <div className="sidebar">
        <button onClick={() => setCurrentPage('students')}>Students Page</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div>
        {currentPage === 'students' && <StudentsPage />}
      </div>
    </div>
  );
}

export default Dashboard;


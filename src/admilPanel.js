import React from 'react';
import {NavLink} from  'react-router-dom';
// import LoginPage from './loginPage';
// import './AdminPanel.css'; // Add external CSS for styling

const AdminPanel = () => {

  const username = localStorage.getItem('username');
  return (
    <div className="admin-panel">
      {/* Header Section */}
      <header className="header">
        <div className="logo" >
        <img src="https://example.com/logo.png" alt="Logo" /></div>
        <nav className="nav">
          <NavLink to='/'>Home</NavLink>
          {/* <a href="/EmployeeList" Link>Employee List</a> */}
          <NavLink to ="/EmployeeList">Employee List</NavLink>
        </nav>
        <div className="user-section">
          <span>{username}</span>
          {/* <a href="/">Logout</a> */}
          <NavLink to='/'>Logout</NavLink>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="sidebar">
        <ul>
          <li className="active">DashBord</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <h1>Welcome Admin Panel</h1>
      </main>
    </div>
  );
};

export default AdminPanel;

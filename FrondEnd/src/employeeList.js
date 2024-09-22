import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.post('http://localhost:5000/app/getUserData', {
          // Include any necessary data you want to send in the request body
        });
        console.log('Response:', response.data);
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const routeChange = (e) => {
    e.preventDefault();
    navigate('/CreateEmployee');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { day: '2-digit', month: 'short', year: '2-digit' };
    return new Intl.DateTimeFormat('en-GB', options).format(date);
  };

  // Filter employees based on name, email, ID, and formatted date
  const filteredEmployees = employees.filter((employee) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const matchesName = employee.name.toLowerCase().includes(lowerCaseSearchTerm);
    const matchesEmail = employee.email.toLowerCase().includes(lowerCaseSearchTerm);
    const matchesId = employee.uniqueId.includes(lowerCaseSearchTerm);
    const matchesDate = formatDate(employee.updatedAt).toLowerCase().includes(lowerCaseSearchTerm);

    return matchesName || matchesEmail || matchesId || matchesDate;
  });

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/app/deleteUserData/${id}`);
      setEmployees(employees.filter((employee) => employee._id !== id)); // Remove deleted employee from state
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleEdit = (employee) => {
    navigate(`/EmployeeEdit`, { state: { employeeData: employee } });
  };

  return (
    <div className="employee-list">
      <header className="header">
        <h1>Employee List</h1>
        <div className="header-controls">
          <span>Total Count: {employees.length}</span>
          <button onClick={routeChange}>Create Employee</button>
          <input
            type="text"
            placeholder="Search by Name, Email, ID, or Date (DD-MMM-YY)"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </header>

      <table>
        <thead>
          <tr>
            <th>Unique Id</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Create Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.uniqueId}</td>
                <td>
                  <img src={employee.image} alt={employee.name} width="50" height="50" />
                </td>
                <td>{employee.name}</td>
                <td>
                  <a href={`mailto:${employee.email}`}>{employee.email}</a>
                </td>
                <td>{employee.mobile}</td>
                <td>{employee.designation}</td>
                <td>{employee.gender}</td>
                <td>{employee.course.join(', ')}</td>
                <td>{formatDate(employee.updatedAt)}</td>
                <td className='buttons'>
                  <button  onClick={() => handleEdit(employee)}>Edit</button>
                  <button onClick={() => handleDelete(employee._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">No Employees Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;

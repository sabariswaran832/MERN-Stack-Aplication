import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmployeeEdit = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { employeeData } = state || {}; // Access the passed employee data

  const [formData, setFormData] = useState({
    name: employeeData?.name || '',
    email: employeeData?.email || '',
    mobile: employeeData?.mobile || '',
    designation: employeeData?.designation || '',
    gender: employeeData?.gender || '',
    course: employeeData?.course || [],
    image: employeeData?.image || '',
  });

  useEffect(() => {
    if (!employeeData) {
      // If employeeData is not passed, redirect to the employee list page
      navigate('/EmployeeList');
    }
  }, [employeeData, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    let updatedCourses = [...formData.course];
    if (checked) {
      updatedCourses.push(value);
    } else {
      updatedCourses = updatedCourses.filter((course) => course !== value);
    }
    setFormData({
      ...formData,
      course: updatedCourses,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // If there is an image, convert it to base64
      let imageBase64 = formData.image;
      if (formData.image && typeof formData.image !== 'string') {
        imageBase64 = await convertImageToBase64(formData.image);
      }

      const updatedEmployee = {
        ...formData,
        image: imageBase64,
      };

      // Send updated data to the backend
      const response = await axios.put(`http://localhost:5000/app/updateUserData/${employeeData._id}`, updatedEmployee);

      console.log('Employee updated:', response.data);
      navigate('/EmployeeList'); // Navigate back to the employee list after successful update
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="employee-edit">
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => {
              const re = /^[A-Za-z\s]*$/; // Regular expression to allow only letters and spaces
              if (e.target.value === '' || re.test(e.target.value)) {
                handleChange(e);
              }
            }}
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
           
          />
        </div>

        <div>
          <label>Mobile No</label>
          <input
            type="tel"
            name="mobile"
            maxLength={10}
            value={formData.mobile}
            onChange={(e) => {
              const re = /^[0-9\b]+$/; // Regular expression to allow only numbers
              if (e.target.value === '' || re.test(e.target.value)) {
                handleChange(e);
              }
            }}          />
        </div>

        <div>
          <label>Designation</label>
          <select
            name="designation"
            value={formData.designation}
            onChange={handleChange}
          >
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        <div>
          <label>Gender</label>
          <input
            type="radio"
            name="gender"
            value="M"
            checked={formData.gender === 'M'}
            onChange={handleChange}
          /> Male
          <input
            type="radio"
            name="gender"
            value="F"
            checked={formData.gender === 'F'}
            onChange={handleChange}
          /> Female
        </div>

        <div>
          <label>Course</label>
          <input
            type="checkbox"
            value="MCA"
            checked={formData.course.includes('MCA')}
            onChange={handleCheckboxChange}
          /> MCA
          <input
            type="checkbox"
            value="BCA"
            checked={formData.course.includes('BCA')}
            onChange={handleCheckboxChange}
          /> BCA
          <input
            type="checkbox"
            value="BSC"
            checked={formData.course.includes('BSC')}
            onChange={handleCheckboxChange}
          /> BSC
        </div>

        <div>
          <label>Image Upload</label>
          <input type="file" accept=".jpg, .png" onChange={handleFileChange} />
          {/* {formData.image && (
            // <img src={typeof formData.image === 'string' ? formData.image : URL.createObjectURL(formData.image)} alt="employee" width="50" height="50" />
          )} */}
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EmployeeEdit;

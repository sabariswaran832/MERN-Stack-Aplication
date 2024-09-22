import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateEmployee = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: [],
    image: null,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is not valid';
    }
    if (!formData.mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d+$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number must be numeric';
    }
    if (!formData.image) {
      newErrors.image = 'Image is required';
    } else if (!/\.(jpg|png)$/i.test(formData.image.name)) {
      newErrors.image = 'Only JPG/PNG files are allowed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const { name, email, mobile, designation, gender, course, image } = formData;
      const imageBase64 = await convertImageToBase64(image); // Convert image to Base64

      const dataToSend = {
        name,
        email,
        mobile,
        designation,
        gender,
        course,
        image: imageBase64, // Send the Base64 string
      };

      try {
        const response = await axios.post('http://localhost:5000/app/insertUser', dataToSend, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Employee Created:', response.data);
        setIsSubmitted(true);
        navigate('/EmployeeList')
      } catch (error) {
        if (error.response) {
          setErrors({ submit: error.response.data.message || 'Error submitting the form' });
        } else {
          setErrors({ submit: error.message });
        }
      }
    }
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result); // Resolve with the Base64 string
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="create-employee">
      <h2>Create Employee</h2>
      {isSubmitted ? (
        <div className="success-message">
          <h3>Form submitted successfully!</h3>
          <p>Thank you for submitting the employee details.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Name */}
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
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          {/* Email */}
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          {/* Mobile No */}
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
              }}            />
            {errors.mobile && <span className="error">{errors.mobile}</span>}
          </div>

          {/* Designation Dropdown */}
          <div>
            <label>Designation</label>
            <select
              name="designation"
              value={formData.designation}
              onChange={handleChange}
            >
              <option value="">Select Designation</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          {/* Gender Radio Button */}
          <div>
            <label>Gender</label>
            <input
              type="radio"
              name="gender"
              value="M"
              onChange={handleChange}
              checked={formData.gender === 'M'}
            /> Male
            <input
              type="radio"
              name="gender"
              value="F"
              onChange={handleChange}
              checked={formData.gender === 'F'}
            /> Female
          </div>

          {/* Course Checkbox */}
          <div>
            <label>Course</label>
            <input
              type="checkbox"
              value="MCA"
              onChange={handleCheckboxChange}
              checked={formData.course.includes('MCA')}
            /> MCA
            <input
              type="checkbox"
              value="BCA"
              onChange={handleCheckboxChange}
              checked={formData.course.includes('BCA')}
            /> BCA
            <input
              type="checkbox"
              value="BSC"
              onChange={handleCheckboxChange}
              checked={formData.course.includes('BSC')}
            /> BSC
          </div>

          {/* Image Upload */}
          <div>
            <label>Image Upload</label>
            <input type="file" accept=".jpg, .png" onChange={handleFileChange} />
            {errors.image && <span className="error">{errors.image}</span>}
          </div>

          {/* Submit Button */}
          <div>
            <button type="submit" className='Submit'>Submit</button>
          </div>

          {/* Display submit errors */}
          {errors.submit && <span className="error">{errors.submit}</span>}
        </form>
      )}
    </div>
  );
};

export default CreateEmployee;

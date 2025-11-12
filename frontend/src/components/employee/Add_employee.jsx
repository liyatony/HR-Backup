import React, { use, useState } from "react";
import "../../styles/Add_employee.css";
import axios from "axios";
import {
  FaUserTie,
  FaTimes,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaBriefcase,
  FaMapMarkerAlt,
  FaIdCard,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaCheckCircle,
  FaFileImage,
} from "react-icons/fa";

const Add_employee = ({ isOpen, onClose, onSubmit }) => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    dateOfJoining: "",
    salary: "",
    image: null,
    role: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  let handleFilechange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Pass data to parent component
    if (onSubmit) {
      onSubmit(formData);

      const sendData = new FormData();
      sendData.append("name", formData.name);
      sendData.append("email", formData.email);
      sendData.append("phone", formData.phone);
      sendData.append("department", formData.department);
      sendData.append("position", formData.position);
      sendData.append("dateOfJoining", formData.dateOfJoining);
      sendData.append("salary", formData.salary);
      sendData.append("role", formData.role);

      if (file) {
        sendData.append("image", file);
      }

      axios
        .post("http://localhost:4300/emp/add", sendData)
        .then((res) => {
          console.log(sendData);
          console.log("Employee added:");
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      department: "",
      position: "",
      dateOfJoining: "",
      salary: "",
      role: "",
      image: null,
    });

    // Close modal
    onClose();
  };

  const handleCancel = () => {
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      department: "",
      position: "",
      dateOfJoining: "",
      salary: "",
      role: "",
      image: null,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleCancel}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-section">
            <div className="modal-icon">
              <FaUserTie />
            </div>
            <div>
              <h2 className="modal-title">Add New Employee</h2>
              <p className="modal-subtitle">
                Fill in the employee details below
              </p>
            </div>
          </div>
          <button className="modal-close" onClick={handleCancel}>
            <FaTimes />
          </button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <h3 className="form-section-title">Personal Information</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    <FaUser className="label-icon" />
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter  name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <FaEnvelope className="label-icon" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="email@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <FaPhone className="label-icon" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="+91 00000 00000"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <FaFileImage className="label-icon" />
                    image
                  </label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleFilechange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <FaIdCard className="label-icon" />
                    Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="form-input"
                  >
                    <option value="">Select Role</option>
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                    <option value="dpt_head">Dpt.Head</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3 className="form-section-title">Employment Details</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    <FaBuilding className="label-icon" />
                    Department *
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select department</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="IT">IT</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <FaBriefcase className="label-icon" />
                    Position *
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="e.g., Software Engineer"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <FaCalendarCheck className="label-icon" />
                    Date of Joining *
                  </label>
                  <input
                    className="form-input"
                    type="date"
                    name="dateOfJoining"
                    value={formData.dateOfJoining}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <FaMoneyBillWave className="label-icon" />
                    Monthly Salary (₹) *
                  </label>
                  <input
                    type="number"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="50000"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                <FaCheckCircle /> Add Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add_employee;

import React, { useState } from "react";
import "./App.css";

const Register = () => {
  const [formData, setFormData] = useState({
    Id:"",
    name: "",
    password: "",
    Id_facultad: "",
    organizationCode: "",
    Status:""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [organizations, setOrganizations] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  
  const handleSearch = async () => {
    setDropdownVisible(false);
    setOrganizations([]);
    try {
      const response = await fetch(`http://localhost:5000/search_org?code=${formData.organizationCode}`);
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setOrganizations(data);
      } else {
        setOrganizations([]); // Ensure it's an array
      }
  
      setDropdownVisible(true);
    } catch (error) {
      console.error("Error fetching organization data:", error);
      setOrganizations([]); // Prevents `map` errors
    }
  };
  


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!formData.name || !formData.Id || !formData.password) {
      setError("All fields are required");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setSuccess(true);
  };
  

  return (
    <div className="container">
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Registration successful!</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Id:</label>
          <input
            type="text"
            name="Id"
            value={formData.Id}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="organization-input">
          <label>Organization Code:</label>
          <input
            type="text"
            name="organizationCode"
            value={formData.organizationCode}
            onChange={handleChange}
          />
          <button type="button" onClick={handleSearch}>Search</button>
        </div>
        {dropdownVisible && organizations.length > 0 && (
          <div className="dropdown">
            <select
              name="Id_facultad"
              value={formData.Id_facultad}
              onChange={handleChange}
            >
              <option value="">Select an Organization</option>
              {organizations.map((org, index) => (
                <option key={index} value={org.id}>{org.name}</option>
              ))}
            </select>
          </div>
        )}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;

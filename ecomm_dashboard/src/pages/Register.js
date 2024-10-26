// SignUpForm.js
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingButton from './LoadingButton'; // Adjust the import path as needed
import { Link } from 'react-router-dom';

const Register = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('user-info')) {
      navigate('/Home');
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      const data = await response.json();
      console.log('API response:', data);

      // Corrected: Use 'data' instead of 'response' when storing user info in local storage
      localStorage.setItem('user-info', JSON.stringify(data));
      navigate('/Home');
      // Add any further logic based on the API response

    } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
  };

  return (
    <div className="container">
      <h1>User Register Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" placeholder="Enter your name"  name="name" value={formData.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" placeholder="Enter your email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" placeholder="Enter your password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <br />

        <div style={{ marginBottom: '15px', color: 'red' }}>
                    {error && <p>{error}</p>}
                </div>

        <LoadingButton isLoading={loading} onClick={handleSubmit} />

        <button type="submit" disabled={loading} onClick={!loading ? handleSubmit : null}> {loading ? 'Loading...' : 'Register'}</button>
      </form>
      <h4>
        Already Have an account?{' '}
        <Link to="/Login" style={{ textDecoration: 'underline', color: 'blue' }}>
          Login
        </Link>
      </h4>
    </div>                                
  );
};

export default Register;

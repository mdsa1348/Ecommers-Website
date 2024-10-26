import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import LoadingButton from './LoadingButton'; // Adjust the import path as needed
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();

    const [formData,setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Reset loading state when component unmounts or on formData change
        return () => setLoading(false);
    }, [formData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            const data = await response.json();
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
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit} style={{ width: '300px', margin: 'auto' }}>
            <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div style={{ marginBottom: '15px', color: 'red' }}>
                    {error && <p>{error}</p>}
                </div>

                {/* Use the LoadingButton component */}
                <LoadingButton isLoading={loading} onClick={handleSubmit} />

                {/* Alternatively, you can use the following button without the LoadingButton component */}
                <Button type="submit" variant="primary" disabled={loading} onClick={!loading ? handleSubmit : null}>
                    {loading ? 'Loading...' : 'Login'}
                </Button>
            </form>
            <h4>
        You don't Have an account?{' '}
        <Link to="/Register" style={{ textDecoration: 'underline', color: 'blue' }}>
        Register
        </Link>
      </h4>
        </div>
    );
};

export default LoginPage;

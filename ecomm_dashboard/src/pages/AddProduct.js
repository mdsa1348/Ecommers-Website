import React, { useState } from 'react';
import "../App";
import ProductList from './ProductList';


const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    file: null,
  });

  const [statusMessage, setStatusMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataApi = new FormData();
      formDataApi.append('name', formData.name);
      formDataApi.append('price', formData.price);
      formDataApi.append('description', formData.description);
      formDataApi.append('file', formData.file);

      const response = await fetch('http://localhost:8000/api/addproduct', {
        method: 'POST',
        body: formDataApi,
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const data = await response.json();
      console.log('API response:', data);
      // Add any further logic based on the API response
       // Clear the form fields after a successful submission
    setFormData({
        name: '',
        price: '',
        description: '',
        file: null ,
      });

      setStatusMessage('Product added successfully');

    } catch (error) {
      console.error('Error:', error.message);
      // Handle error scenarios
      // Set error message
      setStatusMessage('Failed to add product');

    }
  };

  return (
    <section>
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="price">Price:</label>
          <input type="text" id="price" name="price" value={formData.price} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="file">File:</label>
          <input type="file" id="file" name="file" onChange={handleFileChange} required />
        </div>

        <button type="submit">Add Product</button>
      </form>
      {statusMessage && (
        <div style={{ color: statusMessage.includes('Failed') ? 'red' : 'green' }}>
          {statusMessage}
        </div>
      )}
    </div>
    <div>
        <h1>Show All Product</h1>
        <ProductList/>
    </div>
    </section>
  );
};

export default AddProduct;

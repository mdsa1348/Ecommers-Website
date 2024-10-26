import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UpdateProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        file: null,
        imageUrl: '', // To store the URL of the existing image
    });
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`http://localhost:8000/api/product/${id}`);
            const data = await response.json();
            setProduct({
                ...data,
                imageUrl: `http://localhost:8000/storage/${data.file_path}`, // Assuming file_path is the image path
            });
        };

        fetchProduct();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProduct({ ...product, file });
    };

    const handleUpdateProduct = async () => {
        const formData = new FormData();

        if (product.name) formData.append('name', product.name);
        if (product.price) formData.append('price', product.price);
        if (product.description) formData.append('description', product.description);
        if (product.file) formData.append('file', product.file);

        try {
            const response = await fetch(`http://localhost:8000/api/editproduct/${id}?_method=PUT`, {
                method: 'POST', // Change to 'PUT' if the server supports it
                body: formData,
            });

            const data = await response.json();
            console.log(data);

            // Check if the response contains a success message
            if (data.result === 'Product updated successfully') {
                setSuccessMessage('Product updated successfully');
            }

        } catch (error) {
            console.error('Error updating product:', error);
            // Handle error or show an error message
        }
    };

    return (
        <div>
            <h2>Edit Product</h2>
            {successMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={product.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="price"
                        name="price"
                        value={product.price}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={product.description}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="file">Image:</label>
                    <div>
                        <img
                            src={`http://localhost:8000/${product.file_path}`}
                            alt={product.name}
                            className="img-fluid rounded"
                            style={{ width: '15%', height: '30vh', objectFit: 'cover' }}
                        />
                    </div>
                    <input type="file" className="form-control-file" id="file" name="file" onChange={handleFileChange} />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleUpdateProduct}>
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default UpdateProduct;

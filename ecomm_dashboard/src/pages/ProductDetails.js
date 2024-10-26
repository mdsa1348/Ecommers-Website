import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


const ProductDetails = ({ history }) => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/product/${id}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, [id]);

    const handleDelete = async () => {
        try {
            await fetch(`http://localhost:8000/api/delete/${id}`, {
                method: 'DELETE',
            });
            // Redirect to the page displaying all products after successful deletion
            history.push('/AddProduct');
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-6">
                    {/* Display product image */}
                    <img
                        src={`http://localhost:8000/${product.file_path}`}
                        alt={product.name}
                        className="img-fluid rounded"
                        style={{ width: '100%', height: '80vh', objectFit: 'cover' }}
                    />
                </div>
                <div className="col-md-6">
                    {/* Display product details */}
                    <h2>
                        <strong>Name:</strong> {product.name}
                    </h2>
                    
                    <h5>
                        <strong>Price:</strong> {product.price}
                    </h5>
                    <h5>
                        <strong>Description:</strong> {product.description}
                    </h5>
                    {/* Delete button */}
                    <button onClick={handleDelete} className="btn btn-danger mr-5">
                        Delete Product
                    </button>
                    <Link to={`/UpdateProduct/${product.id}`}>
                        <button className="btn btn-success">Update Product</button>
                    </Link>
                    {/* You can add more details here based on your product data */}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;

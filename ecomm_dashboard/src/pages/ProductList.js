import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [visibleProductCount, setVisibleProductCount] = useState(4);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = 'http://localhost:8000/api/list';

        // Append search text to the API URL if searchText is not empty
        if (searchText) {
          apiUrl = `http://localhost:8000/api/searchlist/${searchText}`;
        }

        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchText]);

  const handleShowMore = () => {
    // Calculate the new visible product count based on the current count and total products
    const newVisibleProductCount = visibleProductCount + 4;

    // If the new count exceeds the total products, set showAll to true
    if (newVisibleProductCount >= products.length) {
      setShowAll(true);
    }

    // Set the new visible product count
    setVisibleProductCount(newVisibleProductCount);
  };

  const handleShowAll = () => {
    setShowAll(true);
    setVisibleProductCount(products.length);
  };

  const handleShowLess = () => {
    setShowAll(false);
    setVisibleProductCount(4);
  };

  const handleSearch = () => {
    // Fetch data based on the entered search text
    // This will trigger the useEffect with the updated searchText
  };

  const visibleProducts = showAll ? products : products.slice(0, visibleProductCount);


  return (
    <div className="container">
      <div className="row">
        {/* Add the search bar and button */}
        <div className="col-md-12 mb-3">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
        {visibleProducts.map((product) => (
          <div key={product.id} className="col-md-3 mb-3">
            
            <Link to={`/ProductList/${product.id}`} style={{ textDecoration: 'none' }}>
              <div className="card">
                {/* Construct the full image URL */}
                <img
                  src={`http://localhost:8000/${product.file_path}`}
                  className="card-img-top img-fluid rounded"
                  alt={product.name}
                  style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                />
                <div className="card-body" style={{ height: '150px', overflow: 'hidden' }}>
                  <h5 className="card-title">{product.name}</h5>
                  <h6 className="card-text" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    Price: {product.price}
                  </h6>
                  <h6 className="card-text" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {product.description}
                  </h6>
                  {/* Add more details or actions if needed */}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <button className="btn btn-primary mr-2" onClick={handleShowMore}>
          Show More
        </button>
        {(!showAll && visibleProductCount > 4) && (
          <>
            <button className="btn btn-secondary ml-2" onClick={handleShowAll}>
              Show All
            </button>
            <button className="btn btn-secondary ml-2" onClick={handleShowLess}>
              Show Less
            </button>
          </>
        )}
    </div>
  );
};

export default ProductList;

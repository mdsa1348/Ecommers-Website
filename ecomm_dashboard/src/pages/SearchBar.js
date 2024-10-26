import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');

  const fetchSearchResults = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/searchlist/${searchText}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [searchText]);

  const handleSearch = () => {
    if (searchText.trim() !== '') {
      fetchSearchResults();
    } else {
      setProducts([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (searchText.trim() !== '') {
        await fetchSearchResults();
      } else {
        setProducts([]);
      }
    };

    fetchData();
  }, [searchText, fetchSearchResults]);

  return (
    <div className="container">
      <h2>Search Results</h2>

      <div className="row">
        <div className="col-md-6 offset-md-3">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="form-control"
            placeholder="Type to search..."
          />
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      <div className="row mt-3">
        {products.map((product) => (
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
    </div>
  );
};

export default SearchPage;

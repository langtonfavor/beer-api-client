import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import BeerModal from './BeerModal';

const BeerTable = () => {
  const [beers, setBeers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBeer, setSelectedBeer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetchBeers();
  }, []);

  const fetchBeers = async () => {
    try {
      const response = await axios.get('http://localhost:7112/api/beer/menu');
      const fetchedBeers = response.data;
      setBeers(fetchedBeers);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch beers:', error);
      setError('Failed to fetch beers');
      setLoading(false);
    }
  };

  const handleBeerClick = (beer) => {
    setSelectedBeer(beer);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredBeers = beers.filter((beer) =>
    beer.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="table-container">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Tagline</th>
            <th>ABV</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="3">
              <input
                type="text"
                placeholder="Search by beer name"
                value={searchValue}
                onChange={handleSearchChange}
              />
            </td>
          </tr>
          {filteredBeers.length > 0 ? (
            filteredBeers.map((beer) => (
              <tr key={beer.id} onClick={() => handleBeerClick(beer)}>
                <td>{beer.name}</td>
                <td>{beer.tagline}</td>
                <td>{beer.abv}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No beers found</td>
            </tr>
          )}
        </tbody>
      </Table>
      <BeerModal beer={selectedBeer} showModal={showModal} closeModal={closeModal} />
    </div>
  );
};

export default BeerTable;
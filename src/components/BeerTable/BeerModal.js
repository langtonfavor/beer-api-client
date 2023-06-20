import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BeerModal from './BeerModal';
import { Table, Form, Spinner } from 'react-bootstrap';

const BeerTable = () => {
  const [beers, setBeers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedBeer, setSelectedBeer] = useState(null);
  const [filter, setFilter] = useState('');

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
    setSelectedBeer(null);
    setShowModal(false);
  };

  const filterBeers = () => {
    return beers.filter((beer) => beer.name.toLowerCase().includes(filter.toLowerCase()));
  };

  return (
    <div>
      <h1>PUMPKN.IO</h1>
      <Form.Group controlId="filterInput">
        <Form.Control type="text" placeholder="Search Beer" value={filter} onChange={(e) => setFilter(e.target.value)} />
      </Form.Group>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Tagline</th>
              <th>ABV</th>
            </tr>
          </thead>
          <tbody>
            {filterBeers().map((beer) => (
              <tr key={beer.id} onClick={() => handleBeerClick(beer)}>
                <td>{beer.name}</td>
                <td>{beer.tagline}</td>
                <td>{beer.abv}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <BeerModal beer={selectedBeer} showModal={showModal} closeModal={closeModal} />
    </div>
  );
};

export default BeerTable;
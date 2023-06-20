import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const BeerModal = ({ beer, showModal, closeModal }) => {
  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Beer Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {beer && (
          <div>
            <h4>{beer.name}</h4>
            <p>Tagline: {beer.tagline}</p>
            <p>ABV: {beer.abv}</p>
            {/* Add more beer details as needed */}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

BeerModal.propTypes = {
  beer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    tagline: PropTypes.string.isRequired,
    abv: PropTypes.number.isRequired,
    // Add more prop types for beer object as needed
  }),
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default BeerModal;

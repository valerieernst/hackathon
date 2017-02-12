import React from 'react';
import Modal from 'react-modal';
import { Button, Image } from 'react-bootstrap';

export default ({ isOpen, onRequestClose, contentLabel, image}) => {
  return (
    <div>
      <Modal isOpen={isOpen} contentLabel={contentLabel}>
        <h2>We found a home that matches your address. Is this you?</h2>
        <Image src={image} />
        <Button onClick={onRequestClose}>That's Me!</Button>
      </Modal>
    </div>
  )
}
import React from 'react';
import Modal from 'react-modal';
import { Button, Image } from 'react-bootstrap';

export default ({ isOpen, notRightHome, verifyHome, contentLabel, image}) => {
  return (
    <div>
      <Modal isOpen={isOpen} contentLabel={contentLabel}>
        <h2>We found a home that matches your address. Is this you?</h2>
        <Image src={image} />
        <Button onClick={verifyHome}>That's Me!</Button>
        <Button onClick={notRightHome}>No, Try Again</Button>
      </Modal>
    </div>
  )
}
import React from 'react';
import { Button, Image, Modal } from 'react-bootstrap';


export default ({isOpen, image, address, verifyHome, notRightHome}) => (
  <div className="static-modal">
    <Modal show={isOpen}>
        <Modal.Header>
          <Modal.Title>We found a home that matches your address. Look familiar?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Image src={image} />
          <h3>{address}</h3>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={verifyHome}>That's Me!</Button>
          <Button onClick={notRightHome}>No, Try Again</Button>
        </Modal.Footer>

    </Modal>
  </div>
);
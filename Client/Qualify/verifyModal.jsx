import React from 'react';
import { Button, Image, Modal } from 'react-bootstrap';


export default ({isOpen, image, address, zipcode, verifyHome, notRightHome}) => (
  <div className="static-modal">
    <Modal show={isOpen}>
        <Modal.Header>
          <Modal.Title>We found a home that matches your address. Look familiar?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className='modal-body'>
            <Image src={image} />
            <h3>{address} {zipcode}</h3>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <div className='modal-body'>
            <Button onClick={verifyHome}>That's Me!</Button>
            <Button onClick={notRightHome}>No, Try Again</Button>
          </div>
        </Modal.Footer>

    </Modal>
  </div>
);
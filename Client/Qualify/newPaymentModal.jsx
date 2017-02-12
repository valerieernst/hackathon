import React from 'react';
import { Button, Image, Modal, Row, Col } from 'react-bootstrap';


export default ({isOpen, oldMonthlyPayment, newMonthlyPayment, signUp, declinSignUp}) => (
  <div className="static-modal">
    <Modal show={isOpen}>
        <Modal.Header>
          <Modal.Title>Congratulations! You qualify for a new, lower monthly payment!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className='modal-body'>
            <Row>
              <Col xs={6} sm={6} md={6}>
                <h4>Your Current Monthly Payment: ${oldMonthlyPayment}</h4>
                <Button onClick={signUp}>Sign Me Up!</Button>
              </Col>
              <Col xs={6} sm={6} md={6}>
                <h4>Your NEW Monthly Payment: ${newMonthlyPayment}</h4>
                <Button onClick={declinSignUp}>No Thanks.</Button>
              </Col>
            </Row>  
          </div>       
          
        </Modal.Body>

    </Modal>
  </div>
);
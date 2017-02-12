import React from 'react';
import { Button, Image, Modal } from 'react-bootstrap';


export default ({isOpen, oldMonthlyPayment, newMonthlyPayment, signUp, declinSignUp}) => (
  <div className="static-modal">
    <Modal show={isOpen}>
        <Modal.Header>
          <Modal.Title>Congratulations! You qualify for a new, lower monthly payment!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h3>Your Current Monthly Payment: {oldMonthlyPayment}</h3>
          <h3>Your NEW Monthly Payment: {newMonthlyPayment}</h3>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={signUp}>Sign Me Up!</Button>
          <Button onClick={declinSignUp}>No Thanks, I don't want to save money.</Button>
        </Modal.Footer>

    </Modal>
  </div>
);
import React from 'react';
import { Button, Image, Modal, Row, Col, Radio } from 'react-bootstrap';


export default ({isOpen, oldMonthlyPayment, newMonthlyPayment, signUp, declinSignUp, helpTerm, changeHelpTerm, totalSavings, monthlySavings}) => (
  <div className="static-modal">
    <Modal show={isOpen}>
        <Modal.Header>
          <Modal.Title>Congratulations! You could save ${monthlySavings} every month!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className='modal-body'>
            <Row>
              <Col xs={6} sm={6} md={6}>
                <h4>Your Current Monthly Payment: ${oldMonthlyPayment}</h4>
              </Col>
              <Col xs={6} sm={6} md={6}>
                <h4>Your NEW Monthly Payment: ${newMonthlyPayment}</h4>
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={12} md={12}>
                <h4>For how many months would you like to have a lower monthly payment?</h4>
                <Radio inline
                  value='6'
                  checked={helpTerm === '6'}
                  onChange={changeHelpTerm}>
                  6 Months
                </Radio>
                <Radio inline
                  value='12' 
                  checked={helpTerm === '12'}
                  onChange={changeHelpTerm}>
                  12 Months
                </Radio>
                <Radio inline
                  value='18' 
                  checked={helpTerm === '18'}
                  onChange={changeHelpTerm}>
                  18 Months
                </Radio>
                <h4>You Could Save ${totalSavings} Dollars!</h4>
              </Col>
            </Row>
          </div>       
          
        </Modal.Body>

        <Modal.Footer>
          <div className='modal-body'>
            <Button onClick={signUp}>Sign Me Up!</Button>
            <Button onClick={declinSignUp}>No Thanks.</Button>
          </div>
        </Modal.Footer>

    </Modal>
  </div>
);
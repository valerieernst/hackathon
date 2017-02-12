import React, { Component } from 'react';
import { Button, Well, Form, FormGroup, FormControl, Col,ControlLabel } from 'react-bootstrap';

export default class SignUp extends Component {

  constructor (props) {
    super(props);

    this.state = {
      fullName: '',
      email: '',
      password: '',
      phone: ''
    }
  }

  render () {
    return (
      <div>
        <Well>
            <Form horizontal>

              <FormGroup controlId="formHorizontalName">
                <Col componentClass={ControlLabel} sm={2}>
                  Full Name
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder="Full Name" />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={2}>
                  Email
                </Col>
                <Col sm={10}>
                  <FormControl type="email" placeholder="Email" />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalPhone">
                <Col componentClass={ControlLabel} sm={2}>
                  Phone Number
                </Col>
                <Col sm={10}>
                  <FormControl type="phone" placeholder="Phone Number" />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel} sm={2}>
                  Password
                </Col>
                <Col sm={10}>
                  <FormControl type="password" placeholder="Password" />
                </Col>
              </FormGroup>


              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Button type="submit">
                    Sign in
                  </Button>
                </Col>
              </FormGroup>
            </Form>
        </Well>
      </div>
    )
  }


}

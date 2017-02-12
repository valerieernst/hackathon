import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

export default ({ id, question, responseType, placeholder, value }) => {
  return (
    <div>
      <form>
        <FormGroup
          controlId={id}
          // validationState={this.getValidationState()}
        >
          <ControlLabel>{question}</ControlLabel>
          <FormControl
            type={responseType}
            // value={this.state.value}
            // placeholder="Enter text"
            // onChange={this.handleChange}
          />
        </FormGroup>
      </form>
    </div>
  );
};

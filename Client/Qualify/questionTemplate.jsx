import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

export default ({ id, question, responseType, placeholder, value, validation }) => {
  return (
    <div>
      <FormGroup validationState={validation}>
        <ControlLabel>{question}</ControlLabel>
        <FormControl
          type={responseType}
          // value={this.state.value}
          placeholder={placeholder}
          // onChange={this.handleChange}
        />
      </FormGroup>
    </div>
  );
};

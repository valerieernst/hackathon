import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

export default ({ id, question, responseType, placeholder, value, validation, onChange }) => {
  return (
    <div>
      <FormGroup validationState={validation}>
        <ControlLabel>{question}</ControlLabel>
        <FormControl
          type={responseType}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      </FormGroup>
    </div>
  );
};

import React, { Component } from 'react';
import Question from './questionTemplate.jsx';
import { Checkbox, Radio, FormGroup, ButtonGroup } from 'react-bootstrap';

const questionsAndResponses = [
{question: 'Do you own your home?',
response: <input type="checkbocx" />}
]


export default class Qualify extends Component {

  constructor (props) {
    super(props);
    this.changeOwnHome = this.changeOwnHome.bind(this);
    this.state = {
      ownHome: 'No'
    }
  }

  changeOwnHome (e) {
    this.setState({
      ownHome: e.target.value
    })
  }
  
  render() {
    return (
      <div>
      <form>
        <FormGroup>
          <label>Do You Own Your Home?</label>
          <Radio value="Yes" 
            checked={this.state.ownHome === 'Yes'}
            onChange={this.changeOwnHome}>
            Yes
          </Radio>
          <Radio value="No" 
            checked={this.state.ownHome === 'No'}
            onChange={this.changeOwnHome}>
            No
          </Radio>
        </FormGroup>
        <Question question={'Do you own your home?'} responseType={"text"} id={'id'}/>
      </form>
        <Question question={'What is your address?'}/>
      </div>
    )
  }
};
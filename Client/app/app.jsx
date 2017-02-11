import React, { Component } from 'react';
import NavBar from './nav.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        {this.props.children}
      </div>
    );
  }
}
export default App;

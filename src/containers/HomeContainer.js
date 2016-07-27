import React, { Component } from 'react';
import { connect } from 'react-redux';

class HomeContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <h1>Hello World!</h1>;
  }
}

export default connect()(HomeContainer);

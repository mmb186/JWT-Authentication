import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class SignOut extends Component {
  componentDidMount() {
    this.props.signout();
    console.log('User signed Out');
  }
  render() {
    return (
      <div> Sorry to see you go </div>
    );
  }
}

export default connect(null, actions)(SignOut);
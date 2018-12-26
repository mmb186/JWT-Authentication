import React, { Component } from 'react';
import { connect } from 'react-redux';


export default ChildeComponent => {
  class ComposeComponent extends Component {
    componentDidMount() {
      this.shouldNavigateAway();
    }

    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      if (!this.props.auth) {
        this.props.history.push('/');
      }
    }

    render () {
      return <ChildeComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return {auth: state.auth.authenticated };
  }

  return connect(mapStateToProps)(ComposeComponent);
};
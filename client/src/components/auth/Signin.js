import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux'
import * as actions from '../../actions';

class SignIn extends Component {

  onSubmit = (formProps) => {
    // navigate user after
    this.props.signin(formProps, () => {
      this.props.history.push('/feature');
    });
  }
  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <fieldset>
          <label>Email</label>
          <Field
            name='email' type='text' autoComplete='none' component='input'
          />
        </fieldset>
        <fieldset>
          <label>Password</label>
          <Field name='password' type='password' component='input' autoComplete='none'
          />
        </fieldset>
        <div>{this.props.errorMessage}</div>
        <button>Sign In</button>
      </form>
    );
  }
}

function maptStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
};


export default compose(
  connect(maptStateToProps, actions),
  reduxForm({form: 'signin'})
)(SignIn)
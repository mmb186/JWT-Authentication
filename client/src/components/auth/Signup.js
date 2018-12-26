import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux'
import * as actions from '../../actions';

class Signup extends Component {

  onSubmit = (formProps) => {
    this.props.signup(formProps);
  }
  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit )}>
        <fieldset>
          <label>Username</label>
          <Field
            name='username'
            type='text'
            component='input'
            autoComplete='none'
          />
        </fieldset>
        <fieldset>
          <label>Email</label>
          <Field
            name='email'
            type='text'
            autoComplete='none'
            component='input'
          />
        </fieldset>
        <fieldset>
          <label>Password</label>
          <Field 
            name='password'
            type='password'
            component='input'
            autoComplete='none'
          />
        </fieldset>
        <div>{this.props.errorMessage}</div>
        <button>Submit</button>
      </form>
    );
  }
}

function maptStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
};


export default compose(
  connect(maptStateToProps, actions),
  reduxForm({form: 'signup'})
)(Signup)
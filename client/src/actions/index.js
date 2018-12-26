import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';


export const signup = ({ email, username, password}, callback) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3090/signup', {
    email, password, username 
    })
    dispatch({ type: AUTH_USER, payload: response.data.token, });
    localStorage.setIterm('token', response.data.token);
    callback();
  } catch(err) { 
    dispatch({ type: AUTH_ERROR, payload: "Email Already In Use"});
  }
};

export const signin = ({email, password }, callback) => async (dispatch) => {
  const response = await axios.post('http://localhost:3090/signin', {
    email, password
  });
  
}


export const signout = () => {
  localStorage.removeItem('token');

  return {
    type: AUTH_USER,
  }
}
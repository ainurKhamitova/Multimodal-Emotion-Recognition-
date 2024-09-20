// slices/authSlice.js

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { persistor } from '../store';
import {resetState} from './videoSlice';

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
    reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
    },
    loginFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    registerStart(state) {
      state.loading = true;
      state.error = null;
    },
    registerSuccess(state) {
      state.loading = false;
      state.isAuthenticated = true;
      state.error = null;
    },
    registerFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
    },
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = null;
        },
    
  },
});

export const { loginStart, loginSuccess, loginFail, registerStart, registerSuccess, registerFail, logoutSuccess} = authSlice.actions;

export const loginUser = userData => async dispatch => {

  dispatch(loginStart());
  try {
    const res = await axios.post('/api/login', userData);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    console.log(err.response);
    dispatch(loginFail(err.response.data.msg));
  }
};

export const registerUser = userData => async dispatch => {
  dispatch(registerStart());
  try {
    await axios.post('/api/register', userData);
    dispatch(registerSuccess());
    dispatch(loginUser(userData));
  } catch (err) {
    dispatch(registerFail(err.response.data.msg));
  }
};


export const logoutUser = () => dispatch => {
  dispatch(logoutSuccess());
  dispatch(resetState());
  
  console.log('Purging state');
  persistor.purge()
};


export const setErrorMessage = message => dispatch => {
  dispatch(loginFail(message));
};

export const updateUserData = email => async dispatch => {
  console.log(email);
  try {
    const res = await axios.get('/api/user', { params: { email } });
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFail(err.response.data.msg));
  }
};

export default authSlice.reducer;

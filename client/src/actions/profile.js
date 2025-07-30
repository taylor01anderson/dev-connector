import axios from 'axios';
import { setAlert } from './alert';
import { useNavigate } from 'react-router-dom';

import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  CLEAR_PROFILE,
} from './types';

// Get current user's profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Create or update user profile
export const createProfile =
  (formData, navigate, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.post('/api/profile', formData, config);

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success')
      );

      if (!edit) {
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        error.response.data.errors.forEach((err) =>
          dispatch(setAlert(err.msg, 'danger'))
        );
      } else {
        dispatch(setAlert('Server error', 'danger'));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response ? error.response.statusText : 'Server Error',
          status: error.response ? error.response.status : 500,
        },
      });
    }
  };

// Add education

export const addEducation = (formData, navigate) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put('/api/profile/education', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Education Added', 'success'));
    navigate('/dashboard');
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      error.response.data.errors.forEach((err) =>
        dispatch(setAlert(err.msg, 'danger'))
      );
    } else {
      dispatch(setAlert('Server error', 'danger'));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response ? error.response.statusText : 'Server Error',
        status: error.response ? error.response.status : 500,
      },
    });
  }
};

// Add experience

export const addExperience = (formData, navigate) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put('/api/profile/experience', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Experience Added', 'success'));
    navigate('/dashboard');
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      error.response.data.errors.forEach((err) =>
        dispatch(setAlert(err.msg, 'danger'))
      );
    } else {
      dispatch(setAlert('Server error', 'danger'));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response ? error.response.statusText : 'Server Error',
        status: error.response ? error.response.status : 500,
      },
    });
  }
};

// Delete experience

export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Experience Removed', 'success'));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response ? error.response.statusText : 'Server Error',
        status: error.response ? error.response.status : 500,
      },
    });
  }
};

// Delete experience

export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Education Removed', 'success'));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response ? error.response.statusText : 'Server Error',
        status: error.response ? error.response.status : 500,
      },
    });
  }
};

// Delete account & profile

export const deleteAccount = (id) => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      const res = await axios.delete(`/api/profile`);

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert('Your account has been permanently deleted'));
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response ? error.response.statusText : 'Server Error',
          status: error.response ? error.response.status : 500,
        },
      });
    }
  }
};

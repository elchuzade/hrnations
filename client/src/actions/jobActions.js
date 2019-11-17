import axios from 'axios';
import {
  GET_JOBS,
  GET_JOB,
  DELETE_JOB,
  ADD_JOB,
  EDIT_JOB,
  ADD_APPLICANT
} from './types';
import {
  refreshErrors,
  refreshResponse,
  getError,
  getResponse,
  setLoading
} from './commonActions';

export const getJobs = () => dispatch => {
  dispatch(setLoading('job'));
  dispatch(refreshErrors());
  axios
    .get('/api/jobs')
    .then(jobs => {
      dispatch({
        type: GET_JOBS,
        payload: jobs.data
      });
    })
    .catch(err => {
      dispatch(getError(err.response.data));
    });
};

export const getJob = id => dispatch => {
  dispatch(setLoading('job'));
  dispatch(refreshErrors());
  axios
    .get(`/api/jobs/${id}`)
    .then(res => {
      dispatch({
        type: GET_JOB,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(getError(err.response.data));
    });
};

export const deleteJob = id => dispatch => {
  dispatch(refreshErrors());
  dispatch(refreshResponse());
  axios
    .delete(`/api/jobs/${id}`)
    .then(res => {
      dispatch(getResponse(res.data));
      dispatch({
        type: DELETE_JOB,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(getError(err.response.data));
    });
};

export const addJob = job => dispatch => {
  dispatch(refreshErrors());
  dispatch(refreshResponse());
  axios
    .post('/api/jobs', job)
    .then(res => {
      dispatch(getResponse(res.data));
      dispatch({
        type: ADD_JOB,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(getError(err.response.data));
    });
};

export const updateJob = (id, job) => dispatch => {
  dispatch(refreshErrors());
  dispatch(refreshResponse());
  axios
    .put(`/api/jobs/${id}`, job)
    .then(res => {
      dispatch(getResponse(res.data));
      dispatch({
        type: EDIT_JOB,
        payload: res.data.item
      });
    })
    .catch(err => {
      dispatch(getError(err.response.data));
    });
};

export const uploadJobAvatar = (imageData, config, id) => dispatch => {
  dispatch(refreshErrors());
  dispatch(refreshResponse());
  axios
    .post(`/api/jobs/avatar/${id}`, imageData, config)
    .then(res => {
      dispatch({
        type: GET_JOB,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(getError(err.response.data));
    });
};

export const deleteJobAvatar = id => dispatch => {
  dispatch(refreshErrors());
  dispatch(refreshResponse());
  axios
    .delete(`/api/jobs/avatar/${id}`)
    .then(res => {
      dispatch({
        type: GET_JOB,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(getError(err.response.data));
    });
};

export const addApplicant = applicant => dispatch => {
  dispatch(refreshErrors());
  dispatch(refreshResponse());
  axios
    .post('/api/applicants', applicant)
    .then(res => {
      dispatch(getResponse(res.data));
      dispatch({
        type: ADD_APPLICANT,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(getError(err.response.data));
    });
};

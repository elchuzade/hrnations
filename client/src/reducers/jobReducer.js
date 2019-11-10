import {
  GET_JOB,
  JOBS_LOADING,
  GET_JOBS,
  ADD_JOB,
  EDIT_JOB,
  DELETE_JOB
} from '../actions/types';

const initialState = {
  job: null,
  jobs: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case JOBS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_JOBS:
      return {
        ...state,
        job: null,
        jobs: action.payload,
        loading: false
      };
    case GET_JOB:
      return {
        ...state,
        job: action.payload,
        loading: false,
        jobs: null
      };
    case DELETE_JOB:
      return {
        ...state,
        jobs: state.jobs.filter(job => job._id !== action.payload.item._id)
      };
    case ADD_JOB:
      state.jobs.unshift(action.payload.item);
      return {
        ...state,
        jobs: state.jobs
      };
    case EDIT_JOB:
      return {
        ...state,
        job: action.payload
      };
    default:
      return state;
  }
};

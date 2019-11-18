import {
  GET_APPLICANTS,
  ADD_APPLICANT,
  APPLICANTS_LOADING
} from '../actions/types';

const initialState = {
  applicants: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case APPLICANTS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_APPLICANTS:
      return {
        ...state,
        applicants: action.payload,
        loading: false
      };
    case ADD_APPLICANT:
      return {
        ...state
      };
    default:
      return state;
  }
};

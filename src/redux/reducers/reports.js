import {retrieveReports} from '../../Core/onboarding/api/firebase/reportApi';

export const GET_MOVIES = 'GET_MOVIES';

export const getMovies = () => {
  try {
    return async dispatch => {
      const res = await retrieveReports();
      console.log('getMovies response  ', res);
      if (res) {
        dispatch({
          type: GET_MOVIES,
          payload: res,
        });
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {
    console.error('error Unable to fetch ', error);
  }
};

const initialState = {
  movies: [],
  favorites: [],
};

function moviesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES:
      return {...state, movies: action.payload};
    default:
      return state;
  }
}

export default moviesReducer;

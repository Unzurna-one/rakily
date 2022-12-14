import {combineReducers} from 'redux';
import {auth} from '../../Core/onboarding/redux/auth';
import moviesReducer from './reports';

const LOG_OUT = 'LOG_OUT';

// combine reducers to build the state
const appReducer = combineReducers({auth, moviesReducer});

const rootReducer = (state, action) => {
  if (action.type === LOG_OUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;

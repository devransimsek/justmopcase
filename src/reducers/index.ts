import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import mechanic from './mechanics-reducer';

const reducers = combineReducers({
  mechanic,
});
export const store = createStore(reducers, applyMiddleware(thunk));

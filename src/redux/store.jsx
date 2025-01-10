import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // Corrected import
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './reducers/authReducer';
import taskReducer from './reducers/taskReducer';

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  tasks: taskReducer,
});

// Apply middleware (thunk)
const middleware = [thunk];

// Create the Redux store with dev tools
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

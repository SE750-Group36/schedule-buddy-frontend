import { applyMiddleware, createStore } from 'redux'
import rootReducer, { IcsState, JobState, UserState } from './reducer'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk'

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

export interface RootState {
  userSlice : UserState,
  icsSlice : IcsState,
  jobSlice : JobState
}

export default createStore(rootReducer, composedEnhancer)
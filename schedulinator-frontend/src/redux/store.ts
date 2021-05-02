import { applyMiddleware, createStore } from 'redux'
import rootReducer, { IcsState } from './reducer'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk'

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

export interface RootState {
  icsSlice : IcsState
}

export default createStore(rootReducer, composedEnhancer)
import { combineReducers, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Dispatch } from "react"
import { Post } from '../Client'

// ICS Slice
export interface IcsState {
  activeIcs : Object;
  activeIcsId : string;
}

const initialState = { } as IcsState

const icsSlice = createSlice({
  name: 'ics',
  initialState,
  reducers: {
    icsUpdate(state, action: PayloadAction<Object>) {
      state.activeIcs = action.payload
    },
    icsPersisted(state, action: PayloadAction<string>) {
      state.activeIcsId = action.payload
    }
  },
})

// Wrapper function which builds thunk function used for async api call
export function persistActiveIcs(ics: Object) {
  return async function persistActiveIcsThunk(dispatch : Dispatch<PayloadAction>, getState : any) {  
    const response = await Post('/fakeApi/todos', ics);
    dispatch({ type: 'ics/icsPersisted', payload: response })
  }
}

export const { icsUpdate } = icsSlice.actions

// Combine reducers and export
export default combineReducers({
  icsSlice: icsSlice.reducer
})

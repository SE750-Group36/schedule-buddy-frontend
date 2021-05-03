import { combineReducers, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Dispatch } from "react"
import { Post, Get } from '../Client'

// ICS Slice
interface Ics {
  id : string,
  ics : Object
}

interface Job {
  name: string,
	estimatedTime: Date,
	deadline: Date,
}

export interface IcsState {
  user : string,
  activeIcs : Ics,
  activeSchedule : Ics,
  schedulingPreferences : Object,
  jobs : Job[]
}

const initialState = { 
  user : "TestUser"
} as IcsState

const icsSlice = createSlice({
  name: 'ics',
  initialState,
  reducers: {
    icsUpdate(state, action: PayloadAction<Ics>) {
      state.activeIcs = action.payload
    },
    scheduleUpdate(state, action: PayloadAction<Ics>) {
      state.activeSchedule = action.payload
    }
  },
})

// Wrapper functions which build thunk functions used for async api calls
export function persistActiveIcs(ics: Object) {
  return async function persistActiveIcsThunk(dispatch : Dispatch<PayloadAction<Ics>>, getState : any) {
    var user = getState().icsSlice.user;
    const response = await Post('/api/calendar', user, JSON.stringify(ics));

    var persistedIcs = { id: response.calName, ics } as Ics;
    dispatch({ type: 'ics/icsUpdate', payload: persistedIcs })
  }
}

export function scheduleJobs() {
  return async function scheduleJobsThunk(dispatch : Dispatch<PayloadAction<Ics>>, getState : any) {  
    var state = getState();
    var requestBody = {
      preferences : state.icsSlice.schedulingPreferences,
      jobs : state.icsSlice.jobs
    }

    var path = '/api/schedule/' + state.icsSlice.activeIcs.id;
    var user = getState().icsSlice.user;
    var response = await Post(path, user, JSON.stringify(requestBody));

    var path = '/api/schedules/' + response.scheduleId;
    response = await Get(path, user);
    dispatch({ type: 'ics/scheduleUpdate', payload: response })
  }
}

export const { icsUpdate } = icsSlice.actions

// Combine reducers and export
export default combineReducers({
  icsSlice: icsSlice.reducer
})

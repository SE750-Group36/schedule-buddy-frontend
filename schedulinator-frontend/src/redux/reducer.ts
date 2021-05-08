import { combineReducers, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Dispatch } from "react"
import { Post, Get } from '../Client'
import { SchedulingPreferences } from "../PreferencesModal"
import set from 'date-fns/set';

// User Slice
export interface UserState {
  user : string,
  schedulingPreferences : SchedulingPreferences
}

const initialUserState : UserState = { 
  user : "608cbbadebda930016288b5c",
  schedulingPreferences : {
    startDate : new Date(Date.now()),
    dailyStartTime : set(new Date(), {hours: 9, minutes: 0}),
    dailyEndTime : set(new Date(), {hours: 17, minutes: 0}),
    blockedTimes : [],
    maxInterval : 120 // In minutes
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    preferencesUpdate(state, action: PayloadAction<SchedulingPreferences>) {
      state.schedulingPreferences = action.payload
    }
  },
})

// ICS Slice
interface Ics {
  id : string,
  ics : Object
}

export interface IcsState {
  activeIcs : Ics,
  activeSchedule : Ics,
}

const icsSlice = createSlice({
  name: 'ics',
  initialState: {} as IcsState,
  reducers: {
    icsUpdate(state, action: PayloadAction<Ics>) {
      state.activeIcs = action.payload
    },
    scheduleUpdate(state, action: PayloadAction<Ics>) {
      state.activeSchedule = action.payload;
    }
  },
})

// Job Slice
export interface Job {
  name: string,
	estimatedTime: number,
	deadline: Date,
}

export interface JobState {
  jobs : {[id : string]: Job}
}

const initialJobState : JobState = {
  jobs : {}
}

const jobSlice = createSlice({
  name: 'job',
  initialState: initialJobState,
  reducers: {
    addJob(state, action: PayloadAction<{id: string, job: Job}>) {
      var newJobs = {
        ...state.jobs,
        [action.payload.id]: action.payload.job
      }
      state.jobs = newJobs;
    },
    removeJob(state, action: PayloadAction<string>) {
      delete state.jobs[action.payload];
    }
  },
})

// Wrapper functions which build thunk functions used for async api calls
export function persistActiveIcs(ics: Object) {
  return async function persistActiveIcsThunk(dispatch : Dispatch<PayloadAction<Ics>>, getState : any) {
    var user = getState().userSlice.user;
    const body = {
      calendar : ics
    }

    const response = await Post('/api/calendar', user, body);

    var persistedIcs = { id: response._id, ics } as Ics;
    dispatch(icsSlice.actions.icsUpdate(persistedIcs));
  }
}

export function scheduleJobs(calendarId : string, jobs : Job[], preferences: SchedulingPreferences) {
  return async function scheduleJobsThunk(dispatch : Dispatch<PayloadAction<Ics>>, getState : any) {  
    var user = getState().userSlice.user;
    var requestBody = {
      preferences,
      jobs
    }

    var path = '/api/schedule/' + calendarId;
    var response = await Post(path, user, requestBody);

    path = '/api/schedule/' + response._id;
    response = await Get(path, user);

    const schedule : Ics = {
      id : response._id,
      ics: response.schedule
    }
    dispatch(icsSlice.actions.scheduleUpdate(schedule));
  }
}

// Exporting actions
export const { icsUpdate, scheduleUpdate } = icsSlice.actions;
export const { addJob, removeJob } = jobSlice.actions;
export const { preferencesUpdate } = userSlice.actions;

// Combine reducers and export
export default combineReducers({
  userSlice : userSlice.reducer,
  icsSlice: icsSlice.reducer,
  jobSlice : jobSlice.reducer
})

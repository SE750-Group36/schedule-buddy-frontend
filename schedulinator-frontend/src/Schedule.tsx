import { FunctionComponent } from 'react'; 
import { Button, makeStyles } from '@material-ui/core';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { scheduleJobs } from './redux/reducer';
import { RootState } from './redux/store';
import classes from '*.module.css';

const useStyles = makeStyles((theme) => ({
  scheduleButton: {
    color: 'white',
    backgroundColor: "#CE9DD9"
  }
}));

const selectScheduleInputs = (state: RootState) => {
  const calendarId = state.icsSlice.activeIcs != null ? state.icsSlice.activeIcs.id : null;
  const preferences = state.userSlice.schedulingPreferences;
  const jobs = Object.values(state.jobSlice.jobs);
  
  return {calendarId, jobs, preferences};
}

export const Schedule: FunctionComponent = () => {
  const dispatch = useDispatch();
  const {calendarId, jobs, preferences} = useSelector(selectScheduleInputs)
  const classes = useStyles();

  const schedule = () => {
    if (calendarId != null && jobs != null && jobs.length > 0 && preferences != null) {
      const generateSchedule = scheduleJobs(calendarId, jobs, preferences);
      dispatch(generateSchedule);
    }
  }

  const readyToSchedule = (calendarId != null) && (jobs != null) && (jobs.length > 0) && (preferences != null);
  return (
    <Button variant="contained" className={classes.scheduleButton} onClick={() => schedule()} disabled={!readyToSchedule}>
      Schedule
    </Button>
  );
}
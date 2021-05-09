import { FunctionComponent } from 'react'; 
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import './App.css';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { saveAs } from 'file-saver'

const { Component } = require('ical.js')

const useStyles = makeStyles((theme) => ({
  exportButton: {
    color: 'white',
    backgroundColor: "rgba(206, 157, 217, 0.8)",
    marginRight: '10px',
    '&:hover': {
      backgroundColor: "#CE9DD9",
   },
  }
}));

// 206, 157, 217


const selectActiveSchedule = (state : RootState) => {
  if (state.icsSlice.activeSchedule != null) {
    var schedule = new Component(state.icsSlice.activeSchedule.ics);

    return schedule;
  }
  
  return null;
}
export const ICSExport: FunctionComponent = () => {
  const schedule = useSelector(selectActiveSchedule)
  const classes = useStyles()

  const exportSchedule = () => {
    if (schedule != null) {
      var blob = new Blob([schedule.toString()], {type: "text/plain;charset=utf-8"});
      saveAs(blob, "schedule.ics");
    }
  }

  return (
    <Button variant="contained" className={classes.exportButton}  onClick={() => exportSchedule()}>
      Export Schedule
    </Button>
  );
}
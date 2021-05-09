import DateFnsUtils from "@date-io/date-fns";
import { Button, Divider, IconButton, makeStyles, Paper, TextField } from "@material-ui/core";
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { FunctionComponent, useState } from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import { format } from 'date-fns';
import { pickerTheme } from './PickerTheme'
import { ThemeProvider } from "@material-ui/styles";
import { RootState } from "./redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addJob, Job, removeJob } from './redux/reducer'

const useStyles = makeStyles((theme) => ({
  jobsPanel : {
    borderLeft : 'None',
    padding : '12px',
    width : '410px'
  },
  header : {
    marginTop : '0px'
  },
  inputField : {
    marginBottom : '12px',
    '& input:valid + fieldset': {
      borderColor: 'lightgrey',
      borderWidth: 1,
    },
    '& input:valid:focus + fieldset': {
      borderWidth: 2,
      borderColor: '#B399D4',
    },
  },
  inputLabel: {
    "&.Mui-focused": {
      color: "#B399D4"
    }
  },
  deadlineInputField : {
    marginBottom : '12px',
    width : '100%',
    "& .MuiInputBase-root.Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderWidth: 2,
        borderColor: '#B399D4',
      }
    }
  },
  addButton : {
    marginBottom : '12px',
    backgroundColor : '#B399D4',
    '&:hover': {
      backgroundColor: '#CE9DD9',
   },
  },
  jobPaper : {
    display : 'flex',
    alignItems : 'center',
    justifyContent : 'space-between',
    width : '100%',
    marginBottom : '6px',
  },
  jobText : {
    margin : '11px'
  },
  jobHeader : {
    margin : '0px'
  },
  jobDetails : {
    margin : '0px'
  }
}));

const selectJobs = (state : RootState) => {
  return state.jobSlice.jobs;
} 

export const Jobs: FunctionComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("Job");
  const [estimatedTime, setEstimatedTime] = useState<number>(10);
  const [deadline, setDeadline] = useState<Date | null>(null);
  const jobs = useSelector(selectJobs);

  const createJob = () => {
    if (jobs[name] !== undefined) {
      // Avoiding duplicate jobs
      return;
    }

    if (deadline !== null && name !== '' && estimatedTime > 0) {
      const job : Job = {
        name,
        estimatedTime,
        deadline
      }

      dispatch(addJob({id: job.name, job}))
    }
  }

  const deleteJob = (job: Job) => {
    var newJobs = {...jobs};
    delete newJobs[job.name];

    dispatch(removeJob(job.name));
  }

  const jobPaper = (job: Job) => {
    var nameString = "Due: " + format(job.deadline, "iiii, do");
    var deadlineString  = "Estimated Time: " + job.estimatedTime + " hours";

    return (
      <Paper className={classes.jobPaper} key={job.name} variant="outlined">
        <span className={classes.jobText}>
          <h4 className={classes.jobHeader}>{job.name}</h4>
          <ul className={classes.jobDetails}>
            <li>{nameString}</li>
            <li>{deadlineString}</li>
          </ul>
        </span>
        <IconButton onClick={() => deleteJob(job)} children={<DeleteIcon  color="secondary"/>} color="inherit" style={{padding : '6px'}}></IconButton>
      </Paper>
    )
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Paper className={classes.jobsPanel} variant="outlined" square={true}>
        <h3 className={classes.header}>Add Jobs</h3>
        <TextField 
          id="outlined-read-only-input" label="Name" variant="outlined" 
          size="small" InputLabelProps={{shrink: true, className: classes.inputLabel}} value={name}
          onChange={(event) => {setName(event.target.value)}}
          className={classes.inputField}
          />
        <TextField 
          type="number" variant="outlined" size="small" label="Estimated Time (Hours)" 
          InputLabelProps={{shrink: true, className: classes.inputLabel}} onChange={(event) => setEstimatedTime(parseInt(event.target.value))}
          value={estimatedTime} className={classes.inputField}
          />
        <ThemeProvider theme={pickerTheme}> 
          <KeyboardDateTimePicker 
            size="small" variant="inline" label="Deadline" inputVariant="outlined" format="PPPPp"
            value={deadline} onChange={(date) => date == null ? null : setDeadline(date)} 
            className={classes.deadlineInputField} clearable InputLabelProps={{shrink: true, className: classes.inputLabel}}
            multiline
          />
        </ThemeProvider>
          <Button
            variant="contained" color="primary"  onClick={() => createJob()} className={classes.addButton}
            disabled={deadline === null || name === '' || estimatedTime <= 0}> 
            Add
          </Button>

          <Divider className={classes.inputField}/>

          {Object.values(jobs).map(job => jobPaper(job))}
      </Paper>
    </MuiPickersUtilsProvider>
  );
}
import { Button, Divider, Fade, FormControl, FormControlLabel, FormLabel, IconButton, makeStyles, Modal, Paper, Radio, RadioGroup, TextField } from '@material-ui/core';
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import { FunctionComponent, useState } from 'react'; 
import DateFnsUtils from '@date-io/date-fns';
import set from 'date-fns/set';
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import { format } from 'date-fns';

enum Repeat {
  Never,
  Daily,
  Weekly
}

interface BreakTime {
  breakDate : Date
  breakStart : Date,
  breakEnd : Date,
  repeats : Repeat,
}

interface SchedulingPreferences {
  startDate : Date,
  dailyStartTime : Date, 
  dailyEndTime : Date,
  blockedTimes : BreakTime[]
  maxInterval : number
}

const initialPreferences : SchedulingPreferences = {
  startDate : new Date(Date.now()),
  dailyStartTime : set(new Date(), {hours: 9, minutes: 0}),
  dailyEndTime : set(new Date(), {hours: 17, minutes: 0}),
  blockedTimes : [],
  maxInterval : 120 // In minutes
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(0, 4, 3),
    justifyContent: 'space-between',
  },
  prefHor: {
    marginRight: '30px'
  },
  prefVert: {
    marginBottom: '20px'
  },
  breakField: {
    marginBottom: '20px',
    maxWidth: '250px'
  },
  radio : {
    marginBottom: '20px',
    marginRight : '30px'
  },
  breakTime : {
    marginBottom: '10px',
    paddingLeft : '5px',
    paddingRight : '5px',
    display : 'flex',
    alignItems : 'center',
    justifyContent : 'space-between',
    width : '100%'
  },
  prefSettings : {
    marginBottom: '20px',
    display : 'flex'
  },
  dailyTimes : {
    display : 'flex',
    flexDirection : 'column'
  }
}));

export const PreferencesModal: FunctionComponent = () => {
  const [preferences, setPreferences] = useState<SchedulingPreferences>(initialPreferences);
  const [open, setOpen] = useState<boolean>(true)
  const [repeats, setRepeats] = useState<Repeat>(Repeat.Never);
  const [breakStart, setBreakStart] = useState<Date>(set(new Date(), {hours: 12, minutes: 0}));
  const [breakEnd, setBreakEnd] = useState<Date>(set(new Date(), {hours: 13, minutes: 0}));
  const [breakDate, setBreakDate] = useState<Date>(new Date());
  const classes = useStyles();

  const updateTypeReferenceNode = (key: string, value : Date | number | null) => {
    if (value != null) {
      setPreferences({
        ...preferences, 
        [key]: value
      });
    }
  } 

  const createBreak = () => {
    console.log(breakDate)
    const breakTime : BreakTime = {
      breakDate,
      repeats,
      breakStart,
      breakEnd
    };

    var breakTimes = preferences.blockedTimes;
    breakTimes.push(breakTime);
    setPreferences({...preferences, blockedTimes : breakTimes})
  }

  const setRepeatMode = (modeString : string) => {
    switch(modeString) {
      case '0':
        setRepeats(Repeat.Never);
        break;
      case '1':
        setRepeats(Repeat.Daily);
        break;
      case '2':
        setRepeats(Repeat.Weekly);
        break;
    }
  }

  const deleteBreak = (index: number) => {
    var breakTimes = preferences.blockedTimes;
    breakTimes.splice(index, 1);
    setPreferences({...preferences, blockedTimes: breakTimes})
  }

  const breakTimePaper = (breakTime: BreakTime, index : number) => {
    var dateString = '';
    switch(breakTime.repeats) {
      case Repeat.Never:
        dateString = dateString + format(breakTime.breakDate, 'iiii do MMMM');
        break;
      case Repeat.Daily:
        dateString = dateString + 'Every Day';
        break;
      case Repeat.Weekly:
        dateString = dateString + 'Every ' + format(breakTime.breakDate, 'iiii');
        break;
    }

    var timeString = format(breakTime.breakStart, 'h:mmaaa') + ' - ' + format(breakTime.breakEnd, 'h:mmaaa')

    return (
      <Paper className={classes.breakTime} key={index} elevation={3} variant="outlined"> 
        <FreeBreakfastIcon color="primary" style={{padding : '6px'}}/>
        <span>{dateString}</span>
        <span>{timeString}</span>
        <IconButton onClick={() => deleteBreak(index)} children={<DeleteIcon fontSize="small" color="action"/>} color="inherit" style={{padding : '6px'}}></IconButton>
      </Paper>
    )
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Modal
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
      >
        <Fade in={open}>
          <FormControl className={classes.paper}>
            <h3 className={classes.prefHor}>Scheduling Preferences</h3>
            <div className={classes.prefSettings}>
              <KeyboardDatePicker className={classes.prefHor} size="small" variant="inline" label="Start Date" inputVariant="outlined" format={"iiii, do"} value={preferences.startDate} onChange={startDate => updateTypeReferenceNode('startDate', startDate)} />
              <TextField type="number" className={classes.prefHor} variant="outlined" size="small" label="Task Interval (Minutes)" value={preferences.maxInterval} onChange={event => setPreferences({...preferences, maxInterval: parseInt(event.target.value)})}/>
              <div className={classes.dailyTimes}>
                <KeyboardTimePicker className={classes.prefVert} minutesStep={15} size="small" variant="inline" label="Daily Start Time" inputVariant="outlined" format={"h:mmaaa"} value={preferences.dailyStartTime} onChange={startTime => updateTypeReferenceNode('dailyStartTime', startTime)} />
                <KeyboardTimePicker minutesStep={15} size="small" variant="inline" label="Daily Finish Time" inputVariant="outlined" format={"h:mmaaa"} value={preferences.dailyEndTime} onChange={endTime => updateTypeReferenceNode('dailyEndTime', endTime)}/>
              </div>
            </div>

            <Divider className={classes.prefVert}/>

            <h4 style={{marginTop: '0px'}}>Add Break Times</h4>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
                <RadioGroup name="Repeats" className={classes.radio} onChange={event => setRepeatMode(event.target.value)}>
                  <FormControlLabel checked={repeats==Repeat.Never} value={Repeat.Never} control={<Radio />} label="One Off" />
                  <FormControlLabel checked={repeats==Repeat.Daily} value={Repeat.Daily} control={<Radio />} label="Daily" />
                  <FormControlLabel className={classes.prefVert} checked={repeats==Repeat.Weekly} value = {Repeat.Weekly} control={<Radio />} label="Weekly" />
                  <Button variant="outlined" color="primary" onClick={() => createBreak()}>Add</Button>
                </RadioGroup>
                <div style={{display: 'flex', flexDirection: 'column', marginRight: '30px'}}>
                  {repeats!=Repeat.Daily ? <KeyboardDatePicker className={classes.breakField} size="small" variant="inline" label="Date" inputVariant="outlined" format={"iiii, do"} value={breakDate} onChange={date => date == null ? null : setBreakDate(date)} /> : ''}
                  <KeyboardTimePicker className={classes.breakField} minutesStep={15} size="small" variant="inline" label="Start" inputVariant="outlined" format={"h:mmaaa"} value={breakStart} onChange={startTime => startTime == null ? null : setBreakStart(startTime)} />
                  <KeyboardTimePicker className={classes.breakField} minutesStep={15} size="small" variant="inline" label="End" inputVariant="outlined" format={"h:mmaaa"} value={breakEnd} onChange={endTime => endTime == null ? null : setBreakEnd(endTime)} />
                </div>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '400px'}}>
                {preferences.blockedTimes.map((breakTime, index) => breakTimePaper(breakTime, index))}
              </div>
            </div>

            <Button variant="contained" color="primary" style={{width: '120px', alignSelf: 'center', marginTop: '10px'}} onClick={() => setOpen(false)}>Done</Button>
          </FormControl>
        </Fade>
        
      </Modal>
    </MuiPickersUtilsProvider>
  )
}

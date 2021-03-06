import { Button, Divider, Fade, FormControl, FormControlLabel, IconButton, Modal, Paper, Radio, RadioGroup, TextField } from '@material-ui/core';
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { FunctionComponent, useState } from 'react'; 
import DateFnsUtils from '@date-io/date-fns';
import set from 'date-fns/set';
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
import DeleteIcon from '@material-ui/icons/Delete';
import { pickerTheme } from './styles/PickerTheme'
import { ThemeProvider } from "@material-ui/styles";
import { format } from 'date-fns';
import { RootState } from './redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { preferencesUpdate } from './redux/reducer';
import { useStyles } from './styles/PreferencesModal.styles';

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

export interface SchedulingPreferences {
  startDate : Date,
  dailyStartTime : Date, 
  dailyEndTime : Date,
  blockedTimes : BreakTime[]
  maxInterval : number
}

interface PreferencesModalProps {
  modalOpen : boolean,
  setModalOpen : Function
}

const selectPreferences = (state: RootState) => {
  return state.userSlice.schedulingPreferences;
}

export const PreferencesModal: FunctionComponent<PreferencesModalProps> = ({modalOpen, setModalOpen}) => {
  const userPreferences = useSelector(selectPreferences);
  const dispatch = useDispatch();
  
  const [preferences, setPreferences] = useState<SchedulingPreferences>(userPreferences);
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
    const breakTime : BreakTime = {
      breakDate,
      repeats,
      breakStart,
      breakEnd
    };

    var breakTimes = [...preferences.blockedTimes];
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
    var breakTimes = [...preferences.blockedTimes];
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
        <FreeBreakfastIcon style={{padding : '6px', color : "#B399D4"}}/>
        <span>{dateString}</span>
        <span>{timeString}</span>
        <IconButton onClick={() => deleteBreak(index)} children={<DeleteIcon fontSize="small" color="action"/>} color="inherit" style={{padding : '6px'}}></IconButton>
      </Paper>
    )
  }

  const handleClose = () => {
    setModalOpen(false);

    // Updating users preferences
    dispatch(preferencesUpdate(preferences));
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Modal
        className={classes.modal}
        open={modalOpen}
        onClose={() => handleClose()}
      >
        <Fade in={modalOpen}>
          <FormControl className={classes.paper}>
            <h3 className={classes.prefHor}>Scheduling Preferences</h3>
            <div className={classes.prefSettings}>
              <ThemeProvider theme={pickerTheme}> 
                <KeyboardDatePicker className={classes.prefHor} size="small" variant="inline" label="Start Date" inputVariant="outlined" format={"iiii, do"} value={preferences.startDate} onChange={startDate => updateTypeReferenceNode('startDate', startDate)} InputLabelProps={{className: classes.inputLabel}}/>
                <TextField type="number" className={classes.prefHor} variant="outlined" size="small" label="Task Interval (Minutes)" value={preferences.maxInterval} onChange={event => setPreferences({...preferences, maxInterval: parseInt(event.target.value)})} InputLabelProps={{className: classes.inputLabel}}/>
              </ThemeProvider>
              <div className={classes.dailyTimes}>
                <ThemeProvider theme={pickerTheme}>
                  <KeyboardTimePicker className={classes.prefVert} minutesStep={15} size="small" variant="inline" label="Daily Start Time" inputVariant="outlined" format={"h:mmaaa"} value={preferences.dailyStartTime} onChange={startTime => updateTypeReferenceNode('dailyStartTime', startTime)} InputLabelProps={{className: classes.inputLabel}}/>
                  <KeyboardTimePicker minutesStep={15} size="small" variant="inline" label="Daily Finish Time" inputVariant="outlined" format={"h:mmaaa"} value={preferences.dailyEndTime} onChange={endTime => updateTypeReferenceNode('dailyEndTime', endTime)} InputLabelProps={{className: classes.inputLabel}}/>
                </ThemeProvider>
              </div>
            </div>

            <Divider className={classes.prefVert}/>

            <h4 style={{marginTop: '0px'}}>Add Break Times</h4>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
                <RadioGroup name="Repeats" className={classes.radio} onChange={event => setRepeatMode(event.target.value)}>
                  <FormControlLabel checked={repeats===Repeat.Never} value={Repeat.Never} control={<Radio classes={{root: classes.formRadio, checked: classes.checked}} />} label="One Off" />
                  <FormControlLabel checked={repeats===Repeat.Daily} value={Repeat.Daily} control={<Radio classes={{root: classes.formRadio, checked: classes.checked}} />} label="Daily" />
                  <FormControlLabel className={classes.prefVert} checked={repeats===Repeat.Weekly} value = {Repeat.Weekly} control={<Radio classes={{root: classes.formRadio, checked: classes.checked}} />} label="Weekly" />
                  <Button variant="outlined" className={classes.addButton} onClick={() => createBreak()}>Add</Button>
                </RadioGroup>
                <div style={{display: 'flex', flexDirection: 'column', marginRight: '30px'}}>
                  <ThemeProvider theme={pickerTheme}>
                    {repeats!==Repeat.Daily ? <KeyboardDatePicker className={classes.breakField} size="small" variant="inline" label="Date" inputVariant="outlined" format={"iiii, do"} value={breakDate} onChange={date => date == null ? null : setBreakDate(date)} InputLabelProps={{className: classes.inputLabel}} /> : ''}
                    <KeyboardTimePicker className={classes.breakField} minutesStep={15} size="small" variant="inline" label="Start" inputVariant="outlined" format={"h:mmaaa"} value={breakStart} onChange={startTime => startTime == null ? null : setBreakStart(startTime)} InputLabelProps={{className: classes.inputLabel}} />
                    <KeyboardTimePicker className={classes.breakField} minutesStep={15} size="small" variant="inline" label="End" inputVariant="outlined" format={"h:mmaaa"} value={breakEnd} onChange={endTime => endTime == null ? null : setBreakEnd(endTime)} InputLabelProps={{className: classes.inputLabel}} />
                  </ThemeProvider>
                </div>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '400px'}}>
                {preferences.blockedTimes.map((breakTime, index) => breakTimePaper(breakTime, index))}
              </div>
            </div>
            <Button variant="contained" color="primary" style={{width: '120px', alignSelf: 'center', marginTop: '10px', backgroundColor: '#B399D4'}} onClick={() => handleClose()}>Done</Button>
          </FormControl>
        </Fade>
        
      </Modal>
    </MuiPickersUtilsProvider>
  )
}

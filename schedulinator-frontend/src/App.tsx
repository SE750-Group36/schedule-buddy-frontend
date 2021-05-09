import './App.css';
import { RootState } from './redux/store';
import { useSelector } from 'react-redux'
import{ Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { useEffect, useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import QueueIcon from '@material-ui/icons/Queue';
import { ThemeProvider } from '@material-ui/styles';
import { useTheme } from '@material-ui/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { PreferencesModal } from './PreferencesModal';
import { Jobs } from './Jobs';
import { ReactComponent as ScheduleBuddyLogo } from './scheduleBuddy.svg';
import { Schedule } from './Schedule';
import { ICSExport } from './ICSExport';
import { ICSImport } from './ICSImport';
import { StyleWrapper, useStyles } from './styles/App.styles'

const { Component } = require('ical.js')

const selectActiveICS = (state : RootState) => {
  if (state.icsSlice.activeIcs != null) {
    var cal = new Component(state.icsSlice.activeIcs.ics);

    return cal;
  }
  
  return null;
}

const selectActiveSchedule = (state : RootState) => {
  if (state.icsSlice.activeSchedule != null) {
    var schedule = new Component(state.icsSlice.activeSchedule.ics);

    return schedule;
  }
  
  return null;
} 

const history = createBrowserHistory();

const sideBarStyles = {
  position: 'relative'
} as React.CSSProperties;

function getPropertyForEvent(event: Array<any>, property: String): String{
  return event[1].filter((entry: any) => !entry[0].localeCompare(property))[0][3];
}

function App() {
  const ics = useSelector(selectActiveICS)
  const schedule = useSelector(selectActiveSchedule)
  const [calendarData, setCalendarData] = useState<Array<any>>([]);
  const [scheduleData, setScheduleData] = useState<Array<any>>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const classes = useStyles();

  useEffect(() => {
    if(ics){
      // Remove the time zone entry from the event list
      const events = ics.jCal[2].slice(1)
      const eventList: Array<any>= []
      
      events.forEach((event: any) => {
        // Get the required properties and convert to calendar format
        const calEvent = { 
          title: getPropertyForEvent(event, "summary"), 
          start: getPropertyForEvent(event, "dtstart"), 
          end: getPropertyForEvent(event, "dtend")
        };
  
        eventList.push(calEvent)
      });

      setCalendarData(eventList);
    }
  }, [ics])

  useEffect(() => {
    if(schedule){
      // Remove the time zone entry from the event list
      const events = schedule.jCal[2].slice(1)
      const eventList: Array<any>= []
      
      events.forEach((event: any) => {
        // Get the required properties and convert to calendar format
        const calEvent = { 
          title: getPropertyForEvent(event, "summary"), 
          start: getPropertyForEvent(event, "dtstart"), 
          end: getPropertyForEvent(event, "dtend")
        };
  
        eventList.push(calEvent)
      });

      setScheduleData(eventList);
    }
  }, [schedule])

  const theme = useTheme();
  theme.zIndex.appBar = theme.zIndex.drawer + 50;

  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>

        <AppBar className={classes.appBar} position="relative" >
          <Toolbar className={classes.toolBar}>
            <ScheduleBuddyLogo style={{ paddingRight : '12px' }}/>
            <Typography variant="h6" className={classes.title}>
              Schedule Buddy
            </Typography>
            <Schedule/>
            <ICSExport/>
          </Toolbar>
        </AppBar>
        
        <div className={classes.pageContent}>
          <Drawer
            variant="persistent"
            anchor="left"
            open={true}
            PaperProps={{style: sideBarStyles, elevation: 3}}
          >
            <List>
              <ListItem>
                <IconButton component='label' className={classes.icon} children={[<QueueIcon/>, <ICSImport/>]} ></IconButton>
              </ListItem>
              <ListItem>
                <IconButton className={classes.icon} onClick={() => {setModalOpen(true)}} children={<SettingsIcon/>} ></IconButton>
              </ListItem>
            </List>
          </Drawer>

          <Jobs/>

          <Switch>
            <Route exact path="/">
              <div className={classes.calendar}>
                <StyleWrapper>
                  <FullCalendar
                    height='92vh'
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                      left: 'prev,next today',
                      center: 'title',
                      right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    initialView="dayGridMonth"
                    weekends={true}
                    eventSources={[calendarData, scheduleData]}
                  />
                </StyleWrapper>
              </div>
            </Route>

            <Route path="/settings"></Route>
          </Switch>
        </div>
        
        <PreferencesModal modalOpen={modalOpen} setModalOpen={setModalOpen} />

        
      </Router>
    </ThemeProvider>
  );
}

export default App;

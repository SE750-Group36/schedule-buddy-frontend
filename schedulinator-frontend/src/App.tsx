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
import Button from '@material-ui/core/Button';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import SettingsIcon from '@material-ui/icons/Settings';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles, useTheme } from '@material-ui/core';
import { ICSImport } from './ICSImport';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { PreferencesModal } from './PreferencesModal';
import { Jobs } from './Jobs';
import { ReactComponent as ScheduleBuddyLogo } from './scheduleBuddy.svg';
import styled from "@emotion/styled";

const { Component } = require('ical.js')

const selectActiveICS = (state : RootState) => {
  if (state.icsSlice.activeIcs != null) {
    var cal = new Component(state.icsSlice.activeIcs.ics);

    return cal;
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

const useStyles = makeStyles((theme) => ({
  pageContent: {
    display: 'flex'
  },
  calendar : {
    width : '100%',
    padding : '12px'
  },
  appBar : {
    color: 'black',
    background: 'white',
  },
  toolBar : {
    paddingLeft: '10px',
    paddingRight: '0px'
  },
  title: {
    flexGrow: 1,
  },
}));

// needed for the style wrapper


// add styles as css
export const StyleWrapper = styled.div`
  .fc-button.fc-prev-button, .fc-button.fc-next-button, .fc-button.fc-button-primary{
    background: grey;
    background-image: none;
    border: none;
    margin-right: 8px;
    border-radius: 5px;
  }
  .fc-button.fc-button-primary.fc-button-active {
    background: #CE9DD9;
    background-image: none;
    border: none; 
  }
  .fc-button.fc-button-primary:hover {
    background: #CE9DD9;
    background-image: none;
    border: none; 
  }
  .fc-col-header-cell.fc-day {
    background: rgba(206, 157, 217, 0.4);
    border-color: grey;
  }
`

function App() {
  const ics = useSelector(selectActiveICS)
  const [calendarData, setCalendarData] = useState<Array<any>>();
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

  const theme = useTheme();
  theme.zIndex.appBar = theme.zIndex.drawer + 50;

  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>

        <AppBar className={classes.appBar} position="relative" >
          <Toolbar className={classes.toolBar}>
            <ScheduleBuddyLogo/>
            <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>
            <Typography variant="h6" className={classes.title}>
              Schedule Buddy
            </Typography>
            <ICSImport/>
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
                <IconButton onClick={() => {}} children={<CalendarTodayIcon/>} color="inherit" ></IconButton>
              </ListItem>

              <ListItem>
                <IconButton onClick={() => {}} children={<EventAvailableIcon/>} color="inherit" ></IconButton>
              </ListItem>

              <ListItem>
                <IconButton onClick={() => {setModalOpen(true)}} children={<SettingsIcon/>} color="inherit" ></IconButton>
              </ListItem>
            </List>
          </Drawer>

          <Jobs></Jobs>

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
                    events={calendarData}
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

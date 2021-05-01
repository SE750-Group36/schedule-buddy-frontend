import React from 'react';
import{ BrowserRouter, Router, Switch, Route, Link} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import SettingsIcon from '@material-ui/icons/Settings';
import { makeStyles } from '@material-ui/core/styles';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'


import logo from './logo.svg';
import './App.css';

const history = createBrowserHistory();

const dummyEvents = {
  eventList: [
    {
      title: '701 Assignment',
      start: '2021-05-10T10:30:00',
      end: '2021-05-13T11:30:00'
    }
  ]
};

function App() {
  return (
    <Router history={history}>

      <AppBar position="static" style={{zIndex: 100}}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>
          <Typography variant="h6">
            Add Event
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      
      <Drawer
        variant="persistent"
        anchor="left"
        open={true}
      >
        <List>
          <ListItem>
            <ListItemIcon> <CalendarTodayIcon/> </ListItemIcon>
          </ListItem>

          <ListItem>
            <ListItemIcon> <EventAvailableIcon/> </ListItemIcon>
          </ListItem>

          <ListItem>
            <ListItemIcon> <SettingsIcon/> </ListItemIcon>
          </ListItem>
        </List>
      </Drawer>

      <Switch>
        <Route exact path="/">
          <FullCalendar
            height='92vh'
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
            weekends={true}
            events={dummyEvents.eventList}
          />
        </Route>

        <Route path="/settings"></Route>
      </Switch>
    </Router>
  );
}

export default App;

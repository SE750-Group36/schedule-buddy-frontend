import './App.css';
import { RootState } from './redux/store';
import { persistActiveIcs } from './redux/reducer'

import { useDispatch, useSelector } from 'react-redux'
import{ Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import SettingsIcon from '@material-ui/icons/Settings';
import { ThemeProvider } from '@material-ui/styles';
import { useTheme } from '@material-ui/core';

const { Component } = require('ical.js')

const selectActiveICS = (state : RootState) => {
  if (state.icsSlice.activeIcs != null) {
    var cal = new Component(state.icsSlice.activeIcs);

    return cal;
  }
  
  return null;
}

const history = createBrowserHistory();

const sideBarStyles = {
  position: 'relative'
} as React.CSSProperties;

function App() {
  const dispatch = useDispatch()
  const ics = useSelector(selectActiveICS)

  const persistIcsThunk = persistActiveIcs(ics);
  dispatch(persistIcsThunk);

  const theme = useTheme();
  theme.zIndex.appBar = theme.zIndex.drawer + 50;

  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>

        <AppBar position="relative">
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
          PaperProps={{style: sideBarStyles}}
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
          <Route exact path="/"></Route>

          <Route path="/settings"></Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;

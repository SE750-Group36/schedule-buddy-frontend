import React from 'react';
import{ BrowserRouter, Router, Switch, Route, Link} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import SettingsIcon from '@material-ui/icons/Settings';



import logo from './logo.svg';
import './App.css';

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>

      {/* sidebar */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={true}
      >
        {/* <div>
          <IconButton>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div> */}
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Switch>
        <Route exact path="/">

        </Route>
        <Route path="/settings">
          
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

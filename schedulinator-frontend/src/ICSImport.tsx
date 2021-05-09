import { FunctionComponent } from 'react'; 
import { InputBase } from '@material-ui/core';
import './App.css';
import { persistActiveIcs } from './redux/reducer'
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';

const { parse } = require('ical.js')

const useStyles = makeStyles((theme) => ({
  icsImport: {
    display: 'none'
  }
}));


export const ICSImport: FunctionComponent = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  var readICS = (event: any) => {
    var icsFile = event.target.files[0];

    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      if (event.target?.result != null) {
        var fileData = event.target.result;

        var icsJson = parse(fileData.toString());

        // Parsing file data into json and dispatching ics update
        const persistIcsThunk = persistActiveIcs(icsJson);
        dispatch(persistIcsThunk);
      }
    });

    if (icsFile instanceof Blob) {
      reader.readAsText(icsFile);
    }
  }

  return (
    <input id='icsimport' className={classes.icsImport} accept='.ics' type='file' onChange={(event) => readICS(event)}></input>
  );
}
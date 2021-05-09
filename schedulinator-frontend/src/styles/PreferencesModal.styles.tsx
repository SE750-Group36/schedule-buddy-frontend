import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
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
    styledInput : {
      "& .MuiInputBase-root.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderWidth: 2,
          borderColor: '#B399D4',
        }
      }
    },
    inputLabel: {
      "&.Mui-focused": {
        color: "#B399D4"
      }
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
    },
    addButton : {
      borderColor: '#B399D4',
    },
    formRadio: {
      '&$checked': {
        color: '#B399D4'
      }
    },
    checked: {},
  }));
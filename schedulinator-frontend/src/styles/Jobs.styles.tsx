import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
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
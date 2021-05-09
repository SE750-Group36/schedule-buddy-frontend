import { makeStyles } from '@material-ui/core';
import styled from "@emotion/styled";

export const useStyles = makeStyles((theme) => ({
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
    icon: {
      color: 'black',
      '&:hover': {
         color: '#CE9DD9',
         background: 'none'
      },
    },
  }));
  
  // Calendar styling
  export const StyleWrapper = styled.div`
    .fc-button.fc-prev-button, .fc-button.fc-next-button, .fc-button.fc-button-primary{
      background: grey;
      background-image: none;
      border: none;
      border-radius: 5px;
      box-shadow: none !important;
    }
    .fc-button.fc-button-primary.fc-button-active {
      background: #CE9DD9;
      box-shadow: none !important;
    }
    .fc-button.fc-button-primary.fc-button-active:hover {
      background: #CE9DD9;
    }
    .fc-button.fc-button-primary:hover {
      background: #B399D4;
      background-image: none;
      box-shadow: none !important;
    }
    .fc-col-header-cell.fc-day {
      background: rgba(206, 157, 217, 0.4);
      border-color: grey;
    }
    .fc-daygrid-event-dot {
      border: 4px solid #CE9DD9;
    }
    .fc-daygrid-block-event {
      background: #CE9DD9;
      border: none;
    }
    .fc-v-event {
      background: #CE9DD9;
      border: none;
    }
  `
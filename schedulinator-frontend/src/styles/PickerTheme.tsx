import { createMuiTheme } from '@material-ui/core/styles';

export const pickerTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#CE9DD9',
          },
      },
    overrides: {
      MuiPickersClockPointer: {
        pointer: {
          backgroundColor: '#CE9DD9'
        },
        thumb: {
          border: '14px solid #CE9DD9'
        },
        noPoint: {
          backgroundColor: '#CE9DD9',
        }
      },
      MuiPickersClock: {
        pin: {
          backgroundColor: '#CE9DD9'
        }
      },
      MuiPickersToolbar: {
        toolbar: {
          backgroundColor: '#CE9DD9',
        },
      },
      MuiPickersCalendarHeader: {
        switchHeader: {
          backgroundColor: 'white',
          color: 'black',
        },
      },
      MuiPickersDay: {
        day: {
          color: '#CE9DD9',
        },
        daySelected: {
          backgroundColor: '#CE9DD9',
          '&:hover': {
            backgroundColor: '#CE9DD9',
          }
        },
        dayDisabled: {
          color: 'black',
        },
        current: {
          color: 'black',
        },
      },
      MuiPickerDTTabs: {
        tabs: {
            color: 'white',
            backgroundColor: '#CE9DD9',
            borderTop: '1px solid white'
        }
      },
    },
  });
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
    exportButton: {
      color: 'white',
      backgroundColor: "rgba(206, 157, 217, 0.8)",
      marginRight: '10px',
      '&:hover': {
        backgroundColor: "#CE9DD9",
     },
    }
}));
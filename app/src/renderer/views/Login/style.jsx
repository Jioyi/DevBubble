import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    paper: {
      backgroundColor: '#2f3136',
      padding: theme.spacing(0),
      margin: theme.spacing(0),
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      flexGrow: 1,
      justifyContent: 'center',
      flexDirection: 'column',
      input: {
        color: '#8e9297',
        borderColor: '#8e9297',
      },
      '& label.Mui-focused': {
        color: '#8e9297',
        borderColor: '#8e9297',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#8e9297',
        color: '#8e9297',
        borderColor: '#8e9297',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          color: '#8e9297',
          borderColor: '#8e9297',
        },
        '&:hover fieldset': {
          color: '#8e9297',
          borderColor: '#8e9297',
        },
        '&.Mui-focused fieldset': {
          color: '#8e9297',
          borderColor: '#8e9297',
        },
      },
      '& .Mui-error': {
        color: '#8e9297',
      },
      '& .MuiFormHelperText-root': {
        color: '#8e9297',
      },
    },
    title: {
      margin: theme.spacing(2),
      textAlign: 'left',
      color: '#8e9297',
      fontSize: '1.4rem',
      fontWeight: 600,
    },
    span: {
      textAlign: 'left',
      color: '#8e9297',
      fontSize: '0.8rem',
      fontWeight: 600,
    },
    input: {
      fontSize: '0.8rem',
      color: '#8e9297',
      borderColor: '#8e9297',
    },
    textField: {
      color: '#fff',
      width: '40ch',
      paddingTop: '0',
      paddingBottom: '0',
    },
    image: {
      height: '200px',
      width: '200px',
      '@media (max-height: 620px)': {
        display: 'none',
      },
    },
    button: {
      width: 'fit-content',
      margin: 'auto',
      backgroundColor: '#5865f2',
      color: '#ffffff',
      fontWeight: 'bold',
      borderRadius: 6,
      padding: '6px 16px 6px 16px',
      'white-space': 'nowrap',
      textTransform: 'none',
      '&:hover': {
        backgroundColor: '#4752c4',
        color: '#ffffff',
      },
    },
    boxCenter: {
      display: 'flex',
      alignItems: 'center',
      
      justifyContent: 'center',
      flexDirection: 'column',
    },
    text: {
      fontSize: '0.7rem',
      color: '#b9bbbe',
      margin: theme.spacing(0.2),
    },
    text2: {
      fontSize: '0.7rem',
      color: '#b9bbbe',
      margin: theme.spacing(0.2),
      textDecoration: 'none',
      fontWeight: 600,
      '&:hover': {
        color: '#ffffff',
      },
    },
    h1: {
      fontSize: '1.0rem',
      fontWeight: 600,
      color: '#b9bbbe',
      margin: theme.spacing(0.2),
    },
  }));
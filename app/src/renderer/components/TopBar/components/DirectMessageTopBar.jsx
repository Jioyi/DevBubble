import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router-dom';
import { alpha, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
//components
import TextTooltip from './../../TextTooltip';
//icons
import SearchIcon from '@material-ui/icons/Search';
import CallIcon from '@material-ui/icons/Call';
import VideocamIcon from '@material-ui/icons/Videocam';
import Brightness1Icon from '@material-ui/icons/Brightness1';
//actions
import { setInputSearchMessage } from './../../../redux/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: 6,
    backgroundColor: alpha('#202225', 1),
    marginRight: theme.spacing(2),
    marginLeft: 0,    
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    '@media (max-width: 600px)': {
      display: 'none',
    },
  },
  searchIcon: {
    color: '#b9bbbe',
    padding: theme.spacing(1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: '#b9bbbe',
  },
  inputInput: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '30ch',
    '@media (max-width: 700px)': {
      width: '10ch',
    },
    '@media (max-width: 900px)': {
      width: '20ch',
    },
  },
  maxWidth: {
    display: 'flex',
    flexGrow: 1,
  },
  at: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#b9bbbe',
    fontSize: '1.3rem',
    fontWeight: 'bold',
    paddingLeft: '10px',
    paddingRight: '10px',
    padding: '0px',
  },
  usernmae: {
    paddingTop: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: 'bold',
    padding: '0px',
  },
  noSelect: {
    '-moz-user-select': 'none',
    '-webkit-user-select': 'none',
    '-ms-user-select': 'none',
    'user-select': 'none',
  },
  iconButton: {
    padding: theme.spacing(0),
    margin: '6px',
    '&:hover': {
      backgroundColor: '#292b2f',
    },
  },
  icon: {
    margin: '0px',
    padding: '5px',
    height: '34px',
    width: '34px',
    color: '#b9bbbe',
    '&:hover': {
      color: '#ffffff',
    },
  },
  iconConnectStroke: {
    stroke: '#292b2f',
    strokeWidth: 2,
    height: '14px',
    width: '14px',
    color: '#3ba55d',
  },
  iconAbsentStroke: {
    stroke: '#292b2f',
    strokeWidth: 2,
    height: '14px',
    width: '14px',
    color: '#faa81a',
  },
  iconDoNotDisturbStroke: {
    stroke: '#292b2f',
    strokeWidth: 2,
    height: '14px',
    width: '14px',
    color: '#ed4245',
  },
  iconDisconnectStroke: {
    stroke: '#292b2f',
    strokeWidth: 2,
    height: '14px',
    width: '14px',
    color: '#747f8d',
  },
  state: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0px',
    paddingLeft: '6px',
  },
}));

const DirectMessageTopBar = () => {
  const { ID } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const { directMessages } = useSelector((state) => state.message);
  const { user } = useSelector((state) => state.auth);
  const [input, setInput] = useState('');

  const onChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    const index = directMessages.findIndex((DM) => DM.ID === ID);
    if (directMessages[index]) {
      const usersFiltered = directMessages[index].users.filter(
        (userFilter) => userFilter.ID !== user.ID
      );
      setData(usersFiltered);
    }
    return () => setData(null);
  }, [directMessages]);

  useEffect(() => {
    dispatch(setInputSearchMessage(input));
    return () => dispatch(setInputSearchMessage(""));
  }, [input]);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      {data && (
        <>
          {data?.length === 1 ? (
            <>
              <Typography className={clsx(classes.at, classes.noSelect)}>
                @
              </Typography>
              <Typography className={clsx(classes.usernmae, classes.noSelect)}>
                {data[0].username}
              </Typography>
              <Box className={classes.state}>
                {data[0].connected ? (
                  data[0].state === 'connected' ? (
                    <Brightness1Icon className={classes.iconConnectStroke} />
                  ) : data[0].state === 'absent' ? (
                    <Brightness1Icon className={classes.iconAbsentStroke} />
                  ) : data[0].state === 'doNotDisturb' ? (
                    <Brightness1Icon
                      className={classes.iconDoNotDisturbStroke}
                    />
                  ) : (
                    <Brightness1Icon className={classes.iconDisconnectStroke} />
                  )
                ) : (
                  <Brightness1Icon className={classes.iconDisconnectStroke} />
                )}
              </Box>
            </>
          ) : (
            <div>mas de una persona agregar avatar y demas</div>
          )}
        </>
      )}
      <div className={classes.maxWidth}></div>
      {data && (
        <>
          {data?.length === 1 ? (
            <>
              <TextTooltip title="Iniciar llamada de voz" placement="bottom">
                <IconButton color="inherit" className={classes.iconButton}>
                  <CallIcon className={classes.icon} />
                </IconButton>
              </TextTooltip>
              <TextTooltip title="Iniciar videollamada" placement="bottom">
                <IconButton color="inherit" className={classes.iconButton}>
                  <VideocamIcon className={classes.icon} />
                </IconButton>
              </TextTooltip>
            </>
          ) : (
            <div>mas de una persona agregar avatar y demas</div>
          )}
        </>
      )}
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          spellCheck={false}
          placeholder="Buscar"
          value={input}
          onChange={onChange}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>
    </div>
  );
};

export default DirectMessageTopBar;

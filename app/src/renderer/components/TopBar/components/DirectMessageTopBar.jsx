import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router-dom';
import { alpha, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
//icons
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
    textAlign: 'center',
    verticalAlign: 'middle',
    top: '50%',
    left: '50%',
    '-ms-transform': 'translate(-50%, -50%)',
    transform: 'translate(-50%, -50%)',
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
}));

const DirectMessageTopBar = () => {
  const { ID } = useParams();
  const [data, setData] = useState(null);
  const { directMessages } = useSelector((state) => state.message);
  const { user } = useSelector((state) => state.auth);

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

  const classes = useStyles();
  return (
    <div className={classes.root}>
      {data && (
        <>
          {data?.length === 1 ? (
            <>
              <Typography className={clsx(classes.at, classes.noSelect)}>@</Typography>
              <Typography className={clsx(classes.usernmae, classes.noSelect)}>
                {data[0].username}
              </Typography>
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

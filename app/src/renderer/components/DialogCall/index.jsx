import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Select from '@material-ui/core/Select';
//icons
import CallIcon from '@material-ui/icons/Call';
import CancelIcon from '@material-ui/icons/Cancel';
//actions

const useStyles = makeStyles(() => ({
  dialog: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tittle: {
    color: '#000000',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0px',
  },
  text: {
    color: '#848990',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  select: {
    fontWeight: 'bold',
    fontSize: '0.7rem',
  },
  card: {
    padding: '0px',
    margin: '10px',
    borderRadius: 8,
    maxWidth: 345,
  },
  media: {
    padding: '0px',
    margin: '0px',
    borderRadius: 8,
  },
  maxWidth: {
    flexGrow: 1,
  },
  buttonCall: {
    fontSize: '1.0rem',
    backgroundColor: '#30c748',
    color: '#ffffff',
    borderRadius: 4,
    margin: '10px',
    padding: '10px 20px 10px 20px',
    'white-space': 'nowrap',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#258b3f',
      color: '#ffffff',
    },
  },
  buttonCancel: {
    fontSize: '1.0rem',
    backgroundColor: '#ea211e',
    color: '#ffffff',
    borderRadius: 4,
    margin: '10px',
    padding: '10px 20px 10px 20px',
    'white-space': 'nowrap',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#d50000',
      color: '#ffffff',
    },
  },
  iconCall: {
    marginRight: '10px',
    height: '30px',
    width: '30px',
    color: '#fff',
  },
}));

const DialogStyle = withStyles({
  paper: {
    backgroundColor: '#ffffff',
    color: '#000000',
  },
})(Dialog);

const DialogCall = ({ open, setOpen, userCall }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [camera, setCamera] = React.useState('');
  const [cameras, setCameras] = useState([]);
  const [mic, setMic] = useState('');
  const [mics, setMics] = useState([]);
  const video = useRef();

  const handleClose = () => {
    dispatch(setOpen(false));
  };

  const getDevices = async () => {
    return navigator.mediaDevices.enumerateDevices();
  };

  const gotDevices = (deviceInfos) => {
    let micsAux = [];
    let camerasAux = [];
    for (let deviceInfo of deviceInfos) {
      if (deviceInfo.kind === 'audioinput') {
        micsAux.push(deviceInfo);
      } else if (deviceInfo.kind === 'videoinput') {
        camerasAux.push(deviceInfo);
      }
    }
    setMic(micsAux[0].deviceId);
    setMics(micsAux);
    setCamera(camerasAux[0].deviceId);
    setCameras(camerasAux);
  };

  const getStream = (type, deviceID) => {
    if (window.stream) {
      window.stream.getTracks().forEach((track) => {
        track.stop();
      });
    }
    let audioSource = mic;
    let videoSource = camera;
    console.log('mic', mic);
    console.log('camera', camera);
    if (type === 'camera') {
      setCamera(deviceID);
      videoSource = deviceID;
    }
    if (type === 'mic') {
      setMic(deviceID);
      audioSource = deviceID;
    }
    let constraints = {
      audio: { deviceId: audioSource ? { exact: audioSource } : undefined },
      video: { deviceId: videoSource ? { exact: videoSource } : undefined },
    };
    return navigator.mediaDevices
      .getUserMedia(constraints)
      .then(gotStream)
      .catch(handleError);
  };

  const gotStream = (stream) => {
    window.stream = stream;
    if (video.current) {
      video.current.srcObject = stream;
    }
  };

  const handleError = (error) => {
    console.error('Error: ', error);
  };

  const handleChangeMic = (e) => {
    getStream('mic', e.target.value);
  };

  const handleChangeCamera = async (e) => {
    getStream('camera', e.target.value);
  };

  useEffect(() => {
    if (open) {
      getStream().then(getDevices).then(gotDevices);
    }
  }, [open]);

  return (
    <DialogStyle
      open={open}
      aria-labelledby={'call'}
      BackdropProps={{
        classes: {
          root: classes.dialog,
        },
      }}
    >
      <DialogTitle id={'call'} className={classes.dialog}>
        <Typography className={classes.tittle}>Configurar llamada</Typography>
      </DialogTitle>
      <DialogTitle className={classes.dialog}>
        <Typography className={classes.text}>Video:</Typography>
        <Select
          className={classes.select}
          native
          value={camera}
          onChange={handleChangeCamera}
          required
        >
          {cameras.map((deviceInfo, index) => (
            <option key={index} value={`${deviceInfo.deviceId}`}>
              {`${deviceInfo.label}` || `Camara ${index + 1}`}
            </option>
          ))}
        </Select>
      </DialogTitle>
      <DialogTitle id={'global-alert'} className={classes.dialog}>
        <Typography className={classes.text}>Audio:</Typography>
        <Select
          className={classes.select}
          native
          value={mic}
          onChange={handleChangeMic}
          required
        >
          {mics.map((deviceInfo, index) => (
            <option key={index} value={`${deviceInfo.deviceId}`}>
              {`${deviceInfo.label}` || `Microfono ${index + 1}`}
            </option>
          ))}
        </Select>
      </DialogTitle>
      <DialogContent className={classes.dialog}>
        <Card className={classes.card}>
          <CardMedia
            component="video"
            className={classes.media}
            ref={video}
            autoPlay
          />
        </Card>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button className={classes.buttonCall}>
          <CallIcon className={classes.iconCall} />
          Llamar
        </Button>
        <div className={classes.maxWidth}></div>
        <Button className={classes.buttonCancel} onClick={handleClose}>
          <CancelIcon className={classes.iconCall} />
          Cancelar
        </Button>
      </DialogActions>
    </DialogStyle>
  );
};

export default DialogCall;

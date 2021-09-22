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
import Box from '@material-ui/core/Box';
import CardMedia from '@material-ui/core/CardMedia';
import Select from '@material-ui/core/Select';
//icons
import CallIcon from '@material-ui/icons/Call';
import CancelIcon from '@material-ui/icons/Cancel';
//components
import VolumeMeter from '../VolumenMeter';
//actions

const useStyles = makeStyles(() => ({
  box: {
    padding: '10px',
    margin: '0px',
    width: '100%',
  },
  dialog: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  dialogActions: {
    display: 'flex',
  },
  tittle: {
    color: '#000000',
    fontSize: '0.8rem',
    fontWeight: 'bold',
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
  control: {
    display: 'flex',
    flexGrow: 1,
  },
  select: {
    fontWeight: 'bold',
    fontSize: '0.7rem',
    display: 'flex',
    flexGrow: 1,
    width: '100%',
  },
  card: {
    padding: '0px',
    margin: '10px',
    borderRadius: 8,
    maxWidth: 345,
    backgroundColor: '#000',
  },
  video: {
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
  const [video, setVideo] = useState(false);
  const [audio, setAudio] = useState(false);
  const [deviceVideoSelect, setDeviceVideoSelect] = useState('');
  const [devicesVideo, setDevicesVideo] = useState([]);
  const [deviceAudioSelect, setDeviceAudioSelect] = useState('');
  const [devicesAudio, setDevicesAudio] = useState([]);
  const streamRef = useRef(null);
  const [streamAudio, setStreamAudio] = useState(null);

  const handleClose = () => {
    dispatch(setOpen(false));
  };

  const getDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      let devicesVideoAux = [];
      let devicesAudioAux = [];
      devices.forEach((device) => {
        if (device.kind === 'videoinput') {
          devicesVideoAux.push(device);
        } else if (device.kind === 'audioinput') {
          devicesAudioAux.push(device);
        }
      });
      setDevicesVideo(devicesVideoAux);
      setDevicesAudio(devicesAudioAux);
    } catch (error) {
      handleError(error);
    }
  };

  const getStream = () => {
    if (window.stream) {
      window.stream.getTracks().forEach((track) => {
        track.stop();
      });
    }
    let videoSource;
    let audioSource;
    if (deviceVideoSelect === '') {
      setVideo(false);
    } else {
      setVideo(true);
      videoSource = deviceVideoSelect;
    }
    if (deviceAudioSelect === '') {
      setAudio(false);
    } else {
      setAudio(true);
      audioSource = deviceAudioSelect;
    }
    let constraints = {
      video: videoSource ? { deviceId: { exact: videoSource } } : false,
      audio: audioSource ? { deviceId: { exact: audioSource } } : false,
    };
    console.log(constraints);
    if (deviceVideoSelect !== '' || deviceAudioSelect !== '') {
      return navigator.mediaDevices
        .getUserMedia(constraints)
        .then(gotStream)
        .catch(handleError);
    }
  };

  const gotStream = (stream) => {
    window.stream = stream;
    if (streamRef.current) {
      streamRef.current.srcObject = stream;
      setStreamAudio(stream);
    }
  };

  const handleError = (error) => {
    console.error('Error: ', error);
  };

  const handleChangeDeviceVideo = async (e) => {
    setDeviceVideoSelect(e.target.value);
  };

  const handleChangeDeviceAudio = (e) => {
    setDeviceAudioSelect(e.target.value);
  };

  useEffect(() => {
    //console.log('video', deviceVideoSelect);
    //console.log('audio', deviceAudioSelect);
    getStream();
  }, [deviceVideoSelect, deviceAudioSelect]);

  useEffect(() => {
    if (open) {
      getDevices();
      return () => {
        setVideo(false);
        setDeviceVideoSelect('');
        setAudio(false);
        setDeviceAudioSelect('');
        setStreamAudio(null);
      };
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
      <DialogTitle id={'call'} className={classes.dialogTitle}>
        <Typography className={classes.tittle}>Configurar llamada</Typography>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Select
          className={classes.select}
          native
          value={deviceVideoSelect}
          onChange={handleChangeDeviceVideo}
          required
        >
          <option key={-1} value={''}>{`Seleccione una camara`}</option>
          {devicesVideo.map((device, index) => (
            <option key={index} value={`${device.deviceId}`}>
              {`${device.label}` || `Camara ${index + 1}`}
            </option>
          ))}
        </Select>
      </DialogContent>
      <DialogContent className={classes.dialogContent}>
        <Select
          className={classes.select}
          native
          value={deviceAudioSelect}
          onChange={handleChangeDeviceAudio}
          required
        >
          <option key={-1} value={''}>{`Seleccione un microfo`}</option>
          {devicesAudio.map((device, index) => (
            <option key={index} value={`${device.deviceId}`}>
              {`${device.label}` || `Microfono ${index + 1}`}
            </option>
          ))}
        </Select>
      </DialogContent>
      <DialogContent className={classes.dialogContent}>
        <Card className={classes.card}>
          <CardMedia
            component="video"
            className={classes.video}
            ref={streamRef}
            autoPlay
          />
        </Card>
        {audio === true && (
          <Box className={classes.box}>
            <VolumeMeter audio={streamAudio} />
          </Box>
        )}
        {video === false && audio === false && (
          <Box className={classes.box}> Seleccione audio y/o video </Box>
        )}
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

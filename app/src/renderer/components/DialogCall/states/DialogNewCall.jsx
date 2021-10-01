import React, { useEffect, useState, useRef } from 'react';
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
import VolumeMeter from './../../VolumenMeter';

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
    '&:disabled': {
      backgroundColor: '#555d68',
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
    '&:disabled': {
      backgroundColor: '#555d68',
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

const DialogNewCall = ({
  open,
  cancel,
  state,
  callToUser,
  setStream,
  userCall,
  devicesVideo,
  devicesAudio,
}) => {
  const classes = useStyles();
  const [video, setVideo] = useState(false);
  const [audio, setAudio] = useState(false);
  const [disableCall, setDisableCall] = useState(true);
  const [disableCancel, setDisableCancel] = useState(false);
  const [deviceVideoSelect, setDeviceVideoSelect] = useState('');
  const [deviceAudioSelect, setDeviceAudioSelect] = useState('');
  const [streamAudio, setStreamAudio] = useState(null);
  const videoRef = useRef();

  const handleCall = () => {
    callToUser();
  };

  const handleClose = () => {
    cancel();
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
      video: videoSource ? { deviceId: { exact: videoSource } } : undefined,
      audio: audioSource ? { deviceId: { exact: audioSource } } : true,
    };
    if (deviceVideoSelect !== '' || deviceAudioSelect !== '') {
      return navigator.mediaDevices
        .getUserMedia(constraints)
        .then(gotStream)
        .catch(handleError);
    }
  };

  const gotStream = (stream) => {
    window.stream = stream;
    if (videoRef.current) {
      console.log('set', stream);
      setStream(stream);
      videoRef.current.srcObject = stream;
      if (deviceAudioSelect !== '') {
        setStreamAudio(stream);
      }
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
    if (state.current === 'avaible' && open) {
      getStream();
    }
  }, [deviceVideoSelect, deviceAudioSelect, state, open]);

  useEffect(() => {
    if (open) {
      return () => {
        setDisableCall(true);
        setDisableCancel(false);
        setVideo(false);
        setDeviceVideoSelect('');
        setAudio(false);
        setDeviceAudioSelect('');
        setStreamAudio(null);
      };
    }
  }, [open]);

  useEffect(() => {
    if (state.current === 'avaible') {
      if (video === true || audio === true) {
        setDisableCall(false);
      } else {
        setDisableCall(true);
      }
    } else {
      setDisableCall(true);
    }
  }, [audio, video, state.current]);

  return (
    <DialogStyle
      open={open}
      aria-labelledby={'newcall'}
      BackdropProps={{
        classes: {
          root: classes.dialog,
        },
      }}
    >
      <DialogTitle id={'newcall'} className={classes.dialogTitle}>
        <Typography className={classes.tittle}>
          Configurar llamada para a @{userCall?.username}
        </Typography>
      </DialogTitle>
      {state.current === 'calling' ? (
        <>llamando a @{userCall?.username} </>
      ) : (
        <>
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
              <option key={-1} value={''}>{`Seleccione un microfono`}</option>
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
                muted="muted"
                className={classes.video}
                ref={videoRef}
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
        </>
      )}
      <DialogActions className={classes.dialogActions}>
        <Button
          disabled={disableCall}
          className={classes.buttonCall}
          onClick={handleCall}
        >
          <CallIcon className={classes.iconCall} />
          Llamar
        </Button>
        <div className={classes.maxWidth}></div>
        <Button
          disabled={disableCancel}
          className={classes.buttonCancel}
          onClick={handleClose}
        >
          <CancelIcon className={classes.iconCall} />
          Cancelar
        </Button>
      </DialogActions>
    </DialogStyle>
  );
};

export default DialogNewCall;

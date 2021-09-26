import React, { useState, useEffect } from 'react';
import { createStyles, withStyles } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
//hooks
import useAudioAnalyser from './../hooks/useAudioAnalyser';

const VolumeLinearProgress = withStyles(() =>
  createStyles({
    root: {
      height: 20,
      borderRadius: 2,
    },
    colorPrimary: {
      backgroundColor: '#8cffb0',
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#30c748',
      '& .MuiLinearProgress-bar': {
        animationDuration: '0s',
      },
    },
  })
)(LinearProgress);

const VolumeMeter = ({ audio }) => {
  const [volume, setVolume] = useState(0);
  const [features] = useAudioAnalyser(audio);

  useEffect(() => {
    if (features) {      
      setVolume(features.volume);
    }
  }, [features]);

  return <VolumeLinearProgress variant="determinate" value={volume} />;
};

export default VolumeMeter;

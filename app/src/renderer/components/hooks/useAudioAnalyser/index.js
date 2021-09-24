import { useState, useEffect } from 'react';
import Meyda from 'meyda';

const useAudioAnalyser = (stream) => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const volumeRange = 17; //cambiar mas bajo para menor sensibilidad del microfono 1 a 25
  const [analyser, setAnalyser] = useState(null);
  const [running, setRunning] = useState(true);
  const [features, setFeatures] = useState(null);

  useEffect(() => {
    if (stream) {
      const audioContext = new AudioContext();
      if (audioContext.state === 'closed') {
        return;
      }
      let newAnalyser;
      const source = audioContext.createMediaStreamSource(stream);
      newAnalyser = Meyda.createMeydaAnalyzer({
        audioContext: audioContext,
        source: source,
        bufferSize: 1024,
        featureExtractors: ['rms'], // amplitudeSpectrum mfcc spectralCentroid spectralRolloff loudness
        callback: (features) => {
          let volume = features.rms * volumeRange * 100;
          if (volume > 100) volume = 100;
          setFeatures({ ...features, volume: volume });
        },
      });
      setAnalyser(newAnalyser);
      setRunning(true);
      return () => {
        if (newAnalyser) {
          newAnalyser.stop();
        }
        if (audioContext) {
          audioContext.close();
        }
      };
    }
  }, [stream]);

  useEffect(() => {
    if (analyser) {
      if (running) {
        analyser.start();
      } else {
        analyser.stop();
      }
    } else {
      setRunning(false);
    }
  }, [running, analyser]);

  return [features];
};

export default useAudioAnalyser;

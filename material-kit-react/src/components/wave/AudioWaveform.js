import React, { useRef, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';

const AudioWaveform = ({ audioUrl }) => {
  const waveformRef = useRef(null);

  useEffect(() => {
    const waveform = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: 'violet',
      progressColor: 'purple',
      barWidth: 3,
      barHeight: 2,
      cursorWidth: 1,
      cursorColor: 'black',
      height: 100,
      responsive: true,
    });

    waveform.load(audioUrl);

    return () => {
      waveform.destroy();
    };
  }, [audioUrl]);

  return <div ref={waveformRef} />;
};

export default AudioWaveform;

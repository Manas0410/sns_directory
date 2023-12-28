// WatchComponent.jsx

import React, { useState, useEffect } from 'react';
// import './WatchComponent.css'; // Import the CSS file for styling
import "./styles/clock.CSS"

const WatchComponent = ({ timezone ="Africa/Abidjan"}) => {
  const [currentTime, setCurrentTime] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [initialTime, setInitialTime] = useState(null);

  // Fetch time from the API
  useEffect(() => {
    const fetchTime = async () => {
      try {
        const response = await fetch(`http://worldtimeapi.org/api/timezone/${timezone}`);
        const data = await response.json();
        setCurrentTime(new Date(data.utc_datetime));
        setInitialTime(new Date(data.utc_datetime));
      } catch (error) {
        console.error('Error fetching time:', error);
      }
    };

    fetchTime();
  }, [timezone]);

  // Update the time every second if not paused
  useEffect(() => {
    if (!isPaused) {
      const intervalId = setInterval(() => {
        setCurrentTime(prevTime => new Date(prevTime.getTime() + 1000));
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isPaused]);

  const handlePauseResume = () => {
    setIsPaused(prevIsPaused => !prevIsPaused);
  };

  const resetWatch = () => {
    setCurrentTime(initialTime);
    setIsPaused(false);
  };

  return (
    <div className="watch-container">
      <div className="watch">
        <p>{currentTime && currentTime.toISOString().substr(11, 8)}</p>
      </div>
      <div className="button-container">
        <button onClick={handlePauseResume}>{isPaused ? 'Resume' : 'Pause'}</button>
        <button onClick={resetWatch}>Reset</button>
      </div>
    </div>
  );
};

export default WatchComponent;

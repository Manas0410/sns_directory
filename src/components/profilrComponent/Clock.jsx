// // WatchComponent.jsx

// import React, { useState, useEffect } from 'react';
// import "./styles/clock.css"; // Import the CSS file for styling

// const WatchComponent = ({ timezone }) => {
//   const [currentTime, setCurrentTime] = useState(null);
//   const [isPaused, setIsPaused] = useState(false);
//   const [initialTime, setInitialTime] = useState(null);

//   // Fetch time from the API
//   useEffect(() => {
//     console.log("clock->", timezone)
//     const fetchTime = async () => {
//       try {
//         const response = await fetch(`http://worldtimeapi.org/api/timezone/${timezone}`);
//         const data = await response.json();

//         // Use the datetime directly, as it includes timezone information
//         console.log(data.datetime)
//         const timeWithOffset = new Date(data.datetime);
//         setCurrentTime(timeWithOffset);
//         setInitialTime(timeWithOffset);
//       } catch (error) {
//         console.error('Error fetching time:', error);
//       }
//     };

//     fetchTime();
//   }, [timezone]);

//   console.log("curtime->",currentTime)

//   // Update the time every second if not paused
//   useEffect(() => {
//     if (!isPaused) {
//       const intervalId = setInterval(() => {
//         setCurrentTime(prevTime => new Date(prevTime.getTime() + 1000));
//       }, 1000);

//       return () => clearInterval(intervalId);
//     }
//   }, [isPaused]);

//   const handlePauseResume = () => {
//     setIsPaused(prevIsPaused => !prevIsPaused);
//   };

//   const resetWatch = () => {
//     setCurrentTime(initialTime);
//     setIsPaused(false);
//   };

//   return (
//     <div className="watch-container">
//       <div className="watch">
//         <p>{currentTime && currentTime.toISOString().substr(11, 8)}</p>
//       </div>
//       <div className="button-container">
//         <button onClick={handlePauseResume}>{isPaused ? 'Resume' : 'Pause'}</button>
//         <button onClick={resetWatch}>Reset</button>
//       </div>
//     </div>
//   );
// };

// export default WatchComponent;



// WatchComponent.jsx

import React, { useState, useEffect } from 'react';
import "./styles/clock.css"; // Import the CSS file for styling

const WatchComponent = ({ timezone }) => {
  const [currentTime, setCurrentTime] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [initialTime, setInitialTime] = useState(null);

  // Fetch time from the API
  useEffect(() => {
    const fetchTime = async () => {
      try {
        const response = await fetch(`http://worldtimeapi.org/api/timezone/${timezone}`);
        const data = await response.json();

        // Adjust time according to the timezone offset
        const utcOffset = parseInt(data.utc_offset.split(":")[0], 10);
        const adjustedTime = new Date(data.utc_datetime);
        adjustedTime.setHours(adjustedTime.getHours() + utcOffset);

        setCurrentTime(adjustedTime);
        setInitialTime(adjustedTime);
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

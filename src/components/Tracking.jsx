import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/tracking.css'; // Import the CSS file for styling tracking container

const Tracking = () => {
  const [speed, setSpeed] = useState(1);
  const [time, setTime] = useState(new Date());
  const [quote, setQuote] = useState('');

  // Update time every second based on speed
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => new Date(prevTime.getTime() - 1000 * speed));
    }, 1000);
    return () => clearInterval(interval);
  }, [speed]);

  // Fetch a random quote every 5 seconds
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios.get('https://api.api-ninjas.com/v1/quotes', {
          headers: { 'X-Api-Key': 'yQ+g8O2ENhwFUrffcQS+3w==FaeSJ6Hje1qjjgn5' } // Replace 'YOUR_API_KEY' with your actual API key
        });
        setQuote(response.data[0].quote);
      } catch (error) {
        console.error('Error fetching quote:', error);
      }
    };

    fetchQuote(); // Fetch initially
    const quoteInterval = setInterval(fetchQuote, 5000); // Fetch every 5 seconds

    return () => clearInterval(quoteInterval);
  }, []);

  // Function to generate share URL and copy to clipboard
  const generateShareUrl = () => {
    const url = `${window.location.origin}/tracking?speed=${speed}`;
    navigator.clipboard.writeText(url).then(() => {
      alert('URL copied to clipboard');
    });
  };

  // Function to handle speed slider change
  const handleSpeedChange = (e) => {
    setSpeed(parseInt(e.target.value));
  };

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourStyle = { transform: `rotate(${(hours % 12) * 30}deg)` };
  const minuteStyle = { transform: `rotate(${minutes * 6}deg)` };
  const secondStyle = { transform: `rotate(${seconds * 6}deg)` };

  return (
    <div className='tracking-container'>
      <h2>Tracking Screen</h2>

      {/* Analog Clock */}
      <div className="clock">
        <div className="hand hour" style={hourStyle}></div>
        <div className="hand minute" style={minuteStyle}></div>
        <div className="hand second" style={secondStyle}></div>
        <div className="number twelve">12</div>
        <div className="number three">3</div>
        <div className="number six">6</div>
        <div className="number nine">9</div>
      </div>

      {/* Speed Slider */}
      <div className="slider-container">
        <label htmlFor="speedSlider">Speed:</label>
        <input
          type="range"
          id="speedSlider"
          name="speedSlider"
          min="1"
          max="10"
          value={speed}
          onChange={handleSpeedChange}
        />
        <span>{speed}x</span>
      </div>

      {/* Share Button */}
      <button className="share-button" onClick={generateShareUrl}>
        Share
      </button>

      {/* Quote Display */}
      <div className="quote-container">
        <p>"{quote}"</p>
      </div>
    </div>
  );
};

export default Tracking;

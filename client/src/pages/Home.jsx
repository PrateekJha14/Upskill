import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

function Home() {
  const navigate = useNavigate();
  const [handle, setHandle] = useState('');

  const handleStart = () => {
    if (!handle.trim()) {
      alert("Please enter your Codeforces handle!");
      return;
    }

    localStorage.setItem('cfHandle', handle.trim());
    navigate('/learn');
  };

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.title}>Wanna be a Codeforces Specialist or Above?</h1>
      
      <input
        className={styles.input}
        placeholder="Enter your Codeforces handle"
        value={handle}
        onChange={(e) => setHandle(e.target.value)}
      />

      <button className={styles.startButton} onClick={handleStart}>
        Let's Get Started 
      </button>
    </div>
  );
}

export default Home;
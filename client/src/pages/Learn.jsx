import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Learn.module.css';
import TopicCard from '../components/TopicCard'; 

const topics = [
  { name: "Binary Search", rating: "1000–1500" },
  { name: "Two Pointers & Sliding Window", rating: "1000–1500" },
  { name: "Number Theory", rating: "1000–1500" },
  { name: "Bits & Bitmasks", rating: "1000–1500" },
  { name: "Greedy Algorithms", rating: "1000–1500" },
  { name: "Prefix Sum", rating: "1000–1500" },
];

function Learn() {
  const navigate = useNavigate();

  const handleCardClick = (topicName) => {
    navigate(`/problems/${encodeURIComponent(topicName)}`);
  };

  return (
    <div className={styles.learnContainer}>
      <h2 className={styles.learnTitle}>Choose a Topic to Master</h2>
      <div className={styles.topicsGrid}>
        {topics.map((topic, index) => (
          <TopicCard key={index} topic={topic} onClick={() => handleCardClick(topic.name)} />
        ))}
      </div>
    </div>
  );
}

export default Learn;
import React from 'react';
import styles from './TopicCard.module.css';

function TopicCard({ topic, onClick }) {
  return (
    <div className={styles.card} onClick={onClick}>
      <h3 className={styles.topicName}>{topic.name}</h3>
      <p className={styles.rating}>Difficulty: {topic.rating}</p>
      <button className={styles.startButton}>Start Learning</button>
    </div>
  );
}

export default TopicCard;
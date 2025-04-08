import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Problemset.module.css';
import problemsData from '../db/ProblemsData';

const fetchSolvedProblems = async (handle) => {
  const res = await fetch(`https://codeforces.com/api/user.status?handle=${handle}`);
  const data = await res.json();
  if (data.status === "OK") {
    const solvedSet = new Set();
    data.result.forEach((submission) => {
      if (submission.verdict === "OK") {
        const problemKey = `${submission.problem.contestId}-${submission.problem.index}`;
        solvedSet.add(problemKey);
      }
    });
    return solvedSet;
  }
  return new Set();
};

function ProblemSet() {
  const { topic } = useParams();
  const topicData = problemsData[topic] || { easy: [], medium: [], hard: [] };

  const [solvedSet, setSolvedSet] = useState(new Set());
  const [xp, setXp] = useState(0);

  const calculateXp = (solved, topicData) => {
    let xp = 0;
    ['easy', 'medium', 'hard'].forEach(level => {
      topicData[level].forEach(problem => {
        const key = `${problem.contestId}-${problem.index}`;
        if (solved.has(key)) {
          if (level === 'easy') xp += 10;
          else if (level === 'medium') xp += 20;
          else if (level === 'hard') xp += 30;
        }
      });
    });
    return xp;
  };

  const syncSolvedProblems = () => {
    const handle = localStorage.getItem('cfHandle');
    if (!handle) return;

    fetchSolvedProblems(handle).then((set) => {
      setSolvedSet(set);
      localStorage.setItem('solvedProblems', JSON.stringify([...set]));

      const newXp = calculateXp(set, topicData);
      setXp(newXp);
      localStorage.setItem('xpPoints', newXp);
    });
  };

  useEffect(() => {
    const handle = localStorage.getItem('cfHandle');
    if (!handle) return;

    fetchSolvedProblems(handle).then((set) => {
      setSolvedSet(set);
      localStorage.setItem('solvedProblems', JSON.stringify([...set]));

      const newXp = calculateXp(set, topicData);
      setXp(newXp);
      localStorage.setItem('xpPoints', newXp);
    });
  }, [topic]);

  const isSolved = (problem) => {
    const key = `${problem.contestId}-${problem.index}`;
    return solvedSet.has(key);
  };

  const renderProblems = (level, problems) => (
    <div className={styles.section}>
      <h2 className={styles.heading}>{level} Problems</h2>
      <ul className={styles.problemList}>
        {problems.map((p, index) => (
          <li key={index} className={`${styles.problemItem} ${isSolved(p) ? styles.solved : ''}`}>
            <a href={p.link} target="_blank" rel="noopener noreferrer" className={styles.problemLink}>
              {p.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.topicTitle}>{topic}</h1>
      <h3 className={styles.xpDisplay}>⭐ XP: {xp}</h3>
      <button onClick={syncSolvedProblems} className={styles.syncButton}>
        🔄 Sync Solved Problems
      </button>
      {renderProblems("Easy (1000-1100) Rated", topicData.easy)}
      {renderProblems("Medium (1200-1300) Rated", topicData.medium)}
      {renderProblems("Hard (1400-1500) Rated", topicData.hard)}
    </div>
  );
}

export default ProblemSet;
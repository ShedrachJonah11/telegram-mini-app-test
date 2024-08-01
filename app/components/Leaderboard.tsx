"use client";
import { useState, useEffect } from 'react';

const Leaderboard: React.FC = () => {
  const [scores, setScores] = useState<{ name: string; score: number }[]>([]);

  useEffect(() => {
    // Mock function to fetch leaderboard scores
    const fetchScores = () => {
      setScores([
        { name: 'Alice', score: 100 },
        { name: 'Bob', score: 90 },
        { name: 'Charlie', score: 80 },
      ]);
    };

    fetchScores();
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
      <ul>
        {scores.map((score, index) => (
          <li key={index}>{`${score.name}: ${score.score}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;

import { FC } from "react";
import './index.css'

interface IProps {
  difficulty: string;
  setDifficulty: (value: string) => void;
}

const DifficultySelector: FC<IProps> = ({ difficulty, setDifficulty }) => {
  return (
    <div className="difficultySelector">
      <span className="title">Choose your level:</span>
      <div className="difficultyLevelContainer">
        <div
          className={`difficultyLevel ${difficulty === 'Easy' ? 'active' : ''}`}
          style={{ backgroundColor: '#33B5FF' }}
          onClick={() => setDifficulty('Easy')}
        >
          Easy
        </div>
        <div
          className={`difficultyLevel ${difficulty === 'Medium' ? 'active' : ''}`}
          style={{ backgroundColor: '#FFD133' }}
          onClick={() => setDifficulty('Medium')}
        >
          Medium
        </div>
        <div
        className={`difficultyLevel ${difficulty === 'Hard' ? 'active' : ''}`}
        style={{ backgroundColor: '#FF3333' }}
        onClick={() => setDifficulty('Hard')}
      >
        Hard
        </div>
      </div>
    </div>
  );
};

export default DifficultySelector;

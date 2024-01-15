import { FC } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight, faShuffle } from '@fortawesome/free-solid-svg-icons';

interface IProps {
  onShuffleClick: () => void;
  onRestartClick: () => void;
  isDisabled: boolean;
}

const ActionButtons: FC<IProps> = ({ onShuffleClick, onRestartClick, isDisabled }) => {
  return (
    <div className="buttonContainer">
      <button onClick={onShuffleClick}>
        <FontAwesomeIcon icon={faShuffle} />
        <span>Shuffle</span>
      </button>
      <button onClick={onRestartClick} disabled={isDisabled}>
        <FontAwesomeIcon icon={faRotateRight} />
        <span>Restart</span>
      </button>
    </div>
  );
};

export default ActionButtons;

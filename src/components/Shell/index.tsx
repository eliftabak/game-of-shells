import { FC } from 'react';
interface IProps {
  x: number;
  y: number;
  hasBall: boolean;
  handleShellClick: () => void;
  isShellOpening: boolean;
  isShellClosing: boolean;
  isShuffling: boolean;
}

const Shell: FC < IProps > = ({
  x,
  y,
  isShellOpening,
  isShellClosing,
  hasBall,
  handleShellClick,
  isShuffling
}) => {
  const closedShellImg = '/assets/images/shellClosed.png';
  const openShellImg = '/assets/images/shellNoPearl.png';
  const openShellWithPearlImg = '/assets/images/shellWithPearl.png';

  const shellImage = hasBall ? openShellWithPearlImg : openShellImg;

  const style = {
    transform: `translate(${x}px, ${y}px)`,
    backgroundImage: `url(${isShellOpening && !isShuffling ? shellImage : closedShellImg})`,
    backgroundPosition: 'center center',
    backgroundSize: 'contain',
  };

  return (
    <div className = {
       `shell ${isShellOpening ? 'opening' : ''} ${isShellClosing ? 'closing' : ''} ${hasBall ? 'hasBall' : ''} ${isShuffling ? 'shuffling' : ''}`
      }
      style = {style}
      onClick={isShuffling ? undefined : handleShellClick}>
    </div>
  );
};

export default Shell;
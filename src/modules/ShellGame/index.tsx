import { useEffect, useState } from 'react';
import Shell from '../../components/Shell';
import Message from '../../components/Message';
import IShell from './index.d'
import DifficultySelector from '../../components/DifficultySelector';
import ActionButtons from '../../components/ActionButtons';

const ShellGame = () => {
  const initialShells: IShell[] = [
    { id: 1, x: 50, y: 150, hasBall: false },
    { id: 2, x: 300, y: 150, hasBall: false },
    { id: 3, x: 550, y: 150, hasBall: false },
  ];

  const [shells, setShells] = useState<IShell[]>(initialShells);
  const [ballPosition, setBallPosition] = useState<number | null>(null);
  const [isShuffling, setIsShuffling] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [isShellOpening, setIsShellOpening] = useState(false);
  const [isShellClosing, setIsShellClosing] = useState(false);
  const [difficulty, setDifficulty] = useState('Easy');
  const shuffleDuration = difficulty === 'Easy' ? 700 : (difficulty === 'Medium' ? 500 : 250);
  const maxShuffles = difficulty === 'Easy' ? 3 : (difficulty === 'Medium' ? 5 : 7);
  const gameAreaWidth = 800;
  const shellWidth = 200;
  const initialXOffset = 50; 
  const constantYPosition = 150;

  useEffect(() => {
    setIsShellOpening(true);
    setIsShellClosing(false);
    restartGame();
  },[])

  const generateNewPositions = (): { x: number, y: number }[] => {
    const positions: { x: number, y: number }[] = [];
    const availablePositions:any = [];
  
    for (let i = 0; i < gameAreaWidth - shellWidth; i += shellWidth + initialXOffset) {
      if (!initialShells.some(shell => shell.x === i)) {
        availablePositions.push(i);
      }
    }
  
    availablePositions.sort(() => Math.random() - 0.5);
  
    shells.forEach(shell => {  
      const positionIndex = Math.floor(Math.random() * availablePositions.length);
      positions.push({ x: availablePositions[positionIndex], y: constantYPosition });
  
      availablePositions.splice(positionIndex, 1);
    });
  
    return positions;
  };
  
  
  const randomShuffleShells = () => {
    setIsShuffling(true);
    setIsShellOpening(false);
    setIsShellClosing(true);
  
    let shuffleCount = 0;
  
    const shuffleInterval = setInterval(() => {
      const newPositions = generateNewPositions();
  
      setShells(shells.map((shell, index) => ({
        ...shell,
        x: newPositions[index].x + 50,
        y: newPositions[index].y
      })));
  
      shuffleCount++;

      if (shuffleCount >= maxShuffles) {
        clearInterval(shuffleInterval);
        setIsShuffling(false);
      }
    }, shuffleDuration);
  };
  
  const handleShellClick = (index: number) => {
    if (!isShuffling) {
      const newShells = shells.map((shell, idx) => ({
        ...shell,
        hasBall: idx === ballPosition
      }));

      setIsShellOpening(true);
      setIsShellClosing(false);

      setShells(newShells);
      
      if (index === ballPosition) {
        setMessage('Congratulations! You found the ball.');
      } else {
        setMessage('Sorry, you missed. Try again.');
      }
      
    }
  };

  const restartGame = () => {
    const newBallPosition = Math.floor(Math.random() * initialShells.length);
    const newShells = initialShells.map((shell, index) => ({
      ...shell,
      hasBall: index === newBallPosition
    }));

    setIsShellOpening(true);
    setIsShellClosing(false);

    setShells(newShells);
    setBallPosition(newBallPosition);
    setMessage('');
    setIsShuffling(false);
  };

  return (
    <div className="shellGame">
      <div>
        <h1>Game of Shells</h1>
      </div>
      <div className="shellsContainer">
        {shells.map((shell, index) => (
          <Shell
            key={index}
            x={shell.x}
            y={shell.y}
            isShellOpening={isShellOpening}
            isShellClosing={isShellClosing}
            isShuffling={isShuffling}
            hasBall={shell.hasBall}
            handleShellClick={() => handleShellClick(index)}
          />
        ))}
      </div>
      <div className="gameControlPanel">
        <div>
          <ActionButtons onShuffleClick={randomShuffleShells} onRestartClick={restartGame} isDisabled={isShuffling} />
        </div>
        <div>
          <DifficultySelector difficulty={difficulty} setDifficulty={setDifficulty} />
        </div>
      </div>
      <Message text={message} />
    </div>
  );
};

export default ShellGame;

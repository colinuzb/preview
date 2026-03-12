import { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Gamepad2, Trophy, RotateCcw } from 'lucide-react';

export const Game = () => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [target, setTarget] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const savedHighScore = localStorage.getItem('highScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  useEffect(() => {
    if (!isPlaying || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsPlaying(false);
          if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('highScore', score.toString());
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, score, highScore]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
    moveTarget();
  };

  const moveTarget = () => {
    const newX = Math.random() * 80 + 10;
    const newY = Math.random() * 70 + 10;
    setTarget({ x: newX, y: newY });
  };

  const handleTargetClick = () => {
    if (!isPlaying) return;
    setScore((prev) => prev + 1);
    moveTarget();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
          <Gamepad2 className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Click the Target</h1>
        <p className="text-lg text-gray-600">
          Test your reflexes! Click the moving target as many times as you can in 30 seconds.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Score</p>
            <p className="text-3xl font-bold text-blue-600">{score}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Time Left</p>
            <p className="text-3xl font-bold text-orange-600">{timeLeft}s</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <p className="text-sm text-gray-600">High Score</p>
            </div>
            <p className="text-3xl font-bold text-green-600">{highScore}</p>
          </div>
        </Card>
      </div>

      <Card>
        {!isPlaying && timeLeft === 30 ? (
          <div className="text-center py-16">
            <Gamepad2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Play?</h3>
            <p className="text-gray-600 mb-6">Click the button below to start the game</p>
            <Button onClick={startGame} size="lg">
              Start Game
            </Button>
          </div>
        ) : !isPlaying && timeLeft === 0 ? (
          <div className="text-center py-16">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Game Over!</h3>
            <p className="text-xl text-gray-600 mb-2">Your Score: {score}</p>
            {score === highScore && score > 0 && (
              <p className="text-green-600 font-semibold mb-6">New High Score!</p>
            )}
            <Button onClick={startGame} size="lg">
              <RotateCcw className="w-5 h-5 mr-2" />
              Play Again
            </Button>
          </div>
        ) : (
          <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg" style={{ height: '400px' }}>
            <button
              onClick={handleTargetClick}
              className="absolute w-12 h-12 bg-red-500 rounded-full shadow-lg hover:bg-red-600 transition-all duration-100 transform hover:scale-110 cursor-pointer"
              style={{
                left: `${target.x}%`,
                top: `${target.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <span className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-75" />
            </button>
          </div>
        )}
      </Card>
    </div>
  );
};

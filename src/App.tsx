import { useEffect } from 'react';
import { useGameStore } from './store';
import { Grid } from './components/Grid';
import { Keyboard } from './components/Keyboard';
import { Button } from './components/Button';

function App() {
  const {
    mode,
    guesses,
    currentGuess,
    targetWord,
    gameStatus,
    selectedDate,
    setMode,
    setDate,
    addLetter,
    removeLetter,
    submitGuess,
    resetGame,
  } = useGameStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameStatus !== 'playing') return;

      if (e.key === 'Enter') submitGuess();
      else if (e.key === 'Backspace') removeLetter();
      else if (/^[a-z]$/i.test(e.key)) addLetter(e.key.toLowerCase());
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStatus, addLetter, removeLetter, submitGuess]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <header className="w-full max-w-lg mb-8">
        <h1 className="text-4xl font-bold text-center mb-4">Wordle</h1>
        <div className="flex gap-2 justify-center mb-4">
          <Button
            variant={mode === 'daily' ? 'default' : 'outline'}
            onClick={() => setMode('daily')}
          >
            Daily
          </Button>
          <Button
            variant={mode === 'infinite' ? 'default' : 'outline'}
            onClick={() => setMode('infinite')}
          >
            Infinite
          </Button>
        </div>
        {mode === 'daily' && (
          <div className="flex justify-center">
            <input
              type="date"
              value={
                selectedDate
                  ? selectedDate.toISOString().split('T')[0]
                  : new Date().toISOString().split('T')[0]
              }
              onChange={(e) => setDate(new Date(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded"
            />
          </div>
        )}
      </header>

      <main className="flex flex-col items-center gap-8">
        <Grid guesses={guesses} currentGuess={currentGuess} targetWord={targetWord} />

        {gameStatus !== 'playing' && (
          <div className="text-center">
            <p className="text-2xl font-bold mb-2">
              {gameStatus === 'won' ? '🎉 You won!' : '😔 Game over!'}
            </p>
            <p className="text-lg mb-4">
              The word was: <span className="font-bold uppercase">{targetWord}</span>
            </p>
            <Button onClick={resetGame}>Play Again</Button>
          </div>
        )}

        <Keyboard />
      </main>
    </div>
  );
}

export default App;

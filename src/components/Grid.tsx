import { getLetterStatus, type LetterStatus, useGameStore } from '../store';
import { cn } from '../lib/utils';

interface TileProps {
  letter: string;
  status: LetterStatus;
}

export const Tile = ({ letter, status }: TileProps) => {
  return (
    <div
      className={cn(
        'w-14 h-14 border-2 flex items-center justify-center text-2xl font-bold uppercase',
        status === 'empty' && 'border-gray-300',
        status === 'absent' && 'bg-gray-400 border-gray-400 text-white',
        status === 'present' && 'bg-yellow-500 border-yellow-500 text-white',
        status === 'correct' && 'bg-green-500 border-green-500 text-white'
      )}
    >
      {letter}
    </div>
  );
};

interface GridProps {
  guesses: string[];
  currentGuess: string;
  targetWord: string;
}

export const Grid = ({ guesses, currentGuess, targetWord }: GridProps) => {
  const invalidGuess = useGameStore((state) => state.invalidGuess);
  const rows = [...guesses, currentGuess].slice(0, 6);
  const emptyRows = 6 - rows.length;
  const currentRowIndex = guesses.length;

  return (
    <div className="flex flex-col gap-1">
      {rows.map((guess, i) => (
        <div
          key={i}
          className={cn(
            'flex gap-1',
            invalidGuess && i === currentRowIndex && 'animate-[wiggle_0.5s_ease-in-out]'
          )}
        >
          {Array.from({ length: 5 }).map((_, j) => {
            const letter = guess[j] || '';
            const status =
              guess[j] && i < guesses.length
                ? getLetterStatus(letter, j, guess, targetWord)
                : 'empty';
            return <Tile key={j} letter={letter} status={status} />;
          })}
        </div>
      ))}
      {Array.from({ length: emptyRows }).map((_, i) => (
        <div key={`empty-${i}`} className="flex gap-1">
          {Array.from({ length: 5 }).map((_, j) => (
            <Tile key={j} letter="" status="empty" />
          ))}
        </div>
      ))}
    </div>
  );
};

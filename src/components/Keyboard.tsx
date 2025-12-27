import { useGameStore, getLetterStatus } from '../store';
import { cn } from '../lib/utils';

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
];

export const Keyboard = () => {
  const { guesses, targetWord, addLetter, removeLetter, submitGuess } = useGameStore();

  const getKeyStatus = (key: string): 'correct' | 'present' | 'absent' | 'unused' => {
    const letter = key.toLowerCase();
    let hasCorrect = false;
    let hasPresent = false;
    let hasAbsent = false;

    for (const guess of guesses) {
      for (let i = 0; i < guess.length; i++) {
        if (guess[i] === letter) {
          const letterStatus = getLetterStatus(letter, i, guess, targetWord);
          if (letterStatus === 'correct') hasCorrect = true;
          else if (letterStatus === 'present') hasPresent = true;
          else if (letterStatus === 'absent') hasAbsent = true;
        }
      }
    }

    if (hasCorrect) return 'correct';
    if (hasPresent) return 'present';
    if (hasAbsent) return 'absent';
    return 'unused';
  };

  const handleKey = (key: string) => {
    if (key === 'ENTER') submitGuess();
    else if (key === '⌫') removeLetter();
    else addLetter(key.toLowerCase());
  };

  return (
    <div className="flex flex-col gap-2">
      {KEYBOARD_ROWS.map((row, i) => (
        <div key={i} className="flex gap-1 justify-center">
          {row.map((key) => {
            const status = key.length === 1 ? getKeyStatus(key) : 'unused';
            return (
              <button
                key={key}
                onClick={() => handleKey(key)}
                className={cn(
                  'px-3 py-4 rounded font-bold transition-colors',
                  (key === 'ENTER' || key === '⌫') && 'px-5',
                  status === 'unused' && 'bg-gray-300 hover:bg-gray-400',
                  status === 'absent' && 'bg-gray-500 text-white',
                  status === 'present' && 'bg-yellow-500 text-white',
                  status === 'correct' && 'bg-green-500 text-white'
                )}
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

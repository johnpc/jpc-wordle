import { create } from 'zustand';
import { getDailyWord, getRandomWord } from './utils';
import { WORDS } from './words';

export type LetterStatus = 'correct' | 'present' | 'absent' | 'empty';

export interface GameState {
  mode: 'daily' | 'infinite';
  targetWord: string;
  guesses: string[];
  currentGuess: string;
  gameStatus: 'playing' | 'won' | 'lost';
  invalidGuess: boolean;
  selectedDate: Date | null;
  setMode: (mode: 'daily' | 'infinite') => void;
  setDate: (date: Date) => void;
  addLetter: (letter: string) => void;
  removeLetter: () => void;
  submitGuess: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  mode: 'daily',
  targetWord: getDailyWord(),
  guesses: [],
  currentGuess: '',
  gameStatus: 'playing',
  invalidGuess: false,
  selectedDate: null,

  setMode: (mode) => {
    const targetWord = mode === 'daily' ? getDailyWord() : getRandomWord();
    set({
      mode,
      targetWord,
      guesses: [],
      currentGuess: '',
      gameStatus: 'playing',
      selectedDate: null,
    });
  },

  setDate: (date) => {
    const targetWord = getDailyWord(date);
    set({ selectedDate: date, targetWord, guesses: [], currentGuess: '', gameStatus: 'playing' });
  },

  addLetter: (letter) => {
    const { currentGuess, gameStatus } = get();
    if (gameStatus !== 'playing' || currentGuess.length >= 5) return;
    set({ currentGuess: currentGuess + letter.toLowerCase() });
  },

  removeLetter: () => {
    const { currentGuess } = get();
    set({ currentGuess: currentGuess.slice(0, -1) });
  },

  submitGuess: () => {
    const { currentGuess, guesses, targetWord, gameStatus } = get();
    if (gameStatus !== 'playing' || currentGuess.length !== 5) return;

    if (!WORDS.includes(currentGuess)) {
      set({ invalidGuess: true });
      setTimeout(() => set({ invalidGuess: false }), 500);
      return;
    }

    const newGuesses = [...guesses, currentGuess];
    const won = currentGuess === targetWord;
    const lost = newGuesses.length >= 6 && !won;

    set({
      guesses: newGuesses,
      currentGuess: '',
      gameStatus: won ? 'won' : lost ? 'lost' : 'playing',
    });
  },

  resetGame: () => {
    const { mode, selectedDate } = get();
    const targetWord = mode === 'daily' ? getDailyWord(selectedDate || undefined) : getRandomWord();
    set({ targetWord, guesses: [], currentGuess: '', gameStatus: 'playing' });
  },
}));

export const getLetterStatus = (
  letter: string,
  position: number,
  word: string,
  target: string
): LetterStatus => {
  if (letter === target[position]) return 'correct';

  const targetCount = target.split('').filter((l) => l === letter).length;
  const correctCount = word.split('').filter((l, i) => l === letter && target[i] === letter).length;
  const presentBeforeThis = word
    .split('')
    .slice(0, position)
    .filter((l, i) => l === letter && target[i] !== letter).length;

  if (correctCount + presentBeforeThis < targetCount) return 'present';
  return 'absent';
};

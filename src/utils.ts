import { ANSWERS } from './words';

export const getDateSeed = (): number => {
  const today = new Date();
  const start = new Date(2025, 0, 1);
  return Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
};

export const seededRandom = (seed: number): number => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export const getDailyWord = (date?: Date): string => {
  const seed = date ? getDateSeedForDate(date) : getDateSeed();
  const index = Math.floor(seededRandom(seed) * ANSWERS.length);
  return ANSWERS[index];
};

export const getDateSeedForDate = (date: Date): number => {
  const start = new Date(2025, 0, 1);
  return Math.floor((date.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
};

export const getRandomWord = (): string => {
  return ANSWERS[Math.floor(Math.random() * ANSWERS.length)];
};

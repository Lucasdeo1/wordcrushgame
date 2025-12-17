
export enum GameStatus {
  START = 'START',
  LOADING = 'LOADING',
  PLAYING = 'PLAYING',
  GAME_OVER = 'GAME_OVER',
  LEVEL_COMPLETE = 'LEVEL_COMPLETE',
  LEADERBOARD = 'LEADERBOARD'
}

export type Language = 'pt' | 'en';

export interface Tile {
  id: string;
  char: string;
  x: number;
  y: number;
  status: 'default' | 'selected' | 'found' | 'error' | 'hint';
}

export interface WordLocation {
  word: string;
  startX: number;
  startY: number;
  direction: { x: number, y: number };
}

export interface LevelData {
  grid: string[]; // Array of strings representing rows
  words: string[];
  theme: string;
  wordLocations: WordLocation[]; // New: Stores precise coordinates
}

export interface PlayerStats {
  nickname: string;
  score: number;
  level: number;
  hints: number;
}

export interface LeaderboardEntry {
  rank: number;
  nickname: string;
  score: number;
  level: number;
  country: string;
  isPlayer?: boolean;
}

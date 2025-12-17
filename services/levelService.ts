import { LevelData, Language, WordLocation } from '../types';
import { STATIC_LEVELS_PT, STATIC_LEVELS_EN } from '../data/staticLevels';

// Robust Client-Side Algorithm to place words perfectly
function generateGridFromWords(words: string[], size: number): { grid: string[], placedWords: string[], wordLocations: WordLocation[] } {
  // Initialize empty grid
  const grid: string[][] = Array(size).fill(null).map(() => Array(size).fill(''));
  const placedWords: string[] = [];
  const wordLocations: WordLocation[] = [];
  
  // Directions: Horizontal, Vertical, and Diagonals (Forward reading)
  const directions = [
    { x: 1, y: 0 },   // Horizontal
    { x: 0, y: 1 },   // Vertical
    { x: 1, y: 1 },   // Diagonal Down-Right
    { x: 1, y: -1 }   // Diagonal Up-Right
  ];

  // Clean and sort words by length (longest first) for better packing
  const sortedWords = [...words]
    .map(w => w.toUpperCase().replace(/[^A-ZÇÁÉÍÓÚÃÕÂÊÔÀ]/g, '')) 
    .filter(w => w.length <= size)
    .sort((a, b) => b.length - a.length);

  for (const word of sortedWords) {
    let placed = false;
    let attempts = 0;
    
    while (!placed && attempts < 150) {
      const dir = directions[Math.floor(Math.random() * directions.length)];
      const startX = Math.floor(Math.random() * size);
      const startY = Math.floor(Math.random() * size);

      const endX = startX + (word.length - 1) * dir.x;
      const endY = startY + (word.length - 1) * dir.y;

      // Check boundaries
      if (endX >= 0 && endX < size && endY >= 0 && endY < size) {
        // Check collisions
        let canPlace = true;
        for (let i = 0; i < word.length; i++) {
          const cx = startX + i * dir.x;
          const cy = startY + i * dir.y;
          const cell = grid[cy][cx];
          // Overlap is allowed only if the letter matches
          if (cell !== '' && cell !== word[i]) {
            canPlace = false;
            break;
          }
        }

        if (canPlace) {
          // Place the word
          for (let i = 0; i < word.length; i++) {
            const cx = startX + i * dir.x;
            const cy = startY + i * dir.y;
            grid[cy][cx] = word[i];
          }
          placedWords.push(word);
          
          // Save precise location metadata
          wordLocations.push({
            word,
            startX,
            startY,
            direction: dir
          });

          placed = true;
        }
      }
      attempts++;
    }
  }

  // Fill empty cells with random letters
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (grid[y][x] === '') {
        grid[y][x] = chars[Math.floor(Math.random() * chars.length)];
      }
    }
  }

  return {
    grid: grid.map(row => row.join('')),
    placedWords: placedWords.sort(),
    wordLocations
  };
}

export const generateLevel = async (levelNumber: number, lang: Language): Promise<LevelData> => {
  // Calculate grid size based on level
  const gridSize = Math.min(8 + Math.floor(levelNumber / 5), 12); 

  // Select the correct level list based on language
  const levelList = lang === 'pt' ? STATIC_LEVELS_PT : STATIC_LEVELS_EN;

  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 600));

  try {
    // Select a level from the static list
    const levelIndex = (levelNumber - 1) % levelList.length;
    const selectedLevel = levelList[levelIndex];

    // Generate the grid algorithmically
    const { grid, placedWords, wordLocations } = generateGridFromWords(selectedLevel.words, gridSize);

    return {
      theme: selectedLevel.theme,
      grid,
      words: placedWords,
      wordLocations
    };

  } catch (error) {
    console.error("Level Generation Error:", error);
    // Absolute fallback
    const fallbackWords = lang === 'pt' ? ["ERRO", "JOGO", "REINICIE"] : ["ERROR", "GAME", "RESTART"];
    const { grid, placedWords, wordLocations } = generateGridFromWords(fallbackWords, 8);
    return {
      theme: lang === 'pt' ? "Erro no Sistema" : "System Error",
      grid,
      words: placedWords,
      wordLocations
    };
  }
};
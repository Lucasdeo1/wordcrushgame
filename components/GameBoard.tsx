import React, { useState, useEffect, useCallback } from 'react';
import { Tile, LevelData, PlayerStats } from '../types';
import { User, Star, Search, Code2, AlertTriangle, Lightbulb, PlayCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GameBoardProps {
  levelData: LevelData;
  playerStats: PlayerStats;
  onLevelComplete: () => void;
  onScoreUpdate: (points: number) => void;
  onGiveUp: (missingWords: string[]) => void;
  onUseHint: () => boolean; // Returns true if hint was used successfully (or opens ad)
  t: any; // Translations
}

const GameBoard: React.FC<GameBoardProps> = ({ 
  levelData, 
  playerStats, 
  onLevelComplete, 
  onScoreUpdate,
  onGiveUp,
  onUseHint,
  t
}) => {
  const [grid, setGrid] = useState<Tile[]>([]);
  const [selectedTiles, setSelectedTiles] = useState<Tile[]>([]);
  const [foundWordList, setFoundWordList] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [gridSize, setGridSize] = useState({ rows: 0, cols: 0 });

  // Initialize Grid
  useEffect(() => {
    const rows = levelData.grid.length;
    const cols = levelData.grid[0].length;
    setGridSize({ rows, cols });

    const newGrid: Tile[] = [];
    levelData.grid.forEach((rowStr, y) => {
      rowStr.split('').forEach((char, x) => {
        newGrid.push({
          id: `${x}-${y}`,
          char,
          x,
          y,
          status: 'default'
        });
      });
    });
    setGrid(newGrid);
    setFoundWordList([]);
    setSelectedTiles([]);
  }, [levelData]);

  // Check for level completion
  useEffect(() => {
    if (foundWordList.length > 0 && foundWordList.length === levelData.words.length) {
       confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(onLevelComplete, 1500);
    }
  }, [foundWordList, levelData.words.length, onLevelComplete]);

  // Helper: Check if a tile belongs to an already found word
  // This ensures that if we click a found tile erroneously, it goes back to green, not white.
  const isTileFound = (tile: Tile) => {
    return foundWordList.some(foundWord => {
      // Find the geometry for this word
      const loc = levelData.wordLocations.find(l => l.word === foundWord);
      if (!loc) return false;

      // Check if the tile coordinates fall on this word's line
      for (let i = 0; i < foundWord.length; i++) {
        const x = loc.startX + (i * loc.direction.x);
        const y = loc.startY + (i * loc.direction.y);
        if (x === tile.x && y === tile.y) return true;
      }
      return false;
    });
  };

  // Hint Logic
  const handleUseHint = () => {
    if (isProcessing) return;

    // Check if player needs to watch ad (0 hints) or use a hint
    // We call onUseHint() which handles the logic in App.tsx
    // If it returns FALSE, it means ad was triggered or something prevented usage
    // If it returns TRUE, we proceed to show the hint
    const canShowHint = onUseHint();
    
    if (!canShowHint) return; // Ad modal opened in parent, stop here.

    // If we have a hint, show it:
    const missingWord = levelData.words.find(w => !foundWordList.includes(w));
    if (!missingWord) return;

    const locationData = levelData.wordLocations.find(loc => loc.word === missingWord);
    if (!locationData) return;

    const startTileId = `${locationData.startX}-${locationData.startY}`;
    
    setIsProcessing(true);
    setGrid(prev => prev.map(t => {
      if (t.id === startTileId && t.status === 'default') {
         return { ...t, status: 'hint' };
      }
      return t;
    }));

    setTimeout(() => {
      setGrid(prev => prev.map(t => {
        if (t.status === 'hint') {
           return { ...t, status: 'default' };
        }
        return t;
      }));
      setIsProcessing(false);
    }, 2000); 
  };

  // Handle Error (Reset logic)
  const handleError = (currentSelection: Tile[]) => {
    setIsProcessing(true);
    // Mark selected as error (Red)
    setGrid(prev => prev.map(t => {
      const isSelected = currentSelection.find(st => st.id === t.id);
      if (isSelected) {
         return { ...t, status: 'error' };
      }
      return t;
    }));

    setTimeout(() => {
      // Reset to default OR restore 'found' status
      setGrid(prev => prev.map(t => {
        const isSelected = currentSelection.find(st => st.id === t.id);
        if (isSelected) {
            // FIX: Check if it was actually a found tile before resetting
            return { ...t, status: isTileFound(t) ? 'found' : 'default' };
        }
        return t;
      }));
      
      setSelectedTiles([]);
      setIsProcessing(false);
    }, 400);
  };

  const checkWordAttempt = (word: string, currentSelection: Tile[]) => {
    // 1. Is it a full valid word?
    if (levelData.words.includes(word) && !foundWordList.includes(word)) {
      handleSuccess(word, currentSelection);
      return;
    }

    // 2. Is it at least a prefix of a remaining word?
    const remainingWords = levelData.words.filter(w => !foundWordList.includes(w));
    const isPrefix = remainingWords.some(w => w.startsWith(word));

    if (!isPrefix) {
      handleError(currentSelection);
    }
  };

  // Handle Tile Click
  const handleTileClick = useCallback((clickedTile: Tile) => {
    if (isProcessing) return; 
    if (clickedTile.status === 'error') return; 

    let isValidNextStep = true;
    if (selectedTiles.length > 0) {
      const lastTile = selectedTiles[selectedTiles.length - 1];
      const dx = clickedTile.x - lastTile.x;
      const dy = clickedTile.y - lastTile.y;
      
      if (Math.abs(dx) > 1 || Math.abs(dy) > 1 || (dx === 0 && dy === 0)) {
         isValidNextStep = false;
      }
      
      if (selectedTiles.some(t => t.id === clickedTile.id)) {
        isValidNextStep = false;
      }

      if (isValidNextStep && selectedTiles.length >= 2) {
          const secondLast = selectedTiles[selectedTiles.length - 2];
          const prevDx = lastTile.x - secondLast.x;
          const prevDy = lastTile.y - secondLast.y;
          
          if (dx !== prevDx || dy !== prevDy) {
              isValidNextStep = false;
          }
      }
    }

    if (!isValidNextStep) {
      handleError(selectedTiles);
      return;
    }

    const newSelection = [...selectedTiles, { ...clickedTile, status: 'selected' as const }];
    const currentWord = newSelection.map(t => t.char).join('');

    const updatedGrid = grid.map(t => 
      t.id === clickedTile.id ? { ...t, status: 'selected' as const } : t
    );
    setGrid(updatedGrid);
    setSelectedTiles(newSelection);

    checkWordAttempt(currentWord, newSelection);

  }, [grid, isProcessing, selectedTiles, levelData.words, foundWordList, levelData]); // Added foundWordList and levelData dependencies

  const handleSuccess = (word: string, currentSelection: Tile[]) => {
    setIsProcessing(true);
    onScoreUpdate(word.length * 10);
    setFoundWordList(prev => [...prev, word]);

    setGrid(prev => prev.map(t => 
      currentSelection.find(st => st.id === t.id) ? { ...t, status: 'found' } : t
    ));

    setTimeout(() => {
        setSelectedTiles([]);
        setIsProcessing(false);
    }, 200);
  };

  const handleGiveUpClick = () => {
    const missing = levelData.words.filter(w => !foundWordList.includes(w));
    onGiveUp(missing);
  };

  const getGridStyle = () => ({
    display: 'grid',
    gridTemplateColumns: `repeat(${gridSize.cols}, minmax(0, 1fr))`,
    gap: '0.35rem',
    maxWidth: '500px',
    margin: '0 auto'
  });

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-slate-900 p-4 text-white">
      {/* Header */}
      <div className="w-full max-w-lg flex justify-between items-center mb-6 bg-slate-800/50 p-4 rounded-2xl backdrop-blur-md border border-slate-700">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-2 rounded-lg">
            <User size={20} className="text-white" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{t.game.player}</p>
            <p className="font-bold text-lg leading-tight">{playerStats.nickname}</p>
          </div>
        </div>
        
        <div className="text-center">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{t.game.level} {playerStats.level}</p>
            <p className="text-emerald-400 text-xs truncate max-w-[100px]">{levelData.theme}</p>
        </div>

        <div className="text-right flex flex-col items-end">
           <div className="flex items-center gap-1 justify-end text-yellow-400">
             <Star size={16} fill="currentColor" />
             <span className="font-black text-xl">{playerStats.score}</span>
           </div>
        </div>
      </div>

      {/* Progress Indicator & Hint Button (With Ad Logic) */}
      <div className="w-full max-w-lg mb-8 flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-between mb-3 px-2">
            <div className="flex items-center gap-2 text-slate-400 uppercase text-xs font-bold tracking-widest">
                <Search size={14} />
                <span>{t.game.progress}</span>
            </div>
            
            <button 
                onClick={handleUseHint}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    playerStats.hints > 0 
                    ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border border-yellow-500/50' 
                    : 'bg-indigo-500 text-white hover:bg-indigo-600 shadow-lg border border-indigo-400 animate-pulse'
                }`}
            >
                {playerStats.hints > 0 ? (
                    <>
                        <Lightbulb size={12} className="fill-yellow-400" />
                        <span>{t.game.hint} ({playerStats.hints})</span>
                    </>
                ) : (
                    <>
                        <PlayCircle size={12} className="fill-white" />
                        <span>{t.game.watchAd}</span>
                    </>
                )}
            </button>
        </div>

        <div className="flex gap-2 flex-wrap justify-center">
            {levelData.words.map((_, index) => (
                <div 
                    key={index} 
                    className={`h-3 w-3 rounded-full transition-all duration-500 shadow-sm ${
                        index < foundWordList.length 
                        ? 'bg-green-400 scale-125 shadow-[0_0_10px_rgba(74,222,128,0.5)]' 
                        : 'bg-slate-700 border border-slate-600'
                    }`} 
                />
            ))}
        </div>
        <p className="mt-3 text-slate-500 text-sm font-medium">
            {foundWordList.length} {t.game.found} {levelData.words.length} {t.game.foundSuffix}
        </p>
      </div>

      {/* Game Grid */}
      <div className="w-full max-w-lg relative perspective-1000">
        <div style={getGridStyle()} className="w-full">
          {grid.map((tile) => {
             let bgClass = "bg-white text-slate-800 shadow-[0_4px_0_rgb(203,213,225)]";
             let transformClass = "hover:-translate-y-1 active:translate-y-0 active:shadow-none";
             
             if (tile.status === 'selected') {
               bgClass = "bg-emerald-500 text-white shadow-[0_4px_0_rgb(16,185,129)] border-emerald-400";
               transformClass = "-translate-y-1";
             } else if (tile.status === 'error') {
               bgClass = "bg-red-500 text-white animate-shake";
               transformClass = "";
             } else if (tile.status === 'found') {
               bgClass = "bg-slate-800 text-emerald-500 border border-slate-700 shadow-inner"; 
               transformClass = "scale-95"; 
             } else if (tile.status === 'hint') {
               bgClass = "bg-yellow-400 text-slate-900 shadow-[0_0_15px_rgba(250,204,21,0.8)] animate-pulse z-10 scale-105 border-2 border-yellow-200";
               transformClass = "-translate-y-1";
             }

             return (
               <button
                 key={tile.id}
                 onClick={() => handleTileClick(tile)}
                 disabled={false} 
                 className={`
                   aspect-square rounded-xl font-black text-2xl sm:text-3xl flex items-center justify-center
                   transition-all duration-200 select-none
                   ${bgClass} ${transformClass}
                 `}
               >
                 {tile.char}
               </button>
             );
          })}
        </div>
      </div>

      {/* Controls - REPLACED "Save & Exit" with just "Give Up" in full width */}
      <div className="mt-8 w-full max-w-lg">
        <button 
          onClick={handleGiveUpClick}
          className="w-full flex items-center justify-center gap-2 px-4 py-4 bg-red-900/30 hover:bg-red-900/50 rounded-xl font-bold transition-colors text-red-400 border-2 border-red-900/50"
        >
          <AlertTriangle size={20} />
          {t.game.giveUp}
        </button>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-8 pb-4 text-center">
        <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-600 uppercase tracking-wider">
            <Code2 size={12} />
            <span>{t.common.developedBy}</span>
            <a 
              href="https://github.com/Lucasdeo1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-bold hover:text-slate-400 transition-colors"
            >
                Lucasdeo1
            </a>
        </div>
      </div>
      
    </div>
  );
};

export default GameBoard;
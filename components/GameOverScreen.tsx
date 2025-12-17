import React from 'react';
import { Skull, RefreshCw, Code2 } from 'lucide-react';
import AdBanner from './AdBanner';

interface GameOverScreenProps {
  score: number;
  level: number;
  missingWords: string[];
  onRestart: () => void;
  t: any;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ 
  score, 
  level, 
  missingWords, 
  onRestart,
  t 
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 p-4 text-white relative overflow-hidden overflow-y-auto">
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-slate-900 to-slate-900 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md bg-slate-800/80 backdrop-blur-md p-8 rounded-3xl border border-slate-700 shadow-2xl text-center animate-shake my-8">
        
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-red-500/30">
          <Skull size={40} className="text-red-500" />
        </div>

        <h1 className="text-4xl font-black text-red-500 mb-2 tracking-tight uppercase">
          {t.gameOver.title}
        </h1>
        <p className="text-slate-400 font-medium mb-8">
          {t.gameOver.subtitle}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
            <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">{t.gameOver.finalScore}</p>
            <p className="text-2xl font-black text-white">{score}</p>
          </div>
          <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
            <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">{t.game.level}</p>
            <p className="text-2xl font-black text-white">{level}</p>
          </div>
        </div>

        {missingWords.length > 0 && (
          <div className="mb-8 text-left">
            <p className="text-sm text-red-400 font-bold mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              {t.gameOver.missedWords}
            </p>
            <div className="flex flex-wrap gap-2">
              {missingWords.map((word, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1 bg-red-900/20 border border-red-900/30 text-red-300 rounded-lg text-sm font-bold"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Ad Space before Action */}
        <AdBanner className="mb-6" />

        <button 
          onClick={onRestart}
          className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-black rounded-xl shadow-lg hover:shadow-red-900/20 transition-all flex items-center justify-center gap-2 group"
        >
          <RefreshCw className="group-hover:rotate-180 transition-transform duration-500" />
          {t.gameOver.newGameButton}
        </button>

      </div>

      <div className="mt-8 flex items-center justify-center gap-1.5 text-[10px] text-slate-600 uppercase tracking-wider z-10">
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
  );
};

export default GameOverScreen;

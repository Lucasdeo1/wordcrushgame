import React, { useState } from 'react';
import { Play, Globe, Trophy, BarChart3, Code2, Info, X, Coffee } from 'lucide-react';
import { Language } from '../types';
import AdBanner from './AdBanner';

interface StartScreenProps {
  onStart: (nickname: string) => void;
  onOpenLeaderboard: () => void;
  lastScore: number;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any; // Translations object
}

const StartScreen: React.FC<StartScreenProps> = ({ 
  onStart, 
  onOpenLeaderboard, 
  lastScore,
  language,
  setLanguage,
  t
}) => {
  const [nickname, setNickname] = useState('');
  const [showAbout, setShowAbout] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname.trim().length > 0) {
      onStart(nickname.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 relative overflow-hidden overflow-y-auto">
      
      {/* Language Toggle */}
      <div className="absolute top-6 right-6 z-20 flex bg-white/20 backdrop-blur-md rounded-full p-1 border border-white/30">
        <button 
          onClick={() => setLanguage('pt')}
          className={`px-3 py-1 rounded-full text-xl transition-all ${language === 'pt' ? 'bg-white shadow-md scale-105' : 'opacity-50 hover:opacity-100'}`}
          title="Português"
        >
          🇧🇷
        </button>
        <button 
          onClick={() => setLanguage('en')}
          className={`px-3 py-1 rounded-full text-xl transition-all ${language === 'en' ? 'bg-white shadow-md scale-105' : 'opacity-50 hover:opacity-100'}`}
          title="English"
        >
          🇺🇸
        </button>
      </div>

      <div className="bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl w-full max-w-md text-center transform transition-all z-10 my-8">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg rotate-3">
            <span className="text-4xl font-bold text-white">W</span>
          </div>
          <div className="w-20 h-20 bg-gradient-to-tr from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg -ml-4 -rotate-3 z-10">
            <span className="text-4xl font-bold text-white">C</span>
          </div>
        </div>
        
        <h1 className="text-4xl font-black text-gray-800 mb-2 tracking-tight">WordCrush</h1>
        <p className="text-gray-500 mb-8 font-semibold">{t.start.title}</p>

        {lastScore > 0 && (
          <div className="mb-6 bg-yellow-100 border-2 border-yellow-300 p-3 rounded-xl flex items-center justify-center gap-2 text-yellow-700">
            <Trophy size={20} />
            <span className="font-bold">{t.start.lastScore}: {lastScore}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative group">
            <input
              type="text"
              placeholder={t.start.placeholder}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              maxLength={12}
              className="w-full px-6 py-4 text-xl font-bold text-gray-700 bg-gray-100 rounded-xl border-2 border-transparent focus:border-purple-500 focus:bg-white focus:outline-none transition-all placeholder-gray-400 text-center shadow-inner"
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={!nickname.trim()}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xl font-black rounded-xl shadow-lg transform active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
          >
            <Play className="fill-current group-hover:scale-110 transition-transform" />
            {t.start.playButton}
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3">
           <button 
             onClick={onOpenLeaderboard}
             className="w-full py-3 bg-white border-2 border-indigo-100 hover:border-indigo-300 text-indigo-600 hover:text-indigo-700 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
           >
             <BarChart3 size={20} />
             {t.start.leaderboardButton}
           </button>

           <div className="flex gap-2">
             <button 
               onClick={() => setShowAbout(true)}
               className="flex-1 py-2 bg-transparent text-gray-400 hover:text-indigo-500 font-bold transition-all flex items-center justify-center gap-2 text-sm"
             >
               <Info size={16} />
               {t.start.aboutButton}
             </button>
             
             {/* Donation Button - Monetization */}
             <a 
               href="https://ko-fi.com" 
               target="_blank"
               rel="noopener noreferrer"
               className="flex-1 py-2 bg-transparent text-pink-500 hover:text-pink-600 font-bold transition-all flex items-center justify-center gap-2 text-sm"
             >
               <Coffee size={16} />
               {t.start.donate}
             </a>
           </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
            <Globe size={14} />
            <span>{t.start.serverInfo} • v1.4.1</span>
          </div>
          
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-2">
            <Code2 size={12} />
            <span>{t.common.developedBy}</span>
            <a 
              href="https://github.com/Lucasdeo1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-bold text-indigo-400 hover:text-indigo-600 transition-colors"
            >
              Lucasdeo1
            </a>
          </div>
        </div>
      </div>

      {/* Monetization: Ad Banner */}
      <AdBanner />

      {/* About Modal */}
      {showAbout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAbout(false)}></div>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative z-10 animate-shake">
            <button 
              onClick={() => setShowAbout(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
            >
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-black text-gray-800 mb-6">{t.about.title}</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-indigo-600 font-bold text-lg mb-2">{t.about.gameplayTitle}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {t.about.gameplay}
                </p>
              </div>
              
              <div>
                <h3 className="text-purple-600 font-bold text-lg mb-2">{t.about.purposeTitle}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {t.about.purpose}
                </p>
              </div>
            </div>

            <button 
              onClick={() => setShowAbout(false)}
              className="w-full mt-8 py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-colors"
            >
              {t.about.close}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default StartScreen;
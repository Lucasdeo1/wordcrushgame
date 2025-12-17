import React from 'react';
import { Trophy, ArrowLeft, Medal, Globe, Code2 } from 'lucide-react';
import { LeaderboardEntry } from '../types';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  onBack: () => void;
  t: any;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ entries, onBack, t }) => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-slate-900 p-4 text-white overflow-hidden">
      
      {/* Header */}
      <div className="w-full max-w-lg flex items-center justify-between mb-8 mt-4">
        <button 
          onClick={onBack}
          className="p-3 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center gap-3">
          <Globe className="text-blue-400" size={28} />
          <h1 className="text-2xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            {t.leaderboard.title}
          </h1>
        </div>
        <div className="w-12"></div> {/* Spacer for alignment */}
      </div>

      {/* List */}
      <div className="w-full max-w-lg bg-slate-800/50 backdrop-blur-md rounded-3xl border border-slate-700 overflow-hidden shadow-2xl">
        <div className="overflow-y-auto max-h-[70vh] custom-scrollbar">
          
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-800 text-slate-400 text-xs uppercase tracking-wider sticky top-0 z-10">
              <tr>
                <th className="p-4 text-center">#</th>
                <th className="p-4">{t.leaderboard.playerCol}</th>
                <th className="p-4 text-center">{t.leaderboard.levelCol}</th>
                <th className="p-4 text-right">{t.leaderboard.scoreCol}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {entries.map((entry) => {
                let rankStyle = "text-slate-400 font-bold";
                let rowBg = "";
                let Icon = null;

                if (entry.rank === 1) {
                  rankStyle = "text-yellow-400 font-black text-xl";
                  rowBg = "bg-yellow-500/10";
                  Icon = <Medal size={20} className="text-yellow-400 inline" />;
                } else if (entry.rank === 2) {
                  rankStyle = "text-slate-300 font-black text-lg";
                  rowBg = "bg-slate-400/10";
                  Icon = <Medal size={18} className="text-slate-300 inline" />;
                } else if (entry.rank === 3) {
                  rankStyle = "text-orange-400 font-black text-lg";
                  rowBg = "bg-orange-500/10";
                  Icon = <Medal size={18} className="text-orange-400 inline" />;
                }

                if (entry.isPlayer) {
                  rowBg = "bg-indigo-500/20 border-l-4 border-indigo-500";
                }

                return (
                  <tr key={`${entry.rank}-${entry.nickname}`} className={`${rowBg} transition-colors hover:bg-slate-700/30`}>
                    <td className="p-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1">
                        {Icon ? Icon : <span className={rankStyle}>{entry.rank}</span>}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className={`font-bold text-lg ${entry.isPlayer ? 'text-indigo-300' : 'text-white'}`}>
                           {entry.country} {entry.nickname}
                        </span>
                        {entry.isPlayer && <span className="text-[10px] uppercase bg-indigo-500 w-fit px-1 rounded text-white">{t.leaderboard.you}</span>}
                      </div>
                    </td>
                    <td className="p-4 text-center font-mono text-slate-400">
                      {entry.level}
                    </td>
                    <td className="p-4 text-right font-mono font-bold text-emerald-400 text-lg">
                      {entry.score.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          {entries.length === 0 && (
             <div className="p-8 text-center text-slate-500">
                {t.leaderboard.empty}
             </div>
          )}

        </div>
      </div>

      <div className="mt-6 text-center flex flex-col items-center gap-2 pb-6">
         <p className="text-slate-500 text-xs">
           {t.leaderboard.footer}
         </p>
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

export default Leaderboard;
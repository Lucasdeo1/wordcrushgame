import React, { useState, useEffect } from 'react';
import StartScreen from './components/StartScreen';
import GameBoard from './components/GameBoard';
import Leaderboard from './components/Leaderboard';
import GameOverScreen from './components/GameOverScreen'; 
import RewardAdModal from './components/RewardAdModal'; 
import { GameStatus, LevelData, PlayerStats, LeaderboardEntry, Language } from './types';
import { generateLevel } from './services/levelService';
import { getLeaderboardFromBackend, saveScoreToBackend } from './services/leaderboardService';
import { initializeAds } from './services/adService';
import { Loader2 } from 'lucide-react';
import { getTranslation } from './i18n';

const App: React.FC = () => {
  // Language detection
  const [language, setLanguage] = useState<Language>(() => {
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith('pt') ? 'pt' : 'en';
  });

  const t = getTranslation(language);

  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.START);
  const [playerStats, setPlayerStats] = useState<PlayerStats>({
    nickname: '',
    score: 0,
    level: 1,
    hints: 3 
  });
  const [currentLevelData, setCurrentLevelData] = useState<LevelData | null>(null);
  const [loadingMessage, setLoadingMessage] = useState(t.loading.connecting);
  const [missingWords, setMissingWords] = useState<string[]>([]); 
  
  // Ad State (Simulação de Reward para Web)
  const [showWebAdModal, setShowWebAdModal] = useState(false);
  
  // Leaderboard State
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  // Inicializa Ads e Ranking
  useEffect(() => {
    refreshLeaderboard();
    initializeAds(); 
  }, []);

  const refreshLeaderboard = async () => {
    try {
      const data = await getLeaderboardFromBackend();
      if (data.length > 0) {
        const markedData = data.map(entry => ({
            ...entry,
            isPlayer: entry.nickname === playerStats.nickname && playerStats.nickname !== ''
        }));
        setLeaderboard(markedData);
      } else {
         setLeaderboard([]);
      }
    } catch (e) {
      console.error("Failed to load leaderboard");
    }
  };

  const handleStartGame = async (nickname: string) => {
    setPlayerStats({ nickname, score: 0, level: 1, hints: 3 });
    loadLevel(1, language); 
  };

  const loadLevel = async (level: number, lang: Language) => {
    setGameStatus(GameStatus.LOADING);
    const tCurrent = getTranslation(lang);
    setLoadingMessage(level === 1 ? tCurrent.loading.preparing : tCurrent.loading.nextLevel);
    
    try {
      const data = await generateLevel(level, lang);
      setCurrentLevelData(data);
      setGameStatus(GameStatus.PLAYING);
    } catch (error) {
      console.error("Failed to load level", error);
      setLoadingMessage(tCurrent.loading.error);
      setTimeout(() => loadLevel(level, lang), 2000);
    }
  };

  const handleScoreUpdate = (points: number) => {
    setPlayerStats(prev => ({
      ...prev,
      score: prev.score + points
    }));
  };

  // --- LÓGICA DE DICAS ---
  const handleUseHint = () => {
    // 1. Se tem dicas, gasta uma
    if (playerStats.hints > 0) {
        setPlayerStats(prev => ({
            ...prev,
            hints: prev.hints - 1
        }));
        return true; // Dica usada com sucesso
    } 
    
    // 2. Se não tem dicas, abre modal de "Anúncio" (Simulação Web)
    setShowWebAdModal(true);
    return false; // Espera o "anúncio" terminar
  };

  const giveReward = () => {
    setPlayerStats(prev => ({
        ...prev,
        hints: prev.hints + 1
    }));
  };

  // Callback do Modal Web
  const handleWebAdComplete = () => {
    giveReward();
    setShowWebAdModal(false);
  };

  const handleLevelComplete = () => {
    setGameStatus(GameStatus.LEVEL_COMPLETE);
    setTimeout(() => {
      const nextLevel = playerStats.level + 1;
      // Bonus de dica a cada 5 níveis
      const bonusHint = nextLevel % 5 === 0 ? 1 : 0;
      
      setPlayerStats(prev => ({ 
          ...prev, 
          level: nextLevel,
          hints: prev.hints + bonusHint
      }));
      loadLevel(nextLevel, language);
    }, 2000);
  };

  const handleGiveUp = async (missing: string[]) => {
    setMissingWords(missing);
    
    const flag = language === 'pt' ? "🇧🇷" : "🌍";
    
    // Salva no Firebase
    await saveScoreToBackend(
        playerStats.nickname,
        playerStats.score,
        playerStats.level,
        flag
    );
    refreshLeaderboard(); 

    setGameStatus(GameStatus.GAME_OVER);
  };

  const handleFullReset = () => {
    setPlayerStats({
      nickname: '', 
      score: 0,     
      level: 1,
      hints: 3
    });
    setGameStatus(GameStatus.START);
  };

  const handleOpenLeaderboard = async () => {
    const tCurrent = getTranslation(language);
    setGameStatus(GameStatus.LOADING);
    setLoadingMessage(tCurrent.loading.loadingRank);
    await refreshLeaderboard();
    setGameStatus(GameStatus.LEADERBOARD);
  };

  const handleCloseLeaderboard = () => {
    setGameStatus(GameStatus.START);
  };

  return (
    <div className="antialiased text-gray-800">
      
      {/* Web Modal para Dicas Extras */}
      {showWebAdModal && (
        <RewardAdModal 
            onComplete={handleWebAdComplete}
            onClose={() => setShowWebAdModal(false)}
            t={t}
        />
      )}

      {gameStatus === GameStatus.START && (
        <StartScreen 
          onStart={handleStartGame} 
          onOpenLeaderboard={handleOpenLeaderboard}
          lastScore={playerStats.score} 
          language={language}
          setLanguage={setLanguage}
          t={t}
        />
      )}

      {gameStatus === GameStatus.LEADERBOARD && (
        <Leaderboard 
          entries={leaderboard} 
          onBack={handleCloseLeaderboard} 
          t={t}
        />
      )}

      {gameStatus === GameStatus.GAME_OVER && (
        <GameOverScreen
          score={playerStats.score}
          level={playerStats.level}
          missingWords={missingWords}
          onRestart={handleFullReset}
          t={t}
        />
      )}

      {gameStatus === GameStatus.LOADING && (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
          <Loader2 className="w-16 h-16 animate-spin text-indigo-500 mb-4" />
          <h2 className="text-2xl font-bold">{loadingMessage}</h2>
          <p className="text-slate-400 mt-2">WordCrush Web</p>
        </div>
      )}

      {(gameStatus === GameStatus.PLAYING || gameStatus === GameStatus.LEVEL_COMPLETE) && currentLevelData && (
        <>
           {gameStatus === GameStatus.LEVEL_COMPLETE && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                <div className="bg-white p-8 rounded-3xl text-center animate-bounce">
                  <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                    {t.game.levelComplete}
                  </h2>
                  <p className="text-gray-500 font-bold mt-2">{t.game.prepare}</p>
                </div>
              </div>
           )}
           <GameBoard 
             levelData={currentLevelData}
             playerStats={playerStats}
             onLevelComplete={handleLevelComplete}
             onScoreUpdate={handleScoreUpdate}
             onGiveUp={handleGiveUp}
             onUseHint={handleUseHint}
             t={t}
           />
        </>
      )}
    </div>
  );
};

export default App;
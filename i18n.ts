import { Language } from './types';

export const translations = {
  pt: {
    common: {
      developedBy: "Desenvolvido por"
    },
    start: {
      title: "Conecte. Dissolva. Conquiste.",
      placeholder: "Seu Nickname",
      playButton: "JOGAR AGORA",
      leaderboardButton: "VER RANKING GLOBAL",
      aboutButton: "SOBRE O JOGO",
      donate: "Apoiar",
      serverInfo: "Servidor Global",
      lastScore: "Pontuação"
    },
    about: {
      title: "Sobre o WordCrush",
      gameplayTitle: "🎮 Como Funciona",
      gameplay: "Clique nas letras adjacentes (horizontal, vertical ou diagonal) para montar as palavras. Se acertar, os blocos se dissolvem. Cuidado: você deve seguir uma linha reta!",
      purposeTitle: "🌍 Objetivo Global",
      purpose: "Este projeto foi desenhado para ser um passatempo mundial. Assim como nos jogos .io clássicos, você escolhe um Nick e compete instantaneamente contra o mundo todo. São níveis infinitos e dinâmicos. Até onde você consegue chegar?",
      close: "Entendi, vamos jogar!"
    },
    game: {
      player: "Jogador",
      level: "Nível",
      progress: "Progresso da Busca",
      hint: "Dica",
      watchAd: "Assistir (+1 Dica)",
      found: "de", // x "de" y encontradas
      foundSuffix: "encontradas",
      giveUp: "DESISTIR (Salvar Pontuação)",
      levelComplete: "NÍVEL COMPLETADO!",
      prepare: "Prepare-se..."
    },
    ad: {
      title: "Anúncio Patrocinado",
      subtitle: "Apoie o desenvolvedor assistindo este vídeo curto.",
      wait: "Aguarde o anúncio",
      reward: "RESGATAR RECOMPENSA"
    },
    gameOver: {
      title: "FIM DE JOGO",
      subtitle: "Você desistiu, mas valeu a tentativa!",
      finalScore: "Pontuação Final",
      missedWords: "Palavras que faltaram neste nível:",
      newGameButton: "TENTAR COM NOVO NICK"
    },
    leaderboard: {
      title: "Ranking Mundial",
      playerCol: "Jogador",
      levelCol: "Nvl",
      scoreCol: "Pts",
      empty: "Nenhum recorde ainda. Seja o primeiro!",
      footer: "Ranking atualizado em tempo real • Temporada 1",
      you: "Você"
    },
    loading: {
      connecting: "Conectando ao servidor...",
      preparing: "Preparando tabuleiro...",
      nextLevel: "Montando próximo desafio...",
      saving: "Salvando pontuação no Ranking Mundial...",
      loadingRank: "Carregando Ranking Global...",
      error: "Erro ao carregar. Tentando novamente..."
    }
  },
  en: {
    common: {
      developedBy: "Developed by"
    },
    start: {
      title: "Connect. Dissolve. Conquer.",
      placeholder: "Your Nickname",
      playButton: "PLAY NOW",
      leaderboardButton: "VIEW GLOBAL RANKING",
      aboutButton: "ABOUT THE GAME",
      donate: "Support",
      serverInfo: "Global Server",
      lastScore: "Score"
    },
    about: {
      title: "About WordCrush",
      gameplayTitle: "🎮 How to Play",
      gameplay: "Click on adjacent letters (horizontal, vertical, or diagonal) to build words. If you get it right, the blocks dissolve. Warning: you must follow a straight line!",
      purposeTitle: "🌍 Global Purpose",
      purpose: "This project is designed to be a worldwide pastime. Just like classic .io games, you pick a Nickname and instantly compete against the entire world. Levels are infinite and dynamic. How far can you go?",
      close: "Got it, let's play!"
    },
    game: {
      player: "Player",
      level: "Level",
      progress: "Search Progress",
      hint: "Hint",
      watchAd: "Watch Ad (+1 Hint)",
      found: "of", // x "of" y found
      foundSuffix: "found",
      giveUp: "GIVE UP (Save Score)",
      levelComplete: "LEVEL COMPLETE!",
      prepare: "Get ready..."
    },
    ad: {
      title: "Sponsored Ad",
      subtitle: "Support the developer by watching this short video.",
      wait: "Wait for ad",
      reward: "CLAIM REWARD"
    },
    gameOver: {
      title: "GAME OVER",
      subtitle: "You gave up, but nice try!",
      finalScore: "Final Score",
      missedWords: "Words you missed in this level:",
      newGameButton: "TRY WITH NEW NICK"
    },
    leaderboard: {
      title: "World Ranking",
      playerCol: "Player",
      levelCol: "Lvl",
      scoreCol: "Pts",
      empty: "No records yet. Be the first!",
      footer: "Real-time ranking • Season 1",
      you: "You"
    },
    loading: {
      connecting: "Connecting to server...",
      preparing: "Preparing board...",
      nextLevel: "Building next challenge...",
      saving: "Saving score to Global Ranking...",
      loadingRank: "Loading Global Ranking...",
      error: "Load error. Retrying..."
    }
  }
};

export const getTranslation = (lang: Language) => translations[lang];
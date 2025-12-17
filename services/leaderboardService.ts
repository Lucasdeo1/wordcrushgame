import { LeaderboardEntry } from '../types';
import { db } from './firebase';
import { collection, addDoc, getDocs, query, orderBy, limit } from "firebase/firestore";

const COLLECTION_NAME = "leaderboard";

export const saveScoreToBackend = async (nickname: string, score: number, level: number, country: string) => {
  try {
    // Salva no Firebase
    await addDoc(collection(db, COLLECTION_NAME), {
      nickname,
      score,
      level,
      country,
      createdAt: new Date()
    });
    return true;
  } catch (error) {
    console.error("Erro ao salvar no Firebase:", error);
    return false;
  }
};

export const getLeaderboardFromBackend = async (): Promise<LeaderboardEntry[]> => {
  try {
    // Busca os Top 50 ordenados por pontuação
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy("score", "desc"),
      limit(50)
    );

    const querySnapshot = await getDocs(q);
    
    const entries: LeaderboardEntry[] = [];
    let rank = 1;

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      entries.push({
        rank: rank++,
        nickname: data.nickname || 'Anônimo',
        score: data.score || 0,
        level: data.level || 1,
        country: data.country || '🌍',
        isPlayer: false // Será ajustado no App.tsx
      });
    });

    return entries;

  } catch (error) {
    console.error("Erro ao buscar ranking do Firebase:", error);
    return [];
  }
};
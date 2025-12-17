import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// --- CONFIGURAÇÃO DO FIREBASE ---
// 1. Vá em console.firebase.google.com
// 2. Crie um projeto > Adicione app Web (</>)
// 3. Copie as chaves e cole abaixo:

 const firebaseConfig = {
    apiKey: "AIzaSyBOQZylXWIu5kvv_zoa4731KApj8MLuPvk",
    authDomain: "wordcrush-16f8a.firebaseapp.com",
    projectId: "wordcrush-16f8a",
    storageBucket: "wordcrush-16f8a.firebasestorage.app",
    messagingSenderId: "428994010230",
    appId: "1:428994010230:web:a71a3fecb77cf498925357",
    measurementId: "G-8DD2ZZJSKE"
  };

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta o banco de dados para ser usado no jogo
export const db = getFirestore(app);
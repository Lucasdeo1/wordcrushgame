import { sql } from '@vercel/postgres';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // Configuração de CORS para permitir que seu front acesse a API
  response.setHeader('Access-Control-Allow-Credentials', "true");
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  try {
    // Cria a tabela se não existir (apenas para garantir)
    await sql`
      CREATE TABLE IF NOT EXISTS leaderboard (
        id SERIAL PRIMARY KEY,
        nickname VARCHAR(50) NOT NULL,
        score INT NOT NULL,
        level INT NOT NULL,
        country VARCHAR(10) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    if (request.method === 'POST') {
      const { nickname, score, level, country } = request.body;
      
      if (!nickname || score === undefined) {
        return response.status(400).json({ error: 'Missing nickname or score' });
      }

      await sql`
        INSERT INTO leaderboard (nickname, score, level, country)
        VALUES (${nickname}, ${score}, ${level}, ${country});
      `;

      return response.status(200).json({ message: 'Score saved' });
    }

    if (request.method === 'GET') {
      // Pega o Top 50
      const { rows } = await sql`
        SELECT nickname, score, level, country 
        FROM leaderboard 
        ORDER BY score DESC 
        LIMIT 50;
      `;
      return response.status(200).json(rows);
    }

    return response.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: 'Database error', details: error });
  }
}
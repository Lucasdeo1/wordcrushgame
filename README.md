# 🌍 WordCrush - Guia de Lançamento

Este guia contém os passos exatos para colocar o **wordcrushgame.com** no ar.

## 1. Configuração do Banco de Dados (Firebase)
O jogo precisa do Firebase para salvar o Ranking Mundial.

1. Acesse [console.firebase.google.com](https://console.firebase.google.com/).
2. Crie um projeto novo chamado **WordCrush**.
3. No menu lateral, clique em **Criação** > **Firestore Database**.
4. Clique em **Criar banco de dados**.
   * Escolha o local (ex: `nam5` ou `sa-east-1` para Brasil).
   * **IMPORTANTE:** Comece no **Modo de teste** (para não precisar configurar regras de segurança complexas agora).
5. Clique na engrenagem (⚙️) > **Configurações do projeto**.
6. Role até "Seus aplicativos" e clique no ícone **Web** (`</>`).
   * Apelido do app: `WordCrush Web`.
   * Registre o app.
7. Copie as configurações (`apiKey`, `authDomain`, etc) que o Firebase mostrar.
8. Abra o arquivo `services/firebase.ts` no seu código e cole essas chaves lá.

## 2. Configuração de Anúncios (Google AdSense)
Para ganhar dinheiro com o jogo.

1. Acesse o [Google AdSense](https://adsense.google.com/).
2. Adicione o site: `wordcrushgame.com`.
3. O AdSense vai te dar um **ID de Publicador** (ex: `pub-1234567890123456`).
4. **No código:**
   * Abra `components/AdBanner.tsx` e troque `ca-pub-SEU_ID...` pelo seu ID.
   * Abra `public/ads.txt` e troque `pub-SEU_ID...` pelo seu ID.
5. **No Vercel (Depois do deploy):** O AdSense pedirá para você colocar um script no `<head>`. Como usamos React, verifique se o arquivo `components/AdBanner.tsx` já está fazendo o trabalho, mas certifique-se de que o arquivo `public/ads.txt` está acessível no navegador após o deploy (ex: `wordcrushgame.com/ads.txt`).

## 3. Hospedagem (Vercel)

1. Crie uma conta na [Vercel](https://vercel.com/) (use sua conta GitHub).
2. Clique em **Add New...** > **Project**.
3. Importe o repositório do WordCrush.
4. Framework Preset: **Vite** (ou Create React App, a Vercel detecta automático).
5. Clique em **Deploy**.

### Configurando o Domínio
1. No painel do projeto na Vercel, vá em **Settings** > **Domains**.
2. Adicione `wordcrushgame.com`.
3. A Vercel vai te dar os `Nameservers` (ex: `ns1.vercel-dns.com` e `ns2.vercel-dns.com`).
4. Vá onde você comprou o domínio (GoDaddy, Namecheap, Registro.br, etc).
5. Altere os servidores de DNS do seu domínio para os que a Vercel forneceu.
6. Aguarde a propagação (pode levar de 1h a 24h).

---

## ✅ Lista de Verificação Final

- [ ] `services/firebase.ts` está com as chaves reais?
- [ ] O Firestore foi criado no console do Firebase?
- [ ] `components/AdBanner.tsx` está com o ID do AdSense correto?
- [ ] O domínio na Vercel está com o status "Valid Configuration"?

**Boa sorte com o lançamento! 🚀**
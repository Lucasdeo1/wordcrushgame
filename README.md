# 🧩 WordCrush Game

WordCrush é um jogo de palavras desenvolvido como uma **Single Page Application (SPA)**, com foco em performance, experiência do usuário e lógica de jogo. O projeto está em produção e conta com um **ranking global em tempo real**, conectando jogadores de diferentes países.

🔗 **Acesse o jogo:** [https://wordcrushgame.com](https://wordcrushgame.com)

---

## 🚀 Tecnologias Utilizadas

### Front-end

* **React** – arquitetura baseada em componentes e navegação sem recarregamento de página
* **TypeScript** – tipagem estática para maior segurança e manutenção do código
* **JavaScript (ES6+)**
* **HTML5 | CSS3**
* **Tailwind CSS** – estilização moderna e responsiva

### Back-end / Nuvem

* **Firebase Firestore** – banco de dados NoSQL em nuvem
* **Firebase Hosting** – deploy do projeto em produção

### Ferramentas

* **Vite** – build rápido e otimizado
* **Git & GitHub** – versionamento de código

---

## 🧠 Funcionalidades Principais

* 🎮 Jogo de palavras com **níveis gerados dinamicamente**
* ⚡ Navegação instantânea (SPA, sem reload de página)
* 🌍 **Ranking global em tempo real**
* 🧮 Sistema de pontuação por nível
* 🎨 Interface moderna e responsiva
* 🎉 Feedback visual ao concluir níveis

---

## ⚙️ Lógica de Jogo

O jogo utiliza um **algoritmo customizado** para geração automática de níveis, localizado no arquivo `levelService.ts`. Esse algoritmo é responsável por:

* Criar palavras dinamicamente
* Garantir que não haja sobreposição inválida de letras
* Permitir a criação de níveis infinitos sem necessidade de configuração manual

---

## 🔒 Segurança

Este projeto utiliza **Cloud Firestore com regras de segurança personalizadas**, garantindo:

* ✅ Leitura pública do ranking
* ✅ Escrita permitida apenas com dados válidos (nome, pontuação, nível, país e data)
* ❌ Bloqueio de atualização e exclusão de registros
* ❌ Bloqueio de acesso a outras collections

As chaves de configuração do Firebase estão no front-end **por design da plataforma** e **não concedem acesso administrativo** ao banco de dados. Toda a segurança está centralizada nas **Firestore Rules**.

---

## 📌 Status do Projeto

✅ Em produção
🔄 Em evolução contínua

---

## 👨‍💻 Autor

**Lucas Deodato Silva**
Desenvolvedor Web Júnior

* GitHub: [https://github.com/Lucasdeo1](https://github.com/Lucasdeo1)
* LinkedIn: [https://www.linkedin.com/in/lucas-deodato-467b1b162](https://www.linkedin.com/in/lucas-deodato-467b1b162)

---

⭐ Se você gostou do projeto, fique à vontade para deixar uma estrela no repositório!

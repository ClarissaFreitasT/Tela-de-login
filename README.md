# Tela de Login — Projeto Escolar

Descrição rápida: este repositório contém um exemplo mínimo de site de cadastro/login (frontend estático + backend em Node.js/Express) pensado para uma atividade escolar. Não é um produto pronto, apenas um ponto de partida.

Arquivos principais:
- `server.js` — servidor Express com rotas `POST /api/register` e `POST /api/login`.
- `models/User.js` — modelo Mongoose para usuários (com hash de senha via bcrypt).
- `public/` — frontend: `index.html` (registro), `login.html`, `styles.css`, `app.js`.
- `.env.sample` — template para configurar `MONGO_URI`.

Instruções rápidas (local):
1. Copie `.env.sample` para `.env` e preencha `MONGO_URI` com sua conexão do MongoDB Atlas.
2. No terminal, instale dependências:

```powershell
cd "C:\Users\clarissa_teixeira\Documents\04-11\Tela-de-login"
npm install
```

3. Inicie o servidor:

```powershell
npm start
```

4. Abra no navegador:
 - Registro: http://localhost:3000/
 - Login: http://localhost:3000/login.html

Notas do professor / requisitos da atividade
- Este é um trabalho escolar — não precisa de complexidade. O objetivo é demonstrar entendimento.
- Não faça commit do arquivo `.env` (já incluído em `.gitignore`).
- Para a parte de gerenciamento/fluxo pedida pelo professor: crie suas branches
  (`staging` etc.), abra Issues no GitHub e peça explicações do Copilot inserindo comentários no código (conforme instruções da atividade).

Segurança e deploy
- Este exemplo usa bcrypt para armazenar senhas com hash. Para produção, avalie usar HTTPS, validação mais robusta, proteção contra ataques de força bruta e gerenciamento seguro de segredos (Vercel/Env vars/Secrets).

Se quiser, posso:
- Criar as branches `staging` e `development` localmente
- Criar Issues sugeridas no repositório (posso ajudar a escrever as descrições)
- Preparar instruções para deploy na Vercel

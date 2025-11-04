# Issues sugeridas para GitHub (copiar/colar ao criar Issues)

Issue 1 — Criar estrutura HTML/CSS base
Descrição:
Criação das páginas estáticas do projeto:
- `index.html` (formulário de cadastro)
- `login.html` (formulário de login)
- `styles.css` e `app.js` na pasta `public/`

Critérios de aceitação:
- As páginas devem abrir em `http://localhost:3000/` e `http://localhost:3000/login.html`.
- Formulários devem enviar requisições para `/api/register` e `/api/login`.

Issue 2 — Modelar usuário e autenticação (POO assistida)
Descrição:
Criar o modelo Mongoose `User` com campos `name`, `email`, `password` e `createdAt`.
- Incluir hashing de senha em `pre('save')` e método `comparePassword`.
- Inserir comentários/copilot explanations no código conforme as instruções do professor.

Critérios de aceitação:
- O `User` deve salvar senhas hasheadas e permitir comparação segura.
- O código deve conter comentários explicativos (Copilot-style) em `models/User.js`.

Issue 3 — Conectar ao MongoDB Atlas
Descrição:
Configurar conexão com MongoDB Atlas usando a variável de ambiente `MONGO_URI`.
- Testar criação de usuário via rota `/api/register`.

Critérios de aceitação:
- Rodar o servidor e verificar que `Connected to MongoDB` aparece no log.
- Registro via frontend cria um documento na coleção `users` no Atlas.

Issue 4 — Fluxo de branches e PR
Descrição:
Criar e trabalhar na branch `staging`. Não commitar direto em `main`.
- Abrir um Pull Request de `staging` para `main` com a descrição: "Esta é a V1 do projeto, pronta para deploy em staging".

Critérios de aceitação:
- Branch `staging` criada localmente e push para origin.
- PR criado no GitHub (não fazer merge ainda).

Issue 5 — Preparar deploy em Vercel e variáveis de ambiente
Descrição:
Configurar o projeto no Vercel, adicionar variáveis de ambiente (`MONGO_URI`) para as branches `staging` (Preview) e `main` (Production).

Critérios de aceitação:
- Projeto importado na Vercel e Preview Deploy criado para `staging`.
- Variáveis de ambiente configuradas na Vercel e o site conecta ao Atlas.

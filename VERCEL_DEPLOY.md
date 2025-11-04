# Guia rápido de deploy na Vercel (em português)

Este guia mostra os passos mínimos para publicar o projeto na Vercel, com atenção nas variáveis de ambiente.

1) Preparar o repositório
- Garanta que o repositório esteja no GitHub com as branches `main` (produção) e `staging` (homologação/preview).

2) Entrar na Vercel e importar o projeto
- Crie uma conta na Vercel e clique em "Import Project" -> "Import Git Repository".
- Selecione o repositório `Tela-de-login`.

3) Configuração de Branches
- Em "Production Branch" deixe `main`.
- A Vercel vai automaticamente criar Preview Deploys para `staging` quando houver pushes.

4) Variáveis de ambiente (Environment Variables / Secrets)
Adicione as seguintes variáveis na seção de Environment Variables da Vercel:

- Key: `MONGO_URI`
  - Value: (a sua string de conexão do MongoDB Atlas, por ex. `mongodb+srv://<user>:<pass>@cluster0...`)
  - Environment: marque *Preview* (para `staging`) e *Production* (para `main`).

Observações:
- No código usamos `process.env.MONGO_URI` (no `server.js`) para conectar ao banco.
- Não suba `.env` para o GitHub; o arquivo `.env` é apenas para desenvolvimento local.

5) Deploy
- Depois de configurar as variáveis, clique em Deploy.
- Para a branch `staging` a Vercel vai gerar um link de Preview (ex: `project-staging.vercel.app`).
- Após a verificação em staging, faça o merge do PR para `main` para disparar o Production Deploy.

6) Testes rápidos após deploy
- Abra o link de staging/production e teste os formulários.
- Verifique nos logs da Vercel se a conexão com o MongoDB foi estabelecida (procure "Connected to MongoDB").

Checklist para a entrega escolar:
- [ ] main como Production Branch
- [ ] staging criada e usada para desenvolvimento
- [ ] Variáveis `MONGO_URI` configuradas para Preview e Production
- [ ] PR de staging -> main criado (sem merge) na Semana 1

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

// Copilot (exemplo de comentário pedido pelo professor):
// Copilot, explique o que acontece aqui:
// 1) dotenv.config();
// 2) app.use(express.json());
// Resposta (resumida):
// 1) dotenv.config() carrega variáveis de ambiente do arquivo .env para process.env.
//    Isso permite manter segredos fora do código fonte.
// 2) app.use(express.json()) registra um middleware que analisa requisições com
//    Content-Type: application/json e popula req.body com um objeto JavaScript.
//    Sem isso, req.body seria undefined para JSON recebidos.

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
// Copilot-style explicação: usamos `process.env.MONGO_URI` para que a string de
// conexão com o MongoDB não fique hardcoded no código. Em ambientes como Vercel
// essa variável é configurada via painel de Environment Variables/Secrets.
const mongoUri = process.env.MONGO_URI || process.env.API_URL || '';
if (!mongoUri) {
  console.warn('Warning: MONGO_URI not set. Database actions will fail until .env is configured.');
}

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.warn('MongoDB connection warning:', err.message));

// Models
const User = require('./models/User');

// Routes
// Rota: registro de usuário
// Copilot-style: Explicação passo a passo (para colar no relatório do professor):
// - Este endpoint espera um POST com JSON { name, email, password }.
// - Validamos se os campos existem; caso falte, retornamos 400 (Bad Request).
// - Checamos se o email já está cadastrado; se sim, retornamos 409 (Conflict).
// - Criamos um novo documento User, que contém um middleware (pre 'save') para
//   hashear a senha antes de gravar no banco (isto é responsabilidade do modelo).
// - Em caso de sucesso retornamos um objeto { success: true }.
// - Erros inesperados são capturados e retornam 500 (Server Error).
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });

    // check existing
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: 'Email already registered' });

    // O `new User(...)` não salva até chamarmos `.save()`; o pre('save') do model
    // cuidará do hash da senha.
    const user = new User({ name, email, password });
    await user.save();
    return res.json({ success: true, message: 'User registered' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Rota: login de usuário
// Copilot-style: Observações úteis para o relatório do professor:
// - Procuramos o usuário pelo email; se não for encontrado, retornamos 401 (Unauthorized).
// - Em seguida usamos o método `comparePassword` do modelo para comparar a senha
//   informada com o hash armazenado. Esse método retorna uma Promise<boolean>.
// - Se a comparação falhar, retornamos 401; se passar, retornamos informações mínimas
//   do usuário (nunca retorne a senha ao cliente).
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Missing fields' });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    // `comparePassword` é um método do schema que encapsula bcrypt.compare
    const valid = await user.comparePassword(password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    return res.json({ success: true, message: 'Login successful', user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Fallback to index.html for SPA-like behaviour
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Copilot-style: Explicações para o relatório do professor
// Copilot, o que é este schema e por que usamos mongoose.Schema?
// Resposta: O schema define a estrutura dos documentos 'User' no MongoDB
// (quais campos existem, tipos e validações). O Mongoose usa esse schema
// para criar o modelo que fornece métodos como findOne, save etc.
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Copilot, por que temos este pre('save') e o que é `this` dentro dele?
// Resposta: O middleware pre('save') é executado antes de um documento ser salvo.
// `this` refere-se ao documento que está sendo salvo (ex: uma instância de User).
// Aqui usamos o hook para gerar um salt e hashear a senha antes de persistir,
// evitando salvar senhas em texto puro.
UserSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

// Copilot, o que faz comparePassword?
// Resposta: É um método de instância que compara a senha enviada pelo usuário
// (texto puro) com o hash armazenado no documento usando bcrypt.compare,
// retornando uma Promise que resolve para true/false.
UserSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model('User', UserSchema);

// app.js: Simple frontend logic to call backend API for register and login
async function postJSON(url, data) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

function showMessage(text, el = document.getElementById('message')) {
  if (!el) return;
  el.textContent = text;
}

document.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form));
  const action = form.id === 'registerForm' ? '/api/register' : '/api/login';
  showMessage('Enviando...');
  try {
    const res = await postJSON(action, data);
    if (res.error) showMessage('Erro: ' + res.error);
    else if (res.success) showMessage(res.message || 'Sucesso!');
    else showMessage('Resposta inesperada');
  } catch (err) {
    console.error(err);
    showMessage('Erro de rede');
  }
});

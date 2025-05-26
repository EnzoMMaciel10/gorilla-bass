const gorilaVidaSpan = document.getElementById('gorilaVida');
const humanosRestantesSpan = document.getElementById('humanosRestantes');
const ataquesFeitosSpan = document.getElementById('ataquesFeitos');
const logDiv = document.getElementById('log');
const campoHumanos = document.getElementById('campoHumanos');
const btnAtacar = document.getElementById('btnAtacar');
const btnDefender = document.getElementById('btnDefender');
const btnCurar = document.getElementById('btnCurar');
const btnRecomecar = document.getElementById('btnRecomecar');

let gorila = {
  vida: 100,
  ataques: 0,
};

let humanos = Array(100).fill(true); // true = vivo

const somAtaque = new Audio('assets/som-ataque.mp3');

function atualizarInterface() {
  gorilaVidaSpan.textContent = gorila.vida;
  humanosRestantesSpan.textContent = humanos.filter(h => h).length;
  ataquesFeitosSpan.textContent = gorila.ataques;
  renderizarHumanos();
  salvarEstado();
}

function renderizarHumanos() {
  campoHumanos.innerHTML = '';
  humanos.forEach((vivo, i) => {
    const img = document.createElement('img');
    img.src = 'assets/humano.png';
    img.classList.add('humano');
    if (!vivo) img.classList.add('morto');
    campoHumanos.appendChild(img);
  });
}

function registrarLog(mensagem) {
  const p = document.createElement('p');
  p.textContent = mensagem;
  logDiv.prepend(p);
}

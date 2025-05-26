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

function atacar() {
  if (humanos.filter(h => h).length === 0) return;
  somAtaque.play();
  let eliminados = 0;
  for (let i = 0; i < humanos.length; i++) {
    if (humanos[i] && eliminados < 3) {
      humanos[i] = false;
      eliminados++;
    }
  }
  gorila.ataques++;
  registrarLog(`Gorila atacou e eliminou ${eliminados} humano(s)!`);
  atualizarInterface();
  verificarFimDeJogo();
}

function defender() {
  gorila.vida -= 1; // Reduz apenas 1 ponto de vida
  registrarLog('Gorila se defendeu e perdeu apenas 1 de vida.');
  atualizarInterface();
  verificarFimDeJogo();
}

function curar() {
  if (gorila.vida < 100) {
    gorila.vida += 10;
    if (gorila.vida > 100) gorila.vida = 100;
    registrarLog('Gorila se curou em 10 pontos!');
    atualizarInterface();
  }
}

function salvarEstado() {
  localStorage.setItem('gorila', JSON.stringify(gorila));
  localStorage.setItem('humanos', JSON.stringify(humanos));
  localStorage.setItem('humanosVivos', humanos.filter(h => h).length);
}

function carregarEstado() {
  const gorilaSalvo = JSON.parse(localStorage.getItem('gorila'));
  const humanosSalvos = JSON.parse(localStorage.getItem('humanos'));
  if (gorilaSalvo && humanosSalvos) {
    gorila = gorilaSalvo;
    humanos = humanosSalvos;
  }
  atualizarInterface();
}

function verificarFimDeJogo() {
  if (gorila.vida <= 0) {
    alert('O gorila foi derrotado!');
    localStorage.clear();
    location.reload();
  }
  if (humanos.filter(h => h).length === 0) {
    alert('Todos os humanos foram eliminados!');
    localStorage.clear();
    location.reload();
  }
}

function recomecarJogo() {
  gorila = { vida: 100, ataques: 0 };
  humanos = Array(100).fill(true);
  localStorage.clear();
  atualizarInterface();
  registrarLog('Jogo reiniciado!');
}

btnAtacar.addEventListener('click', atacar);
btnDefender.addEventListener('click', defender);
btnCurar.addEventListener('click', curar);
btnRecomecar.addEventListener('click', recomecarJogo);

carregarEstado();


setInterval(() => {
  if (Math.random() < 0.4 && gorila.vida > 0) {
    gorila.vida -= 3;
    registrarLog('Os humanos atacaram! Gorila perdeu 3 de vida.');
    atualizarInterface();
    verificarFimDeJogo();
  }
}, 1300);

let indice = 0;

const perguntaEl = document.getElementById("pergunta");
const opcoesEl = document.getElementById("opcoes");
const jumpContainer = document.getElementById("jump-container");
const videoSusto = document.getElementById("videoSusto");
const sonsExtras = [
  document.getElementById("somExtra0"),
  document.getElementById("somExtra1"),
  document.getElementById("somExtra2")
];

const totalSustos = 5; // susto0.mp4 até susto4.mp4

function carregarPergunta() {
  if (indice >= perguntas.length) {
    alert("Quiz finalizado! Parabéns!");
    indice = 0;
    carregarPergunta();
    return;
  }

  const atual = perguntas[indice];
  perguntaEl.textContent = atual.pergunta;
  opcoesEl.innerHTML = "";

  atual.opcoes.forEach(opcao => {
    const btn = document.createElement("button");
    btn.textContent = opcao;
    btn.onclick = () => checarResposta(opcao, atual.correta);
    opcoesEl.appendChild(btn);
  });
}

function checarResposta(resposta, correta) {
  if (resposta === correta) {
    alert("Correto!");
    indice++;
    carregarPergunta();
  } else {
    const qtdVideos = Math.floor(Math.random() * 3) + 1; // 1 a 3 vídeos por erro
    mostrarJumpSustosSequenciais(qtdVideos);
  }
}

// Sequência de jump scares com efeitos macabros
function mostrarJumpSustosSequenciais(qtd) {
  if (qtd <= 0) {
    document.body.classList.remove("pulsar");
    jumpContainer.style.background = "rgba(0,0,0,0)";
    indice++;
    carregarPergunta();
    return;
  }

  // Escolhe vídeo aleatório na pasta Susto/mp4
  const num = Math.floor(Math.random() * totalSustos);
  videoSusto.src = `Susto/mp4/susto${num}.mp4`;

  // Limpa classes e aplica efeitos aleatórios
  videoSusto.className = "";
  document.body.classList.remove("pulsar");

  const efeitos = ["tremor", "pulsar", "glitch"];
  const efeitoAleatorio = efeitos[Math.floor(Math.random() * efeitos.length)];

  if (efeitoAleatorio === "tremor") videoSusto.classList.add("tremor");
  if (efeitoAleatorio === "pulsar") document.body.classList.add("pulsar");
  if (efeitoAleatorio === "glitch") videoSusto.classList.add("glitch");

  // Zoom súbito
  videoSusto.style.transform = "scale(1.5)";

  // Tela escurecendo
  jumpContainer.style.display = "flex";
  jumpContainer.style.background = "rgba(0,0,0,0.9)";

  // Tocar vídeo + som aleatório
  videoSusto.currentTime = 0;
  videoSusto.play();

  const som = sonsExtras[Math.floor(Math.random() * sonsExtras.length)];
  som.currentTime = 0;
  som.play();

  videoSusto.onended = () => {
    jumpContainer.style.display = "none";
    videoSusto.style.transform = "scale(0.5)";
    mostrarJumpSustosSequenciais(qtd - 1);
  };
}

// Inicializa o quiz
carregarPergunta();

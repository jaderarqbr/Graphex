

// =================================================================
// 1. DADOS DO JOGO: 40 Países (Cartas) com 4 Atributos
// =================================================================

const cartas = [
    { nome: "Brasil", imagem: "1.jpg", atributos: { pib: 1600, idh: 0.765, exercito: 360, densidade: 25 } },
    { nome: "Estados Unidos", imagem: "2.jpg", atributos: { pib: 25000, idh: 0.927, exercito: 1350, densidade: 36 } },
    { nome: "China", imagem: "3.jpg", atributos: { pib: 18000, idh: 0.768, exercito: 2000, densidade: 148 } },
    { nome: "Japão", imagem: "4.jpg", atributos: { pib: 4200, idh: 0.925, exercito: 250, densidade: 335 } },
    { nome: "Alemanha", imagem: "5.jpg", atributos: { pib: 4000, idh: 0.947, exercito: 180, densidade: 232 } },
    { nome: "Índia", imagem: "6.jpg", atributos: { pib: 3500, idh: 0.633, exercito: 1450, densidade: 477 } },
    { nome: "Reino Unido", imagem: "7.jpg", atributos: { pib: 3100, idh: 0.929, exercito: 190, densidade: 281 } },
    { nome: "França", imagem: "8.jpg", atributos: { pib: 2900, idh: 0.921, exercito: 205, densidade: 119 } },
    { nome: "Canadá", imagem: "9.jpg", atributos: { pib: 2200, idh: 0.936, exercito: 70, densidade: 4 } },
    { nome: "Austrália", imagem: "10.jpg", atributos: { pib: 1700, idh: 0.938, exercito: 60, densidade: 3 } },
    { nome: "México", imagem: "11.jpg", atributos: { pib: 1400, idh: 0.779, exercito: 290, densidade: 66 } },
    { nome: "Rússia", imagem: "12.jpg", atributos: { pib: 2000, idh: 0.822, exercito: 1150, densidade: 9 } },
    { nome: "Coreia do Sul", imagem: "13.jpg", atributos: { pib: 1800, idh: 0.925, exercito: 550, densidade: 518 } },
    { nome: "Itália", imagem: "14.jpg", atributos: { pib: 2100, idh: 0.895, exercito: 250, densidade: 200 } },
    { nome: "Espanha", imagem: "15.jpg", atributos: { pib: 1500, idh: 0.905, exercito: 130, densidade: 93 } },
    { nome: "Indonésia", imagem: "16.jpg", atributos: { pib: 1200, idh: 0.705, exercito: 400, densidade: 142 } },
    { nome: "Turquia", imagem: "17.jpg", atributos: { pib: 850, idh: 0.838, exercito: 425, densidade: 110 } },
    { nome: "Holanda", imagem: "18.jpg", atributos: { pib: 990, idh: 0.941, exercito: 50, densidade: 517 } },
    { nome: "Arábia Saudita", imagem: "19.jpg", atributos: { pib: 1100, idh: 0.875, exercito: 225, densidade: 17 } },
    { nome: "Suíça", imagem: "20.jpg", atributos: { pib: 900, idh: 0.967, exercito: 30, densidade: 214 } },
    { nome: "Suécia", imagem: "21.jpg", atributos: { pib: 630, idh: 0.945, exercito: 20, densidade: 25 } },
    { nome: "Bélgica", imagem: "22.jpg", atributos: { pib: 600, idh: 0.937, exercito: 45, densidade: 380 } },
    { nome: "África do Sul", imagem: "23.jpg", atributos: { pib: 400, idh: 0.713, exercito: 80, densidade: 49 } },
    { nome: "Nigéria", imagem: "24.jpg", atributos: { pib: 500, idh: 0.539, exercito: 200, densidade: 226 } },
    { nome: "Egito", imagem: "25.jpg", atributos: { pib: 470, idh: 0.731, exercito: 440, densidade: 104 } },
    { nome: "Tailândia", imagem: "26.jpg", atributos: { pib: 550, idh: 0.800, exercito: 300, densidade: 136 } },
    { nome: "Argentina", imagem: "27.jpg", atributos: { pib: 450, idh: 0.842, exercito: 85, densidade: 16 } },
    { nome: "Polônia", imagem: "28.jpg", atributos: { pib: 700, idh: 0.876, exercito: 120, densidade: 123 } },
    { nome: "Colômbia", imagem: "29.jpg", atributos: { pib: 350, idh: 0.752, exercito: 280, densidade: 45 } },
    { nome: "Chile", imagem: "30.jpg", atributos: { pib: 300, idh: 0.855, exercito: 80, densidade: 25 } },
    { nome: "Peru", imagem: "31.jpg", atributos: { pib: 250, idh: 0.777, exercito: 110, densidade: 26 } },
    { nome: "Grécia", imagem: "32.jpg", atributos: { pib: 220, idh: 0.893, exercito: 105, densidade: 83 } },
    { nome: "Finlândia", imagem: "33.jpg", atributos: { pib: 300, idh: 0.940, exercito: 25, densidade: 18 } },
    { nome: "Nova Zelândia", imagem: "34.jpg", atributos: { pib: 280, idh: 0.937, exercito: 15, densidade: 18 } },
    { nome: "Portugal", imagem: "35.jpg", atributos: { pib: 260, idh: 0.866, exercito: 40, densidade: 111 } },
    { nome: "Emirados Árabes Unidos", imagem: "36.jpg", atributos: { pib: 500, idh: 0.911, exercito: 65, densidade: 140 } },
    { nome: "Vietnã", imagem: "37.jpg", atributos: { pib: 400, idh: 0.703, exercito: 500, densidade: 300 } },
    { nome: "Ucrânia", imagem: "38.jpg", atributos: { pib: 150, idh: 0.779, exercito: 600, densidade: 73 } },
    { nome: "Singapura", imagem: "39.jpg", atributos: { pib: 450, idh: 0.939, exercito: 70, densidade: 8358 } }, 
    { nome: "Mongólia", imagem: "40.jpg", atributos: { pib: 17, idh: 0.737, exercito: 25, densidade: 2 } }
];

const atributos = ['pib', 'idh', 'exercito', 'densidade'];
const MAX_DISCARDS = 20; // Parâmetro de derrota: 20 cartas descartadas

// =================================================================
// 2. VARIÁVEIS DE ESTADO E REFERÊNCIAS DOM
// =================================================================

let atributoSorteado = null;
let carta1 = null;
let carta2 = null;
let isChallengeCompleted = false;
let winnerCard = null; 
let discardCount = { blue: 0, red: 0 }; 

const dom = {
    atributoDisplay: document.getElementById('atributo-sorteado'),
    btnSortearAtributo: document.getElementById('sortear-atributo'),
    btnSortearCartas: document.getElementById('sortear-cartas'),
    btnChallenge: document.getElementById('challenge'),
    btnDiscardWinner: document.getElementById('discard-winner'), 
    card1Div: document.getElementById('card-1'),
    card2Div: document.getElementById('card-2'),
    image1: document.getElementById('image-1'),
    image2: document.getElementById('image-2'),
    scoreBlue: document.getElementById('score-blue'), 
    scoreRed: document.getElementById('score-red'),   
};

// =================================================================
// 3. FUNÇÕES DE EXIBIÇÃO E LÓGICA
// =================================================================

/**
 * Formata os valores de exibição.
 */
function formatValue(key, value) {
    if (key === 'pib') return `${value.toLocaleString('pt-BR')} Bi USD`;
    if (key === 'exercito') return `${value.toLocaleString('pt-BR')} Mil Pessoal`;
    if (key === 'densidade') return `${value.toLocaleString('pt-BR')} Hab/km²`;
    return value; 
}

/**
 * Atualiza o placar de descarte no DOM e checa condição de derrota.
 */
function updateScoreDisplay() {
    dom.scoreBlue.textContent = discardCount.blue;
    dom.scoreRed.textContent = discardCount.red;
    
    // Checagem de Fim de Jogo
    if (discardCount.blue >= MAX_DISCARDS) {
        alert(`FIM DE JOGO! O Time Azul atingiu ${MAX_DISCARDS} descartes. Time Vermelho VENCEU!`);
        dom.btnSortearAtributo.disabled = true; 
        dom.btnDiscardWinner.disabled = true;
    } else if (discardCount.red >= MAX_DISCARDS) {
        alert(`FIM DE JOGO! O Time Vermelho atingiu ${MAX_DISCARDS} descartes. Time Azul VENCEU!`);
        dom.btnSortearAtributo.disabled = true; 
        dom.btnDiscardWinner.disabled = true;
    }
}

/**
 * Limpa os estilos e reseta o estado da mesa.
 */
function resetGame() {
    dom.card1Div.classList.remove('winner', 'loser');
    dom.card2Div.classList.remove('winner', 'loser');
    isChallengeCompleted = false;
    winnerCard = null;
    
    dom.btnChallenge.disabled = true;
    dom.btnDiscardWinner.disabled = true; 

    // Limpa exibição da carta
    displayCard(null, 1);
    displayCard(null, 2);
    
    // Configura os placeholders
    dom.image1.src = 'placeholder_blue.jpg';
    dom.image2.src = 'placeholder_red.jpg';
    
    atributoSorteado = null;
    dom.atributoDisplay.innerHTML = "Atributo para o Desafio: <strong>Aguardando Sorteio</strong>";
    
    // Habilita o botão principal se o jogo não tiver terminado
    if (discardCount.blue < MAX_DISCARDS && discardCount.red < MAX_DISCARDS) {
        dom.btnSortearAtributo.disabled = false;
    }
    dom.btnSortearCartas.disabled = true;
    
    updateScoreDisplay(); 
}

/**
 * Exibe os dados de uma carta no DOM.
 */
function displayCard(carta, num) {
    const cardDiv = document.getElementById(`card-${num}`);
    
    cardDiv.querySelectorAll('.stats p').forEach(p => {
        p.style.fontWeight = 'normal';
        p.style.backgroundColor = 'transparent';
    });
    
    const cardImageElement = num === 1 ? dom.image1 : dom.image2;

    if (!carta) {
        cardDiv.querySelector('h2').textContent = `Carta ${num}`;
        cardDiv.querySelectorAll('.stats p').forEach(p => {
            const key = p.id.split('-')[0];
            p.textContent = `${key.toUpperCase()}: -`;
        });
        return;
    }

    cardDiv.querySelector('h2').textContent = carta.nome;
    cardImageElement.src = carta.imagem; 

    atributos.forEach(key => {
        const pElement = document.getElementById(`${key}-${num}`);
        const value = carta.atributos[key];
        pElement.textContent = `${key.toUpperCase()}: ${formatValue(key, value)}`;
    });
    
    if (atributoSorteado) {
        const pElement = document.getElementById(`${atributoSorteado}-${num}`);
        pElement.style.fontWeight = 'bold';
        pElement.style.backgroundColor = '#ffffcc'; 
    }
}


/**
 * Sorteia o atributo de comparação e atualiza o DOM.
 */
function sortearAtributo() {
    resetGame(); 
    
    const randomIndex = Math.floor(Math.random() * atributos.length);
    atributoSorteado = atributos[randomIndex];
    
    dom.atributoDisplay.innerHTML = `Atributo para o Desafio: <strong>${atributoSorteado.toUpperCase()}</strong>`;
    
    dom.btnSortearCartas.disabled = false;
    dom.btnSortearAtributo.disabled = true; 
}

/**
 * Sorteia duas cartas diferentes.
 */
function sortearCartas() {
    dom.card1Div.classList.remove('winner', 'loser');
    dom.card2Div.classList.remove('winner', 'loser');
    isChallengeCompleted = false;
    winnerCard = null; 

    let index1 = Math.floor(Math.random() * cartas.length);
    let index2;

    do {
        index2 = Math.floor(Math.random() * cartas.length);
    } while (index1 === index2);

    carta1 = cartas[index1];
    carta2 = cartas[index2];

    displayCard(carta1, 1);
    displayCard(carta2, 2);

    dom.btnChallenge.disabled = false;
    dom.btnSortearCartas.disabled = true; 
}

/**
 * Compara as cartas no atributo sorteado e determina o vencedor.
 */
function challenge() {
    if (!atributoSorteado || !carta1 || !carta2 || isChallengeCompleted) {
        return;
    }

    isChallengeCompleted = true;
    dom.btnChallenge.disabled = true;
    dom.btnDiscardWinner.disabled = false; 

    const valor1 = parseFloat(carta1.atributos[atributoSorteado]);
    const valor2 = parseFloat(carta2.atributos[atributoSorteado]);

    if (valor1 > valor2) {
        dom.card1Div.classList.add('winner');
        dom.card2Div.classList.add('loser');
        winnerCard = 1; 
    } else if (valor2 > valor1) {
        dom.card2Div.classList.add('winner');
        dom.card1Div.classList.add('loser');
        winnerCard = 2;
    } else {
        alert('Empate! Ninguém descarta uma carta.');
        dom.card1Div.classList.add('loser');
        dom.card2Div.classList.add('loser');
        dom.btnDiscardWinner.disabled = true; 
    }
}

/**
 * Incrementa o placar do perdedor e prepara para o próximo round.
 */
function discardCard() {
    if (!winnerCard) return;

    if (winnerCard === 1) {
        // Azul venceu, Vermelho descarta
        discardCount.red++;
    } 
    else if (winnerCard === 2) {
        // Vermelho venceu, Azul descarta
        discardCount.blue++;
    }

    // Volta ao início do round
    resetGame(); 
}

// =================================================================
// 4. LISTENERS DE EVENTOS E INICIALIZAÇÃO
// =================================================================

dom.btnSortearAtributo.addEventListener('click', sortearAtributo);
dom.btnSortearCartas.addEventListener('click', sortearCartas);
dom.btnChallenge.addEventListener('click', challenge);
dom.btnDiscardWinner.addEventListener('click', discardCard); 

// Inicia o jogo
resetGame();
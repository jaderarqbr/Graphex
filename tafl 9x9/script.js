
const boardElement = document.getElementById('board');
const piecesStockElement = document.getElementById('pieces-stock');
const boardSize = 9;
let draggedElement = null;
let isDraggingFromStock = false; // Flag para saber se estamos arrastando do estoque

// Função para criar o tabuleiro
function createBoard() {
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const square = document.createElement('div');
            square.classList.add('square');
            // Alterna cores para um efeito de xadrez
            if ((row + col) % 2 === 0) {
                square.classList.add('light');
            } else {
                square.classList.add('dark');
            }
            square.dataset.row = row;
            square.dataset.col = col;

            // Adicionar os listeners de evento para as casas do tabuleiro
            square.addEventListener('dragenter', handleDragEnter);
            square.addEventListener('dragleave', handleDragLeave);
            square.addEventListener('drop', handleDrop);
            square.addEventListener('dragover', handleDragOver);

            boardElement.appendChild(square);
        }
    }
}

// Função para adicionar os listeners de drag nos elementos de estoque
function addStockDragListeners() {
    const pieceContainers = document.querySelectorAll('.piece-container');
    pieceContainers.forEach(container => {
        // Adiciona listener ao container para capturar o arrasto
        container.addEventListener('dragstart', handleStockDragStart);
        container.addEventListener('dragend', handleDragEnd);
    });
}

// Manipula o início do arrasto de uma peça DO ESTOQUE
function handleStockDragStart(e) {
    // O elemento arrastado pode ser o container ou a peça dentro dele
    if (e.target.classList.contains('piece')) {
        draggedElement = e.target; // A peça em si
        isDraggingFromStock = true;
        e.dataTransfer.effectAllowed = 'copy'; // Permite copiar
        e.dataTransfer.setData('text/plain', null); // Necessário para Firefox

        setTimeout(() => {
            draggedElement.style.opacity = '0.5';
        }, 0);
    } else if (e.target.classList.contains('piece-container')) {
        // Se o container foi arrastado, encontramos a peça dentro dele
        const pieceInside = e.target.querySelector('.piece');
        if (pieceInside) {
            draggedElement = pieceInside;
            isDraggingFromStock = true;
            e.dataTransfer.effectAllowed = 'copy';
            e.dataTransfer.setData('text/plain', null);
            setTimeout(() => {
                draggedElement.style.opacity = '0.5';
            }, 0);
        }
    }
}

// Manipula o início do arrasto de uma peça JÁ NO TABULEIRO
function handleBoardPieceDragStart(e) {
    if (e.target.classList.contains('piece')) {
        draggedElement = e.target; // A peça em si
        isDraggingFromStock = false; // Arrastando de dentro do tabuleiro
        e.dataTransfer.effectAllowed = 'move'; // Permite mover
        e.dataTransfer.setData('text/plain', null);
        setTimeout(() => {
            draggedElement.style.opacity = '0.5';
        }, 0);
    }
}

// Manipula o fim do arrasto (comum para ambos os casos)
function handleDragEnd() {
    if (draggedElement) {
        draggedElement.style.opacity = '1'; // Restaura a opacidade
    }
    draggedElement = null;
    isDraggingFromStock = false;
    // Limpa quaisquer indicações de drag-over
    document.querySelectorAll('.drag-over').forEach(sq => sq.classList.remove('drag-over'));
}

// Manipula a entrada de um elemento arrastado sobre uma casa do tabuleiro
function handleDragEnter(e) {
    e.preventDefault(); // Previne o comportamento padrão do navegador
    if (e.target.classList.contains('square')) {
        e.target.classList.add('drag-over');
    }
}

// Manipula a saída de um elemento arrastado de uma casa do tabuleiro
function handleDragLeave(e) {
    if (e.target.classList.contains('square')) {
        e.target.classList.remove('drag-over');
    }
}

// Manipula o evento de soltar um elemento em uma casa do tabuleiro
function handleDrop(e) {
    e.preventDefault();
    if (e.target.classList.contains('square')) {
        const targetSquare = e.target;

        if (draggedElement) {
            const pieceType = draggedElement.dataset.type;
            const pieceColor = draggedElement.dataset.color;

            if (isDraggingFromStock) {
                // --- LÓGICA DE REPLICAÇÃO (quando arrasta do estoque) ---
                if (targetSquare.children.length === 0) { // Só adiciona se a casa estiver vazia
                    const newPiece = document.createElement('div');
                    newPiece.classList.add('piece'); // Classe base
                    
                    if (pieceType === 'king') {
                        newPiece.classList.add('king');
                        newPiece.textContent = '♔'; // Símbolo do Rei Branco
                    } else { // É um peão
                        newPiece.classList.add('pawn');
                        if (pieceColor === 'white') {
                            newPiece.classList.add('white'); // Adiciona classe 'white'
                            newPiece.textContent = '♙'; // Símbolo do Peão Branco
                        } else { // É um peão preto
                            newPiece.classList.add('black'); // Adiciona classe 'black'
                            newPiece.textContent = '♟'; // Símbolo do Peão Preto
                        }
                    }
                    newPiece.setAttribute('draggable', true);
                    newPiece.dataset.type = pieceType;
                    newPiece.dataset.color = pieceColor;

                    // Adiciona os listeners de drag/drop para a NOVA peça criada no tabuleiro
                    newPiece.addEventListener('dragstart', handleBoardPieceDragStart);
                    newPiece.addEventListener('dragend', handleDragEnd);

                    targetSquare.appendChild(newPiece);
                }
            } else {
                // --- LÓGICA DE MOVIMENTO (quando arrasta de dentro do tabuleiro) ---
                // Verifica se a peça está sendo movida para uma casa vazia
                if (targetSquare.children.length === 0) {
                    targetSquare.appendChild(draggedElement);
                } else {
                    // Se a casa não estiver vazia, a peça arrastada volta para a origem
                    // (Implemente lógica de captura aqui se desejar futuramente)
                    console.log("Casa não está vazia! Peça retornou à origem.");
                    // A peça arrastada não é movida, ela retorna ao seu estado original
                }
            }
            // Limpa o elemento arrastado e a flag
            draggedElement = null;
            isDraggingFromStock = false;
        }
    }
    // Limpa qualquer marcação de drag-over
    document.querySelectorAll('.drag-over').forEach(sq => sq.classList.remove('drag-over'));
}

// Manipula o evento de "drag over" sobre uma casa do tabuleiro
function handleDragOver(e) {
    e.preventDefault(); // Necessário para permitir o drop
    if (e.target.classList.contains('square')) {
        e.target.classList.add('drag-over');
    }
}

// Função para inicializar os listeners de drag nas peças DENTRO do tabuleiro
function addBoardPieceDragListeners() {
    document.querySelectorAll('.square .piece').forEach(piece => {
        // Certifica-se de não adicionar listeners duplicados se a peça já existir
        if (!piece.dataset.dragListenersAdded) {
            piece.addEventListener('dragstart', handleBoardPieceDragStart);
            piece.addEventListener('dragend', handleDragEnd);
            piece.dataset.dragListenersAdded = 'true'; // Marca que os listeners foram adicionados
        }
    });
}

// Inicializa o jogo
createBoard();
addStockDragListeners(); // Adiciona listeners para as peças no estoque inicial

// As peças dentro do tabuleiro ganham listeners de drag quando são movidas para lá
// (Isso é tratado no handleDrop ao adicionar a nova peça ou mover uma existente)

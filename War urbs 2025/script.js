
const boardElement = document.getElementById('board');
const piecesListElement = document.getElementById('pieces-list');
const removeAreaElement = document.getElementById('remove-area').querySelector('.drop-target-area');
const resetButton = document.getElementById('reset-button');

const boardSize = 15;
let draggedPiece = null;

const pieceConfig = {
    'king_w': { color: 'white', src: 'pieces/white_king.png' },
     'rook_w': { color: 'white', src: 'pieces/white_rook.png' },
     'rook_r': { color: 'white', src: 'pieces/white_phant.png' },
    'knight_w': { color: 'white', src: 'pieces/white_knight.png' },
    'bishop_w': { color: 'white', src: 'pieces/white_bishop.png' },
 'bishop_r': { color: 'white', src: 'pieces/b_phant.png' },
    'queen_w': { color: 'white', src: 'pieces/white_queen.png' },
  
    'pawn_w': { color: 'white', src: 'pieces/white_pawn.png' },
'queen_b': { color: 'black', src: 'pieces/black_queen.png' },
 'bishop_b': { color: 'black', src: 'pieces/black_bishop.png' },
 'bishop_r': { color: 'black', src: 'pieces/blue_king.png' },

 
'queen_r': { color: 'white', src: 'pieces/red_phant.png' },
 'knight_r': { color: 'black', src: 'pieces/red_horse.png' },
'king_r': { color: 'white', src: 'pieces/red_king.png' },
'pawn': { color: 'white', src: 'pieces/red_pawn.png' },
 'rook': { color: 'black', src: 'pieces/red_rook.png' },
   'pawn_r': { color: 'white', src: 'pieces/black_phant.png' },
    'king_b': { color: 'black', src: 'pieces/black_king.png' },
    'rook_b': { color: 'black', src: 'pieces/black_rook.png' },
    'knight_b': { color: 'black', src: 'pieces/black_knight.png' },
  

    'pawn_b': { color: 'black', src: 'pieces/black_pawn.png' }
};

function createBoard() {
    boardElement.innerHTML = '';
    boardElement.style.gridTemplateColumns = `repeat(${boardSize}, 60px)`;
    boardElement.style.gridTemplateRows = `repeat(${boardSize}, 60px)`;

    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const square = document.createElement('div');
            square.classList.add('square');
            if ((row + col) % 2 === 0) {
                square.classList.add('light');
            } else {
                square.classList.add('dark');
            }
            square.dataset.row = row;
            square.dataset.col = col;

            square.addEventListener('dragover', handleDragOver);
            square.addEventListener('dragleave', handleDragLeave);
            square.addEventListener('drop', handleDrop);
            
            boardElement.appendChild(square);
        }
    }
}

function createPieceSelector() {
    piecesListElement.innerHTML = '';
    for (const pieceKey in pieceConfig) {
        const pieceData = pieceConfig[pieceKey];
        const pieceOption = document.createElement('div');
        pieceOption.classList.add('piece-option');
        pieceOption.dataset.pieceType = pieceKey;
        
        const pieceImg = document.createElement('img');
        pieceImg.src = pieceData.src;
        pieceImg.alt = pieceKey.replace('_', ' ');
        pieceImg.draggable = true;
        pieceImg.classList.add('piece-img');

        pieceOption.appendChild(pieceImg);
        piecesListElement.appendChild(pieceOption);

        pieceImg.addEventListener('dragstart', handlePieceOptionDragStart);
    }
}

// --- Funções de Drag and Drop ---

function handlePieceOptionDragStart(e) {
    e.stopPropagation();
    draggedPiece = e.target;
    draggedPiece.isFromSelector = true;
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('text/plain', null);
    setTimeout(() => {
        draggedPiece.style.opacity = '0.5';
    }, 0);
}

function handleBoardPieceDragStart(e) {
    e.stopPropagation();
    draggedPiece = e.target;
    draggedPiece.isFromSelector = false;
    draggedPiece.originalSquare = e.target.parentElement;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', null);
    setTimeout(() => {
        draggedPiece.style.opacity = '0.5';
    }, 0);
}

function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    const targetElement = e.target.closest('.square') || e.target.closest('.drop-target-area');
    if (targetElement) {
        targetElement.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    e.stopPropagation();
    const targetElement = e.target.closest('.square') || e.target.closest('.drop-target-area');
    if (targetElement) {
        targetElement.classList.remove('drag-over');
    }
}

function handleDrop(e) {
    e.preventDefault();
    if (!draggedPiece) {
        return;
    }

    const targetSquare = e.target.closest('.square');
    const targetRemoveArea = e.target.closest('.drop-target-area');
    
    // 1. Soltar em uma casa do tabuleiro
    if (targetSquare) {
        targetSquare.classList.remove('drag-over');
        if (draggedPiece.isFromSelector) {
            if (targetSquare.children.length === 0) {
                const newPieceImg = document.createElement('img');
                newPieceImg.src = draggedPiece.src;
                newPieceImg.classList.add('piece-img');
                newPieceImg.dataset.pieceType = draggedPiece.dataset.pieceType;
                newPieceImg.draggable = true;
                newPieceImg.addEventListener('dragstart', handleBoardPieceDragStart);
                targetSquare.appendChild(newPieceImg);
            } else {
                console.log("Casa ocupada! Peça não adicionada.");
            }
        } else {
            const originalSquare = draggedPiece.originalSquare;
            if (targetSquare.children.length === 0 && targetSquare !== originalSquare) {
                targetSquare.appendChild(draggedPiece);
            } else {
                console.log("Casa de destino ocupada ou inválida. Peça retorna à origem.");
                originalSquare.appendChild(draggedPiece);
            }
        }
    }
    // 2. Soltar na área de remoção
    else if (targetRemoveArea) {
        targetRemoveArea.classList.remove('drag-over');
        if (!draggedPiece.isFromSelector) {
            const originalSquare = draggedPiece.originalSquare;
            originalSquare.removeChild(draggedPiece);
            console.log("Peça removida do tabuleiro.");
        } else {
            console.log("Não é possível remover peças do seletor. Elas retornam ao local de origem.");
        }
    }

    // Limpa o estado de arrasto
    if(draggedPiece) {
      draggedPiece.style.opacity = '1';
    }
    draggedPiece = null;
}

// --- Botão de Reset ---
function resetBoard() {
    createBoard();
    createPieceSelector();
}

function rollDice(type) {
    let result;
    let diceElement;
    let unitMapping = [
        "Pistola", "UZI", "AK47", // Mais chance de Infantaria
"Morteiro" ,"Bazooka"   ,// Ou outra unidade especial
        "Carro", "Navio",
        ".30",
        "Helicóptero",
        
    ];

    switch (type) {
        case 'unit':
            result = Math.floor(Math.random() * 10); // 0-9 para o array
            diceElement = document.getElementById('unitDice');
            diceElement.textContent = unitMapping[result]; // Mostra o nome da unidade
            break;
        case 'air':
            result = Math.floor(Math.random() * 8) + 1;
            diceElement = document.getElementById('airDice');
            diceElement.textContent = result;
            break;
        case 'navy':
            result = Math.floor(Math.random() * 6) + 1;
            diceElement = document.getElementById('navyDice');
            diceElement.textContent = result;
            break;
        case 'army':
            result = Math.floor(Math.random() * 4) + 1;
            diceElement = document.getElementById('armyDice');
            diceElement.textContent = result;
            break;
    }

    // Animação de "giro"
    if (diceElement) {
        diceElement.style.transform = 'rotateY(360deg)';
        setTimeout(() => {
            diceElement.style.transform = 'rotateY(0deg)';
        }, 100); // Rápida rotação para simular o giro
    }
}
// --- Inicialização ---
createBoard();
createPieceSelector();
resetButton.addEventListener('click', resetBoard);
removeAreaElement.addEventListener('dragover', handleDragOver);
removeAreaElement.addEventListener('dragleave', handleDragLeave);
removeAreaElement.addEventListener('drop', handleDrop);

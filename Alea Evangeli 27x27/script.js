
const boardElement = document.getElementById('board');
const piecesStockElement = document.getElementById('pieces-stock');
const removeAreaElement = document.getElementById('remove-area');
const boardSize = 27;
let draggedElement = null;
let isDraggingFromStock = false;
let isDraggingToBoard = false;

function createBoard() {
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

            square.addEventListener('dragenter', handleDragEnter);
            square.addEventListener('dragleave', handleDragLeave);
            square.addEventListener('drop', handleDrop);
            square.addEventListener('dragover', handleDragOver);

            boardElement.appendChild(square);
        }
    }
}

function addStockDragListeners() {
    const pieceContainers = document.querySelectorAll('.piece-container');
    pieceContainers.forEach(container => {
        container.addEventListener('dragstart', handleStockDragStart);
        container.addEventListener('dragend', handleDragEnd);
    });
}

function addRemoveAreaListeners() {
    const dropTargetArea = removeAreaElement.querySelector('.drop-target-area');
    dropTargetArea.addEventListener('dragenter', handleRemoveDragEnter);
    dropTargetArea.addEventListener('dragleave', handleRemoveDragLeave);
    dropTargetArea.addEventListener('drop', handleDrop); // Usa a função handleDrop principal
    dropTargetArea.addEventListener('dragover', handleRemoveDragOver);
}


function handleStockDragStart(e) {
    if (e.target.classList.contains('piece')) {
        draggedElement = e.target;
        isDraggingFromStock = true;
        isDraggingToBoard = false;
        e.dataTransfer.effectAllowed = 'copy';
        e.dataTransfer.setData('text/plain', null);
        setTimeout(() => { draggedElement.style.opacity = '0.5'; }, 0);
    } else if (e.target.classList.contains('piece-container')) {
        const pieceInside = e.target.querySelector('.piece');
        if (pieceInside) {
            draggedElement = pieceInside;
            isDraggingFromStock = true;
            isDraggingToBoard = false;
            e.dataTransfer.effectAllowed = 'copy';
            e.dataTransfer.setData('text/plain', null);
            setTimeout(() => { draggedElement.style.opacity = '0.5'; }, 0);
        }
    }
}

function handleBoardPieceDragStart(e) {
    if (e.target.classList.contains('piece')) {
        draggedElement = e.target;
        isDraggingFromStock = false;
        isDraggingToBoard = true;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', null);
        setTimeout(() => { draggedElement.style.opacity = '0.5'; }, 0);
    }
}

function handleDragEnd() {
    if (draggedElement) {
        draggedElement.style.opacity = '1';
    }
    draggedElement = null;
    isDraggingFromStock = false;
    isDraggingToBoard = false;
    
    document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
}

function handleDragEnter(e) {
    e.preventDefault();
    if (e.target.classList.contains('square')) {
        e.target.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    if (e.target.classList.contains('square')) {
        e.target.classList.remove('drag-over');
    }
}

function handleDragOver(e) {
    e.preventDefault();
    if (e.target.classList.contains('square')) {
        e.target.classList.add('drag-over');
    }
}

function handleRemoveDragEnter(e) {
    e.preventDefault();
    if (e.target.classList.contains('drop-target-area')) {
        e.target.classList.add('drag-over');
    }
}

function handleRemoveDragLeave(e) {
    if (e.target.classList.contains('drop-target-area')) {
        e.target.classList.remove('drag-over');
    }
}

function handleRemoveDragOver(e) {
    e.preventDefault();
    if (e.target.classList.contains('drop-target-area')) {
        e.target.classList.add('drag-over');
    }
}

function handleDrop(e) {
    e.preventDefault();
    
    if (!draggedElement) {
        return; 
    }

    const pieceType = draggedElement.dataset.type;
    const pieceColor = draggedElement.dataset.color;

    if (e.target.classList.contains('square')) {
        const targetSquare = e.target;

        if (isDraggingFromStock) {
            if (targetSquare.children.length === 0) {
                const newPiece = document.createElement('div');
                newPiece.classList.add('piece');
                if (pieceType === 'king') {
                    newPiece.classList.add('king');
                    newPiece.textContent = '♔';
                } else {
                    newPiece.classList.add('pawn');
                    if (pieceColor === 'white') {
                        newPiece.classList.add('white');
                        newPiece.textContent = '♙';
                    } else {
                        newPiece.classList.add('black');
                        newPiece.textContent = '♟';
                    }
                }
                newPiece.setAttribute('draggable', true);
                newPiece.dataset.type = pieceType;
                newPiece.dataset.color = pieceColor;

                newPiece.addEventListener('dragstart', handleBoardPieceDragStart);
                newPiece.addEventListener('dragend', handleDragEnd);
                targetSquare.appendChild(newPiece);
            }
        } 
        else if (isDraggingToBoard) {
            if (targetSquare.children.length === 0) {
                targetSquare.appendChild(draggedElement);
            } else {
                console.log("Casa não está vazia! Peça retornou à origem.");
            }
        }
    } 
    else if (e.target.classList.contains('drop-target-area')) {
        if (draggedElement && !isDraggingFromStock) {
            draggedElement.remove();
            console.log("Peça removida.");
        } else if (draggedElement && isDraggingFromStock) {
            console.log("Não é possível remover peças do estoque diretamente.");
        }
    }

    draggedElement = null;
    isDraggingFromStock = false;
    isDraggingToBoard = false;
    document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
}

createBoard();
addStockDragListeners();
addRemoveAreaListeners();


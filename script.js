document.getElementById('start-button').addEventListener('click', startGame);

let gridSize = 2;
let score = 0;

function startGame() {
    score = 0;
    gridSize = 2;
    updateScore();
    createGrid();
}

function createGrid() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    
    const baseColor = randomColor();
    const differentColor = slightlyDifferentColor(baseColor);
    const differentTileIndex = Math.floor(Math.random() * gridSize * gridSize);

    for (let i = 0; i < gridSize * gridSize; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.style.backgroundColor = i === differentTileIndex ? differentColor : baseColor;
        tile.addEventListener('click', () => {
            if (i === differentTileIndex) {
                score++;
                if (score % 3 === 0) {
                    gridSize++;
                }
                updateScore();
                createGrid();
            } else {
                alert('Game Over! Your score is ' + score);
                startGame();
            }
        });
        gameBoard.appendChild(tile);
    }
}

function updateScore() {
    document.getElementById('score').textContent = score;
}

function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function slightlyDifferentColor(color) {
    const colorComponents = color.match(/\d+/g).map(Number);
    const r = Math.min(255, colorComponents[0] + Math.floor(Math.random() * 20) - 10);
    const g = Math.min(255, colorComponents[1] + Math.floor(Math.random() * 20) - 10);
    const b = Math.min(255, colorComponents[2] + Math.floor(Math.random() * 20) - 10);
    return `rgb(${r}, ${g}, ${b})`;
}
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//Grid Size for movement
//Divide the 400x400 canvas into 20x20 cells
const GRID_SIZE = 20;

//Initial snake position and segments
let snake = {
    x: 0,
    y: 0,
    dx: GRID_SIZE, // movement in x direction
    dy: 0,         // movement in y direction 
    cells: [],     // array to store snake segments
    maxCells: 4    // initial length
}

function gameLoop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    requestAnimationFrame(gameLoop);
}

gameLoop();
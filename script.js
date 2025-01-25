const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//Grid Size for movement
//Divide the 400x400 canvas into 20x20 cells
const GRID_SIZE = 20;
let lastTime = 0;
const GAME_SPEED = 1000 / 10; // 10 frames per second

//Initial snake position and segments
let snake = {
    x: Math.floor(canvas.width/2/GRID_SIZE) * GRID_SIZE,
    y: Math.floor(canvas.height/2/GRID_SIZE) * GRID_SIZE,
    dx: GRID_SIZE, // movement in x direction
    dy: 0,         // movement in y direction 
    cells: [],     // array to store snake segments
    maxCells: 4    // initial length
}

snake.cells.push({x: snake.x, y: snake.y});

function moveSnake(){
    //Update snake's position
    snake.x += snake.dx;
    snake.y += snake.dy;

    //Canvas boundaries
    if(snake.x >= canvas.width){
        snake.x = 0;
    }else if(snake.x < 0){
        snake.x = canvas.width - GRID_SIZE;
    }

    if(snake.y >= canvas.height){
        snake.y = 0;
    }
    else if(snake.y < 0){
        snake.y = canvas.height - GRID_SIZE;
    }

    //Add new head position to beginning of cells array
    snake.cells.unshift({ x: snake.x, y: snake.y });

    //Remove tail if snake length exceeds maxCells
    if (snake.cells.length > snake.maxCells){
        snake.cells.pop();
    }
}

function gameLoop(currentTime){
    if(lastTime === 0){
        lastTime = currentTime;
    }

    if(currentTime - lastTime >= GAME_SPEED){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        moveSnake();

        // Draw snake segments
        ctx.fillStyle = 'green';
        snake.cells.forEach(cell => {
            ctx.fillRect(cell.x, cell.y, GRID_SIZE-1, GRID_SIZE-1);
        })

        lastTime = currentTime;
    }

    requestAnimationFrame(gameLoop);
}

gameLoop(0);
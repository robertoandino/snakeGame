const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//Grid Size for movement
//Divide the 400x400 canvas into 20x20 cells
const GRID_SIZE = 20;
let lastTime = 0;
const GAME_SPEED = 1000 / 10; // 10 frames per second

//Initial snake position and segments
let snake = {
    //x and y for position, dx and dy for movement direction
    x: Math.floor(canvas.width/2/GRID_SIZE) * GRID_SIZE,
    y: Math.floor(canvas.height/2/GRID_SIZE) * GRID_SIZE,
    dx: GRID_SIZE, // movement in x direction
    dy: 0,         // movement in y direction 
    cells: [],     // array to store body snake segments
    maxCells: 4    // initial length of snake
}

snake.cells.push({x: snake.x, y: snake.y});

function moveSnake(){
    //Update snake's position by adding direction values
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

    //Remove tail if snake length exceeds maxCells (snake is too long)
    if (snake.cells.length > snake.maxCells){
        snake.cells.pop();
    }
}

function gameLoop(currentTime){
    if(lastTime === 0){
        lastTime = currentTime;
    }

    //Controls game speed using time difference
    if(currentTime - lastTime >= GAME_SPEED){
        //Clear previous frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //Move snake
        moveSnake();

        // Draw snake segments as black square
        ctx.fillStyle = 'gray';
        snake.cells.forEach(cell => {
            ctx.fillRect(cell.x, cell.y, GRID_SIZE-1, GRID_SIZE-1);
        })

        //Update last frame time
        lastTime = currentTime;
    }

    //Request next frame
    requestAnimationFrame(gameLoop);
}

gameLoop(0);
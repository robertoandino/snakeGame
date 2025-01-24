const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function gameLoop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    requestAnimationFrame(gameLoop);
}

gameLoop();
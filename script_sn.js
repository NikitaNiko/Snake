var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

				//р-р клеточки
var grid = 16;

				//snake sped
var count = 0;
var score = 0;
				//snake
var snake = {
x: 160,
y: 160,
dx: grid,
dy: 0,
//Хвост змеи
cells: [],
maxCells: 4,
};

var apple = {
x: 320,
y: 320,
};

function getRandomInt(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
}

function loop() {
    requestAnimationFrame(loop);
    if (++count < 4) 
        return;

    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
				//Snake walk
    snake.x += snake.dx;
    snake.y += snake.dy;
				//If snake touch wall
    if (snake.x < 0)
		snake.x = canvas.width - grid;
    else if (snake.x >= canvas.width)
		snake.x = 0;
    else if (snake.y < 0)
		snake.y = canvas.height - grid;
    else if (snake.y >= canvas.height)
		snake.y = 0;
				//Add snake's head to start of array
   	snake.cells.unshift({x: snake.x, y: snake.y });
    				//delete last cell
    if (snake.cells.length > snake.maxCells) 
		snake.cells.pop();
    
    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid -1, grid -1);

    context.fillStyle = 'green';
    snake.cells.forEach(function (cell, index) {
	context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
		if (cell.x === apple.x && cell.y === apple.y) {
			snake.maxCells ++;
			score += 1;
			//document.getElementById("score").innerHTML = "Your score: " + score;
			apple.x = getRandomInt(0, 25) * grid;
			apple.y = getRandomInt(0, 25) * grid;
		}
		
		for (var i = index + 1;i < snake.cells.length; i++) {
			if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
			snake.x = 160;
			snake.y = 160;
			snake.cells = [];
			snake.maxCells = 4;
			snake.dx = grid;
			snake.dy = 0;
			score = 0;

			apple.x = getRandomInt(0, 25) * grid;
			apple.y = getRandomInt(0, 25) * grid;
			}
		}
    });
}

document.addEventListener('keydown', function (e) {
    if (e.which === 37 && snake.dx === 0) {
		snake.dx = -grid;
		snake.dy = 0;
    }
    else if (e.which === 38 && snake.dy === 0) {
		snake.dy = -grid;
		snake.dx = 0;
    }
    else if (e.which === 39 && snake.dx === 0) {
		snake.dx = grid;
		snake.dy = 0;
    }
    else if (e.which === 40 && snake.dy === 0) {
		snake.dy = grid;
		snake.dx = 0;
    }
});

loop();






















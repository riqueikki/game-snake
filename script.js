const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20; // Tamanho de cada quadrado
let snake = [{ x: 9 * box, y: 10 * box }];
let direction = null;
let food = generateFood();
let score = 0;
let game;

document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('restartBtn').addEventListener('click', restartGame);

document.addEventListener('keydown', setDirection);

function startGame() {
  document.getElementById('startBtn').style.display = 'none';
  document.getElementById('restartBtn').style.display = 'inline';
  game = setInterval(draw, 120);
}

function restartGame() {
  clearInterval(game);
  snake = [{ x: 9 * box, y: 10 * box }];
  direction = null;
  food = generateFood();
  score = 0;
  document.getElementById('score').textContent = score;
  game = setInterval(draw, 120);
}

function setDirection(event) {
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}

function generateFood() {
  return {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
  };
}

function draw() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, 400, 400);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = (i === 0) ? "#00ff99" : "#00cc77";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "#ff3333";
  ctx.fillRect(food.x, food.y, box, box);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "LEFT") snakeX -= box;
  if (direction === "UP") snakeY -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "DOWN") snakeY += box;

  if (snakeX === food.x && snakeY === food.y) {
    score++;
    document.getElementById('score').textContent = score;
    food = generateFood();
  } else {
    snake.pop();
  }

  let newHead = { x: snakeX, y: snakeY };

  if (
    snakeX < 0 || snakeY < 0 ||
    snakeX >= 20 * box || snakeY >= 20 * box ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    alert('💀 Game Over! Pontuação final: ' + score);
  }

  snake.unshift(newHead);
}

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) {
      return true;
    }
  }
  return false;
}

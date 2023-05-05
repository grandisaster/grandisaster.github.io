import bridge from './node_modules/@vkontakte/vk-bridge';

bridge.send("VKWebAppInit", {});

let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

const CELL_SIZE = 10;
const FIELD_SIZE = 40;
const SNAKE_LENGTH = 5;

let snake = [];
for (let i = 0; i < SNAKE_LENGTH; i++) {
  snake.push({ x: i, y: 0 });
}

let direction = 1;

let overlay = document.getElementById("overlay");
let overlayButton = document.getElementById("overlay-button");



function drawSnake() {
  ctx.fillStyle = "green";
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x * CELL_SIZE, snake[i].y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  moveSnake();
  drawSnake();
  checkCollision();
}

function moveSnake() {
  let head = { x: snake[0].x, y: snake[0].y };
  if (direction === 1) {
    head.x++;
  } else if (direction === 2) {
    head.y++;
  } else if (direction === 3) {
    head.x--;
  } else if (direction === 4) {
    head.y--;
  }
  snake.unshift(head);
  snake.pop();
}

function handleKeyDown(event) {
  if (event.keyCode === 37 && direction !== 1) {
    direction = 3; // влево
  } else if (event.keyCode === 38 && direction !== 2) {
    direction = 4; // вверх
  } else if (event.keyCode === 39 && direction !== 3) {
    direction = 1; // вправо
  } else if (event.keyCode === 40 && direction !== 4) {
    direction = 2; // вниз
  }
}

function checkCollision() {
  let head = snake[0];
  if (head.x < 0 || head.x >= FIELD_SIZE || head.y < 0 || head.y >= FIELD_SIZE) {
    showOverlay("You lose");
    }
    }
    
    function showOverlay(message) {
    overlay.style.display = "flex";
    overlay.querySelector("#overlay-message").textContent = message;
    }
    
    function hideOverlay() {
    overlay.style.display = "none";
    }
    
    overlayButton.addEventListener("click", function() {
    hideOverlay();
    startGame();
    });
    
    function startGame() {
    snake = [];
    for (let i = 0; i < SNAKE_LENGTH; i++) {
    snake.push({ x: i, y: 0 });
    }
    direction = 1;
    hideOverlay();

    setInterval(gameLoop, 100);
    }
    
    startGame();
    
    document.addEventListener("keydown", handleKeyDown);

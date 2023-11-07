const playGame = document.querySelector(".play_game");
const score = document.querySelector(".score");
const highScore = document.querySelector(".high_score");
const overlay = document.querySelector(".overlay");
const replay = document.querySelector(".replay");
const btnClose = document.querySelector(".btn_close");
const controls = document.querySelectorAll(".controls i");

let foodX = 10,
  foodY = 13;
let snakeX = 8,
  snakeY = 5;
let vitesseX = 0,
  vitesseY = 0;
let scoring = 0,
  highScoring = 0;
let snakeBody = [];
let timer;

highScoring = localStorage.getItem("highScoring", highScoring) || 0;
highScore.innerText = `High Score: ${highScoring}`;

const moveSnake = (e) => {
  console.log(e.key);
  //    console.log(e);
  if (e.key === "ArrowUp" && vitesseY != 1) {
    vitesseX = 0;
    vitesseY = -1;
  } else if (e.key === "ArrowDown" && vitesseY != -1) {
    vitesseX = 0;
    vitesseY = 1;
  } else if (e.key === "ArrowLeft" && vitesseX != 1) {
    vitesseX = -1;
    vitesseY = 0;
  } else if (e.key === "ArrowRight" && vitesseX != -1) {
    vitesseX = 1;
    vitesseY = 0;
  }
};

const romdomPositionFood = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

const initGame = () => {
  let htmlMarkup = `<div class="food" style="grid-area: ${foodX} / ${foodY}"></div>`;

  if (foodX === snakeX && foodY === snakeY) {
    //   console.log("Snake Win");
    romdomPositionFood();
    snakeBody.push([foodX, foodY]);
    console.log(snakeBody);
    scoring++;
    scoring < 10 ? (scoring = `0${scoring}`) : (scoring = scoring);
    highScoring = scoring >= highScoring ? scoring : highScoring;
    localStorage.setItem("highScoring", highScoring);
    score.innerText = `Score : ${scoring}`;
    highScore.innerText = `high Score : ${scoring}`;
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
    //    console.log(snakeBody[i]);
  }

  snakeBody[0] = [snakeX, snakeY];

  snakeX += vitesseY;
  snakeY += vitesseX;

  if (snakeX < 1 || snakeX > 30 || snakeY < 1 || snakeY > 30) {
    overlay.classList.add("game_over");
    clearInterval(timer);
  }

  for (let i = 0; i < snakeBody.length; i++) {
    htmlMarkup += `<div class="snake" style="grid-area: ${snakeBody[i][0]} / ${snakeBody[i][1]}"></div>`;
    if (
      i != 0 &&
      snakeBody[0][1] === snakeBody[i][1] &&
      snakeBody[0][0] === snakeBody[i][0]
    ) {
      // console.log('Game Over');
      overlay.classList.add("game_over");
      clearInterval(timer);
    }
  }

  playGame.innerHTML = htmlMarkup;
};

romdomPositionFood();
timer = setInterval(initGame, 150);
document.addEventListener("keydown", moveSnake);
btnClose.addEventListener("click", () => {
  overlay.classList.remove("game_over");
  location.reload();
});
replay.addEventListener("click", () => location.reload());
controls.forEach((control) => {
  control.addEventListener("click", () =>
    moveSnake({ key: control.dataset.key })
  );
});

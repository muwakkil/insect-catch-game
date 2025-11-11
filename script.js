const screens = document.querySelectorAll('.screen');
const chooseStarBtns = document.querySelectorAll('.choose-star-btn');
const startBtn = document.getElementById('start-btn');
const gameContainer = document.getElementById('game-container');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const message = document.getElementById('message');

let seconds = 0;
let score = 0;
let selectedStar = {};
let gameOver = false;

startBtn.addEventListener('click', () => screens[0].classList.add('up'));

chooseStarBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const img = btn.querySelector('img');
    const src = img.getAttribute('src');
    const alt = img.getAttribute('alt');
    selectedStar = { src, alt };
    screens[1].classList.add('up');
    setTimeout(createStar, 100);
    startGame();
    setInterval(createStar, 1000); 
  });
});

function startGame() {
  setInterval(increaseTime, 1000);
}

function increaseTime() {
  if (gameOver) return;
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;
  timeEl.innerHTML = `Time: ${m}:${s}`;
  seconds++;
}

function createStar() {
  if (gameOver) return;

  const star = document.createElement('div');
  star.classList.add('star');

  const { x, y } = getRandomLocation();
  star.style.top = `${y}px`;
  star.style.left = `${x}px`;

  const colors = [
    'imgs/bluestar.png',
    'imgs/whitestar.png',
    'imgs/yellowstar.png',
    'imgs/orangestar.png',
    'imgs/redstar.png'
  ];

  const randomIndex = Math.floor(Math.random() * colors.length);
  const randomSrc = colors[randomIndex];
  const randomAlt = colors[randomIndex].replace('imgs/', '').replace('.png', '');

  star.innerHTML = `<img src="${randomSrc}" alt="${randomAlt}" style="transform: rotate(${Math.random() * 360}deg)" />`;

  star.addEventListener('click', catchStar);
  gameContainer.appendChild(star);
}

function getRandomLocation() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const x = Math.random() * (width - 200) + 100;
  const y = Math.random() * (height - 200) + 100;
  return { x, y };
}

function catchStar(e) {
  if (gameOver) return;

  
  const imgElement = this.querySelector('img');
  const clickedSrc = imgElement.getAttribute('src');

  if (clickedSrc !== selectedStar.src) {

    gameOver = true;
    message.innerHTML = "You clicked the wrong star! Game Over.";
    message.classList.add('visible');
    return;
  }

  increaseScore();
  this.classList.add('caught');
  setTimeout(() => this.remove(), 2000);
  addStar();
}

 

function addStar() {
  if (gameOver) return;
  setTimeout(createStar, 200);
  setTimeout(createStar, 400);
  setTimeout(createStar, 600);  
  setTimeout(createStar, 800);
}

function increaseScore() {
  score++;
  if (score > 19) {
    message.classList.add('visible');
    message.innerHTML = "You won!";
  }
  scoreEl.innerHTML = `Score: ${score}`;
}



let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

let result = '';
let playerMove = '';
let computerMove = '';

updateScoreElement();

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML =
    `Wins: ${score.wins}. Losses: ${score.losses}. Ties: ${score.ties}`;
}

function updateResultElement(){
  document.querySelector('.js-result')
    .innerHTML = `${result}`
}

function updateMoveElement() {
    document.querySelector('.js-move')
      .innerHTML = `You
    <img src="images/${playerMove}-emoji.png" class="move-icon">
    <img src="images/${computerMove}-emoji.png" class="move-icon">
    Computer`
  }


function playGame(move) {
  playerMove = move
  const moves = ['rock', 'paper', 'scissors'];
  computerMove = moves[Math.floor(Math.random() * 3)];

  const winConditions = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
  };

  if (playerMove === computerMove) {
    result = 'Tie';
  } else if (winConditions[playerMove] === computerMove) {
    result = 'You win';
  } else {
    result = 'You lose';
  }

  score.wins += result === 'You win' ? 1 : 0;
  score.ties += result === 'Tie' ? 1 : 0;
  score.losses += result === 'You lose' ? 1 : 0;

  localStorage.setItem('score', JSON.stringify(score));
  updateScoreElement();
  updateResultElement();
  updateMoveElement();
}
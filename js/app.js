let cardSymbols = ['diamond',
'diamond',
'paper-plane',
'paper-plane',
'anchor',
'anchor',
'bolt',
'bolt',
'cube',
'cube',
'leaf',
'leaf',
'bicycle',
'bicycle',
'bomb',
'bomb'];

let clickedCards = []
let matchedCards=[]

let moveNumber = document.querySelector('.moves');
let moves = 0;

let sec = 0;
let min = 0;
let hr = 0;
let startingTime = document.querySelector('.timer');
let timerCount;

let starCount = document.querySelector('.stars');

let restart = document.querySelector('.restart');
restart.addEventListener('click', newGame);

let wonTheGame = document.getElementsByClassName('modal');

let exit = document.querySelector('.close');

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

window.onload  = newGame();
function newGame() {
  clickedCards = []
  matchedCards=[]
  sec = 0;
  min = 0;
  hr = 0;
  startingTime.innerHTML = hr + ':' + min + ':' + sec;
  clearInterval(timerCount);
  startTimer();
  moves = 0;
  moveNumber.innerHTML = moves;
  starCount.childNodes[5].childNodes[0].className = 'fa fa-star';
  starCount.childNodes[3].childNodes[0].className = 'fa fa-star';
  starCount.childNodes[1].childNodes[0].className = 'fa fa-star';

  const Deck = document.querySelector('.deck');
  Deck.innerHTML = '';
  let cardLayout = shuffle(cardSymbols);
  for (let i = 0; i < cardSymbols.length; i++) {
    let createCard = document.createElement('li');
    createCard.setAttribute('class', 'card');
    createCard.innerHTML = '<i class="fa fa-' + cardLayout[i] + '"></i>';
    Deck.appendChild(createCard);
    Deck.addEventListener('click', cardClicked);
  }
}

function cardClicked(event) {
  if (event.target.className === 'card' && clickedCards.length <2) {
    event.target.classList.add('open', 'show');
    addCardsToClickedCards(event);
    doCardsMatch(event);
  }
}

function addCardsToClickedCards(event) {
  clickedCards.push(event.target);
}

// Known Bug:
// 1. If clicking 2+ cards to quickly a card will be left open, and not matched or turned back over.
function doCardsMatch(event) {
  if (clickedCards.length === 2) {
    if (clickedCards[0].innerHTML === clickedCards[1].innerHTML) {
        clickedCards[0].classList.add('match');
        clickedCards[0].classList.remove('open', 'show');
        clickedCards[1].classList.add('match');
        clickedCards[1].classList.remove('open', 'show');
        matchedCards.push(clickedCards);
        clickedCards.length = 0;
        moveCounter();
        gameComplete();
    } else {
        setTimeout(function() {
          clickedCards[0].classList.remove('open', 'show');
          clickedCards[1].classList.remove('open', 'show');
          clickedCards.length = 0;
          moveCounter();
        }, 800);
    }
  }
}

function moveCounter() {
  if (clickedCards.length === 0) {
    moves++;
    moveNumber.innerHTML = moves;
    starRating(moves);
  }
}

//Known Bugs:
// 1.If calling back startTime(), inside and at the end of cardClicked if you click more then once in any session the timer count speeds up with every click, because its starting a new timer and trying to display each timer simultaneously.

function startTimer() {
  timerCount = setInterval(function () {
    startingTime.innerHTML = hr + ':' + min + ':'  + sec;
    if (sec < 60) {
      sec++;
    }
    if (sec === 60) {
      min++;
      sec = 0;
    }
    if  (min === 60) {
      hr++
      min =0;
    }
  }, 1000);
}

function starRating(moves) {
  if (moves >= 12 && moves < 18) {
    starCount.childNodes[5].childNodes[0].className = 'fa fa-star-o';
  } else if  (moves >= 18 && moves < 24) {
    starCount.childNodes[3].childNodes[0].className = 'fa fa-star-o';
  } else if (moves > 24) {
     starCount.childNodes[1].childNodes[0].className = 'fa fa-star-o';
  }
  return starCount;
}

function replayGame(event) {
  let replay = document.querySelector('.replayButton')
  replay.addEventListener('click', function () {
    wonTheGame[0].style.display = 'none';
    newGame();
  });
}

function exitGame (event) {
  exit.addEventListener('click', function () {
    wonTheGame[0].style.display ='none';
    sec = 0;
    min = 0;
    hr = 0;
    startingTime.innerHTML = hr + ':' + min + ':' + sec;
    moves = 0;
    moveNumber.innerHTML = moves;
    starCount.childNodes[5].childNodes[0].className = 'fa fa-star';
    starCount.childNodes[3].childNodes[0].className = 'fa fa-star';
    starCount.childNodes[1].childNodes[0].className = 'fa fa-star';
  });
}

function gameComplete() {
  if (matchedCards.length === 8) {
  wonTheGame[0].style.display = 'block';
  document.querySelector('.winning-game-message').innerHTML = "Congratulation you matched all the cards!!!";
  document.querySelector('.final-move-count').innerHTML = moves;
  document.querySelector('.final-time-count').innerHTML = hr + ':' + min + ':' + sec;
  document.querySelector('.final-star-count').innerHTML = starCount.innerHTML
  clearInterval(timerCount);
  replayGame();
  exitGame();
  }
}

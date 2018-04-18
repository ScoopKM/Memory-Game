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

let clickedCards = []
let matchedCards=[]

function cardClicked(event) {
  if (event.target.className === 'card') {
    event.target.classList.add('open', 'show');
    addCardsToClickedCards(event);
    doCardsMatch(event);
    startTimer();
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

let moves = 0

function moveCounter() {
  let moveNumber = document.querySelector('.moves');
  if (clickedCards.length === 0) {
    moves++;
    moveNumber.innerHTML = moves;
    starRating(moves);
  }
}

//Known Bugs:
// 1. Once the timer reaches 60 seconds, it tarts counting only minutes, but treats them like seconds. It never shows hours, even when it hits 3,600 seconds.
// 2. If you click more then once in any session the timer count speeds up with every click.

let sec = 0
let min = 0
let hr = 0

function startTimer() {
  let startingTime = document.querySelector('.timer');
  setInterval(function () {
    if (sec < 60){
      sec++;
      return startingTime.innerHTML = sec;
    } else if (sec === 60) {
      min++;
      return startingTime.innerHTML = min + ':' + sec;
    } else if  (min === 60) {
      hr++;
      return startingTime.innerHTML = hr + ':' + min + ':' + sec;
    }
  }, 1000);
}

let starCount = document.querySelector('.stars');
function starRating(moves) {
  if (moves >= 12 && moves < 18) {
    let starThree = starCount.childNodes[5].childNodes[0].className = 'fa fa-star-o';
  } else if  (moves >= 18 && moves < 24) {
    let starTwo = starCount.childNodes[3].childNodes[0].className = 'fa fa-star-o';
  } else if (moves > 24) {
      let starOne = starCount.childNodes[1].childNodes[0].className = 'fa fa-star-o';
  }
  return starCount;
}

// function restartGame() {
//   let restart = document.querySelector('.restart');
//   restart.addEventListener('click', function (){
//     newGame ();
//   });
// }

function gameComplete() {
  let wonTheGame = document.getElementsByClassName('modal');
  if (matchedCards.length === 8) {
  wonTheGame[0].style.display = 'block';
  document.querySelector('.final-move-count').innerHTML = moves;
  document.querySelector('.final-time-count').innerHTML = sec;
  document.querySelector('.final-star-count').innerHTML = starCount;
  }
}

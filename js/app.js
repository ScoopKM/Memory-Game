// *
//  * Create a list that holds all of your cards
//  *
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

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
    startTimer(event);
  }
}

function addCardsToClickedCards(event) {
  clickedCards.push(event.target);
}

// Know Bug:
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
  let moves = document.querySelector('.moves');
  if (clickedCards.length === 0) {
    moves.innerHTML++;
  }
}

//Known Bugs:
// 1. Once the timer reaches 60 seconds, it tarts counting only minutes, but treats them like seconds. It never shows hours, even when it hits 3,600 seconds.
// 2. If you click more then once in any session the timer count speeds up with every click.
function startTimer(event) {
  let sec = 0
  let min = 0
  let hr = 0
  let startingTime = document.querySelector('.timer');
  setInterval(function (event) {
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



// From there I need the game to realize when all cards are matched, and finish the game.


 // * set up the event listener for a card. If a card is clicked:
 // *  - display the card's symbol (put this functionality in another function that you call from this one)
 // *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 // *  - if the list already has another card, check to see if the two cards match
 // *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 // *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 // *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)

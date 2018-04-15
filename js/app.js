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
    console.log('The card was clicked');
    addCardsToClickedCards(event.target);
  }
}

function addCardsToClickedCards(event) {
  clickedCards.push(event.outerHTML);
  console.log(clickedCards);
  console.log(clickedCards[0]);
}

if (clickedCards[0] === clickedCards[1]) {
  setTimeout(function() {
    clickedCards[0].classList.add('match');
    clickedCards[0].classList.remove('open', 'show');
    clickedCards[1].classList.add('match');
    clickedCards[1].classList.remove('open', 'show');
    console.log(clickedCards);
    matchedCards.push(clickedCards[0]);
    matchedCards.push(clickedCards[1]);
    console.log(matchedCards);
    clickedCards.pop(clickedCards[0]);
    clickedCards.pop(clickedCards[1]);
    console.log(clickedCards);
  }, 1200);
} else {
    setTimeout(function() {
      clickedCards[0].classList.remove('open', 'show');
      clickedCards[1].classList.remove('open', 'show');
      console.log(clickedCards);
      clickedCards.pop(clickedCards[0]);
      clickedCards.pop(clickedCards[1]);
      console.log(clickedCards);
    }, 1200);
}


// I need to be able to get the first click to add class open and show and then stop. Then get the second slick to add class open and show, and then evaluate if the the clicked card and second clicked card match. If not matched remove class open and show. If matched, replace class open and show with match, and then stop and hold the cards in place.
//
// From there I need the game to realize when all cards are matched, and finish the game.


 // * set up the event listener for a card. If a card is clicked:
 // *  - display the card's symbol (put this functionality in another function that you call from this one)
 // *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 // *  - if the list already has another card, check to see if the two cards match
 // *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 // *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 // *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)

# Memory Game Project

## Table of Contents

* [How to Play](#how-to-play)
* [Star Rating](#star-rating)
* [Instructions on How to Make Your Own Game](#instructions-on-how-to-make-your-own-game)
* [Contributing](#contributing)

## How to Play

To play the game follow the link for the live version
https://scoopkm.github.io/Memory-Game/

The game board holds 16 cards, and the goal is to match each card to its pair. When you click on each face down card, the card will display the card's symbol and have a blue border. When you click on the second card, they will either match and both cards' boarder will turn green, while continuing to display the card's symbol, or both cards will turn back face down indicating the cards did not match. The goal of the game is to match the 8 pairs and reach the winning screen. Afterwards you can either choose to play a new game, or close the winning screen.

During the game there will be a timer that tracks how long it takes for you to complete the game. In addition to the timer, there is a move counter that tracks how many times you try to match 2 cards. There is a corresponding star rating system from 0 stars to 3 stars based off your number of moves. Also you can restart the game at any time by clicking on the restart button or refreshing your browser.

## Star Rating

Your star rating is based off the number of moves, it takes you to match all of the cards, so the game is not about how fast you are, but about how precise you are.

The current star rating is as follows:
* 3 Stars - 11 moves or less
* 2 Stars - 12-17 moves
* 1 Stars - 18-23 moves
* 0 Stars - 24 moves or more

## Instructions on How to Make Your Own Game

To get your own starter code click here: https://github.com/udacity/fend-project-memory-game

The starter code has some HTML and CSS styling to display a static version of the Memory Game project. You'll need to convert this project from a static project to an interactive one. This will require modifying the HTML and CSS files, but primarily the JavaScript file.

To get started, open `js/app.js` and start building out the app's functionality

For specific, detailed instructions, look at the project instructions in the [Udacity Classroom](https://classroom.udacity.com/me).

## Contributing

The Udacity repository containing the starter code is starter code for _all_ Udacity students. Therefore, they most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).

As for my personal repository, if you see anyway to improve or complete the following, submit a pull request for my review.
* Anyway to improve the responsiveness of the display on any screen size. You'll find my current media queries in the CSS file.
* A way to start the timer on the first click, without each click starting a new internal timer. Please limit the code to plain JavaScript, and not code that requires React or JQuery to run.

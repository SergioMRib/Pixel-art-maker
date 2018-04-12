/*
 * Create a list that holds all of your cards;
 * This will be used to shuffle the deck.
 * The produced list will have an index for each card.
 * The shuffle function will assign new index values
 */

const restartButton = document.getElementById('restart'),
      theDeck = document.getElementById('the-deck'),
      winnerAlert = document.getElementsByClassName('winner-alert')[0];

let allCards = document.getElementsByClassName('card'),
    clickedCards = [],
    moveCount = 0,
    matchedCards = 0,
    startTime;

/*
 * the deck is shuffled for the first time when document loads
*/


resetGame();

restartButton.addEventListener('click', resetGame);

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

/*
 * Event listeners for the cards
*/


theDeck.addEventListener('click', function (event) {
    /*
     * Gets the card element clicked (the target)
     * toggles "show" and "open" classes on that element
    */
    if (event.target.nodeName !== 'LI') {
        // verifi that a card (li tag) was clicked
        return;
    } else if (clickedCards[0] === event.target) {
        // verifi that second clicked card is different from first
        return;
    };

    if (clickedCards.length < 2) {
        // if clickedCards already has 1 card it adds another; if it has 2 cards it wont add any other
        clickedCards.push(event.target);
        event.target.classList.add('open', 'show');
    };

    console.log(clickedCards);

    if (clickedCards.length === 2) {
        //When there are two cards, a move is counted and the comparison is triggered
        moveCount++;
        moveCounter(moveCount);
        comparator(clickedCards[0], clickedCards[1]);
        console.log('2 clicked cards')
    };

    if (matchedCards === (allCards.length/2)) {
        window.setTimeout(gameWin, 1000);
    };

});

function comparator(firstCard, secondCard) {
    /*
    * @description compares the two cards information
    * Calls resetCards function with 1 second delay
    */
    if (firstCard.children[0].classList.value === secondCard.children[0].classList.value) {
        firstCard.classList.toggle('match');
        secondCard.classList.toggle('match');
        matchedCards++;
        resetCards();
    } else {
        window.setTimeout(resetCards, 1000);
    };
};

function resetCards() {
    // removes the classes concerning visibility
    clickedCards[0].classList.remove('open', 'show');
    clickedCards[1].classList.remove('open', 'show');
    clickedCards= [];
};


function moveCounter(num) {
    //updates the number of moves on the web page
    document.getElementById('move-counter').textContent = num;
};

function shuffle(array) {
    /*
    * @description Gets the array, removes a random index element and pushes it to the shuffled array
    * @param {array} array - The array converted from the HTMLCollection;
    * @returns {array} - The shuffled array;
    */
    let shuffledArray = [],
        randomIndex;

    while (array.length !== 0) {
        randomIndex = Math.floor(Math.random() * array.length);
        shuffledArray.push(array[randomIndex]);
        array.splice(randomIndex, 1);
    };
    return shuffledArray;
};

function resetGame() {
    /*
     * Deals with all the needed procedures to restart a game
    */

    // shuffling cards and appending them to the DOM
    allCards = shuffle(Array.from(allCards));
    for(let i = 0; i < allCards.length; i ++) {
        theDeck.appendChild(allCards[i]);
        allCards[i].classList.remove('match', 'show', 'open');
    };

    // resetting move count to zero (0)
    moveCount = 0;
    moveCounter(moveCount);

    // erasing clicked cards array
    clickedCards = [];
    // erasing matched cards counting
    matchedCards = 0;
    // restart the time
    startTime = Date.now();
};

function gameWin() {

    // calculating the time it took to finish
    let timeText = timer();

    // show winner alert and hide deck
    winnerAlert.classList.toggle('hidden');
    theDeck.classList.toggle('hidden');
    // show the scores
    document.getElementById('score').innerText = moveCount;
    document.getElementById('time').innerText = timeText;
};

function timer() {
    /*
     * Calculates the time passed
     * Uses the startTime variable whose value is assigned outside of this function
     */
    let time = Date.now(),
        elapsedTime = time - startTime;

    let days = Math.floor(elapsedTime / (1000 * 60 * 60 * 24)),
        hours = Math.floor((elapsedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60)),
        seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000),
        text;

    //Creating the output according to the time passed
    if (hours !== 0) {
        //if it took more than 1hour
        text = hours + ' hours, ' + minutes + ' minutes and ' + seconds + ' seconds';
    } else if (minutes !== 0) {
        //if it took more than 1minute
        text = minutes + ' minutes and ' + seconds + ' seconds';
    } else {
        //if it took less than 1 minute
        text = seconds + ' seconds';
    };
    console.log(text);
    return text;
};

winnerAlert.addEventListener('click', function(){
    // event listener to start a new game after winning
    gameWin();
    resetGame();
});
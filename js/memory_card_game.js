/*
 * Create a list that holds all of your cards;
 * This will be used to shuffle the deck.
 * The produced list will have an index for each card.
 * The shuffle function will assign new index values
 */

const restartButton = document.getElementById('restart');

let theDeck = document.getElementById('the-deck');
let clickedCards = [];
let count = 0;
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
    };

    if (clickedCards.length < 2) {
        // if clickedCards already has 1 card it adds another; if it has 2 cards it wont add any other
        clickedCards.push(event.target);
        event.target.classList.add('open', 'show');
    };

    console.log(clickedCards);

    if (clickedCards.length === 2) {
        count++;
        moveCounter(count);
        comparator(clickedCards[0], clickedCards[1]);
        console.log('2 clicked cards')
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

    document.getElementById('move-counter').textContent = num;
};

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    /*
    * @description Gets the array and shuffles its elements indices
    * @param {array / HtmlCollection} array - The array, in this case the HtmlCollection (works as it has indices);
    * @returns {array / HtmlCollection} - The shuffled array / HtmlCollection;
    */
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    };

    return array;
};

function resetGame() {
    let allCards = document.getElementsByClassName('card');
    console.log(allCards);
    // shuffling cards and appending them to the DOM
    allCards = shuffle(allCards);
    for(let i = 0; i < allCards.length; i ++) {
        theDeck.appendChild(allCards[i]);
        allCards[i].classList.remove('match', 'show', 'open');
    };

    // resetting count to zero (0)
    count = 0;
    moveCounter(count);

    // erasing clicked cards list
    clickedCards = [];
};
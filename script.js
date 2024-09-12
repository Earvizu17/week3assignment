document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const matchesLeftDisplay = document.getElementById('matches-left');
    const replayButton = document.getElementById('replay-btn');
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let matchesLeft = 8;

    function createCards() {
        const cardValues = shuffle([...Array(8).keys(), ...Array(8).keys()]);
        cardValues.forEach(value => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-value', value);
            card.addEventListener('click', handleCardClick);
            gameContainer.appendChild(card);
        });
    }

    function handleCardClick(e) {
        const clickedCard = e.target;
        if (lockBoard || clickedCard === firstCard || clickedCard.classList.contains('flipped')) return;
        
        showCard(clickedCard);

        if (!firstCard) {
            firstCard = clickedCard;
        } else {
            secondCard = clickedCard;
            checkForMatch();
        }
    }

    function showCard(card) {
        card.classList.add('flipped');
        card.innerHTML = card.getAttribute('data-value');
    }

    function hideCard(card) {
        card.classList.remove('flipped');
        card.innerHTML = '';
    }

    function checkForMatch() {
        lockBoard = true;
        if (firstCard.getAttribute('data-value') === secondCard.getAttribute('data-value')) {
            setTimeout(removeMatchedCards, 1000);
        } else {
            setTimeout(resetFlippedCards, 1000);
        }
    }

    function removeMatchedCards() {
        firstCard.remove();
        secondCard.remove();
        resetBoard();
        matchesLeft--;
        matchesLeftDisplay.textContent = `Matches Left: ${matchesLeft}`;
        if (matchesLeft === 0) {
            setTimeout(endGame, 500);
        }
    }

    function resetFlippedCards() {
        hideCard(firstCard);
        hideCard(secondCard);
        resetBoard();
    }

    function resetBoard() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function endGame() {
        alert('Congratulations! You won the game!');
        replayButton.style.display = 'inline-block';
    }

    replayButton.addEventListener('click', () => {
        gameContainer.innerHTML = '';
        matchesLeft = 8;
        matchesLeftDisplay.textContent = `Matches Left: ${matchesLeft}`;
        replayButton.style.display = 'none';
        createCards();
    });

    createCards();
});

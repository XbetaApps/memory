document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const restartBtn = document.getElementById('restart-btn');
    const flipCardsBtn = document.getElementById('flip-cards-btn');
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'cyan', 'magenta', 'orange'];
    let colorPairs = [...colors, ...colors];
    let selectedCards = [];
    let matchesFound = 0;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function resetGame() {
        board.innerHTML = ''; // Clear the game board
        selectedCards = [];
        matchesFound = 0;
        createBoard(); // Re-create the game board
    }

    function createBoard() {
        shuffle(colorPairs);
        for (let color of colorPairs) {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.color = color;
            board.appendChild(card);
            card.addEventListener('click', flipCard);
        }
    }

    function flipCard() {
        if (selectedCards.length === 2 || this.classList.contains('flipped')) {
            return;
        }

        this.classList.add('flipped');
        this.style.backgroundColor = this.dataset.color;
        selectedCards.push(this);

        if (selectedCards.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    function checkForMatch() {
        const [cardOne, cardTwo] = selectedCards;

        if (cardOne.dataset.color === cardTwo.dataset.color) {
            matchesFound += 2;
            cardOne.removeEventListener('click', flipCard);
            cardTwo.removeEventListener('click', flipCard);
        } else {
            setTimeout(() => {
                cardOne.classList.remove('flipped');
                cardTwo.classList.remove('flipped');
                cardOne.style.backgroundColor = '';
                cardTwo.style.backgroundColor = '';
            }, 500);
        }

        selectedCards = [];

        if (matchesFound === colorPairs.length) {
            // عرض رسالة الفوز
            document.getElementById('win-message').style.display = 'block';
        
            // إخفاء الرسالة وإعادة تعيين اللعبة بعد ثانيتين
            setTimeout(() => {
                document.getElementById('win-message').style.display = 'none';
                resetGame(); // تأكد من تعريف هذه الدالة لإعادة تعيين اللعبة
            }, 2000);
        }
    }

    function flipCardsTemporarily() {
        const cards = document.querySelectorAll('.card:not(.flipped)');
        cards.forEach(card => {
            card.classList.add('flipped');
            card.style.backgroundColor = card.dataset.color;
        });

        setTimeout(() => {
            cards.forEach(card => {
                card.classList.remove('flipped');
                card.style.backgroundColor = '';
            });
        }, 2000); // Flip back after 2 seconds
    }

    restartBtn.addEventListener('click', resetGame);
    flipCardsBtn.addEventListener('click', flipCardsTemporarily);
    createBoard();
});

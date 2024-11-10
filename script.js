document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const message = document.getElementById('message');
    const targetEmoji = document.getElementById('target-emoji');
    const stats = document.getElementById('stats');
    const winningIndex = Math.floor(Math.random() * cards.length);
    let tries = 3;
    let canClick = true;

    let gamesPlayed = localStorage.getItem('gamesPlayed') || 0;
    let gamesWon = localStorage.getItem('gamesWon') || 0;

    function updateStats() {
        stats.textContent = `Games Played: ${gamesPlayed} | Games Won: ${gamesWon}`;
    }

    cards[winningIndex].classList.add('winning');
    targetEmoji.textContent = `Find this emoji: ${cards[winningIndex].getAttribute('data-emoji')}`;

    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (!canClick) return;

            canClick = false;
            card.classList.add('revealed');

            if (card.classList.contains('winning')) {
                message.textContent = 'Congratulations! You found the winning emoji! Press R to play again.';
                gamesWon++;
                localStorage.setItem('gamesWon', gamesWon);
                disableAllCards();
            } else {
                tries--;
                if (tries > 0) {
                    message.textContent = `Try again! You have ${tries} tries left.`;
                    setTimeout(() => {
                        card.classList.remove('revealed');
                        canClick = true;
                    }, 2000);
                } else {
                    message.textContent = 'Game over! Press "R" to reload and play again.';
                    disableAllCards();
                }
            }
        });
    });

    function disableAllCards() {
        cards.forEach(card => {
            card.style.pointerEvents = 'none';
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key.toLowerCase() === 'r') {
            gamesPlayed++;
            localStorage.setItem('gamesPlayed', gamesPlayed);
            location.reload();
        }
    });
    updateStats();
});
// FAQ card flip functionality
function toggleCard(card) {
    const front = card.querySelector('.faq-front');
    const back = card.querySelector('.faq-back');
    const isFlipped = front.style.transform === 'rotateY(180deg)';

    // Flip the card
    front.style.transform = isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)';
    back.style.transform = isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
}
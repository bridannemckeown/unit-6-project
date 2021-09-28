const keyBoard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startButton = document.querySelector('.btn__reset');
console.log(startButton);
let missed = 0;

startButton.addEventListener('click', () => {
    const overlay = startButton.parentNode;
    overlay.style.display = 'none';
});

const phrases = [
    'Time of your life',
    'Whale of a time',
    'Over the moon',
    'Jumping with joy',
    'On top of the world'
];

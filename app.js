const keyBoard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startButton = document.querySelector('.btn__reset');
console.log(startButton);
let missed = 0;

const phrases = [
    'time of your life',
    'whale of a time',
    'over the moon',
    'jumping with joy',
    'on top of the world'
];

startButton.addEventListener('click', () => {
    const overlay = startButton.parentNode;
    overlay.style.display = 'none';
});

//return a random phrase from the phrases array
const getRandomPhraseAsArray = (arr) => {
 const randomNumber = Math.floor(Math.random() * arr.length);
 return arr[randomNumber];
}

getRandomPhraseAsArray(phrases);

const addPhraseToDisplay = () => {
    
}
const keyBoard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startButton = document.querySelector('.btn__reset');
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
 return arr[randomNumber].split("");
}

const randomPhrase = getRandomPhraseAsArray(phrases);

//loop that adds the random phrase selected to display
const addPhraseToDisplay = (randomPhraseSelected) => {
    const ul = phrase.firstElementChild;
    for (let i=0; i < randomPhraseSelected.length ;i++) {
        const listItem = document.createElement('li');
        listItem.textContent = randomPhraseSelected[i];
        ul.appendChild(listItem);
        if ( randomPhraseSelected[i] !== " " ) {
            listItem.className = "letter";
        } else {
            listItem.className = "space";
        }
    }
    console.log(ul);   
}

addPhraseToDisplay(randomPhrase);
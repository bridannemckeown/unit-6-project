const keyBoard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const ul = phrase.firstElementChild;
const startButton = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');
let missed = 0;
const phrases = [
    'time of your life',
    'whale of a time',
    'over the moon',
    'jumping for joy',
    'on top of the world'
];

startButton.addEventListener('click', () => {
    overlay.style.display = 'none';
});

//return a random phrase from the phrases array
const getRandomPhraseAsArray = (arr) => {
    const randomNumber = Math.floor(Math.random() * arr.length);
    return arr[randomNumber].split("");
}

const randomPhrase = getRandomPhraseAsArray(phrases);

//loop to adds the random phrase selected to display
const addPhraseToDisplay = (randomPhraseSelected) => {
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
}

addPhraseToDisplay(randomPhrase);

//checks the letter chosen from the keyboard against the letters in the random phrase
const checkLetter = (button) => {
    const checkLetter = ul.children;
    let match = null;
    for (let i=0; i < checkLetter.length; i++) {
        if ( button.textContent === checkLetter[i].textContent) {
            checkLetter[i].classList.add('show');
            checkLetter[i].style.borderColor = 'black';
            match = button.textContent;
        } 
    }
    return match;
}

//only previously unselected keyboard letter clicks are listened to and changes heart image src
keyBoard.addEventListener('click', (e) => {
    const letterButton = document.querySelectorAll('.keyrow button');
    const selectedButton = e.target;
    if ( selectedButton.tagName === 'BUTTON' && selectedButton.className !== 'chosen') {
        const letterFound = checkLetter(selectedButton);
        if (letterFound == null) {
            selectedButton.disabled = true;
            if (selectedButton.disabled = true) {
                selectedButton.style.backgroundColor = '#D94545';
                selectedButton.style.transform = "none";
                selectedButton.style.transition = "none";
            }
            const imgLI = document.querySelectorAll("[src$='liveHeart.png']");
            console.log(imgLI.length);
            if ( imgLI.length >= 1 ) {
                imgLI[0].src = "images/lostHeart.png";
            }
            missed++;
        } else {
            selectedButton.classList.add('chosen');
        }
    }
    checkWin();
});

//checks if user has guessed all letters correctly (.letter & .show applied to same number of characters from random phrase array) to win or has more than 4 missed goes to lose and then applies relevant overlay
const checkWin = () => {
    const liLetter = document.querySelectorAll('li.letter');
    const liShow = document.querySelectorAll('li.show');
    const selectedButton = document.querySelectorAll('.keyrow button');
    if (liLetter.length === liShow.length) {
        for (let i=0; i<selectedButton.length; i++) {
            selectedButton[i].style.transform = 'none';
            selectedButton[i].style.transition = 'none';
        }
        overlay.style.display = 'flex';
        overlay.classList.add('win');
        overlay.classList.remove('start');
        overlay.firstElementChild.textContent = "You won!";
        overlay.removeChild(startButton);
    } else if (missed > 4) {
        for (let i=0; i<selectedButton.length; i++) {
            selectedButton[i].style.transform = 'none';
            selectedButton[i].style.transition = 'none';
        }
        overlay.style.display = 'flex';
        overlay.classList.add('lose');
        overlay.classList.remove('start');
        overlay.firstElementChild.textContent = "Better luck next time!";
        overlay.removeChild(startButton);
    }
}
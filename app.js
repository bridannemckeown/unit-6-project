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
    const h2Header = document.querySelector('h2.header');
    if (overlay.style.display === 'none') {
        h2Header.style.transform = 'rotate(720deg)';
        h2Header.style.transition = 'all 0.5s ease-out';     
        h2Header.addEventListener('transitionend', () => {
            const instructionP = document.querySelector('#instructions p');
            instructionP.style.visibility = 'visible';
        }); 
    }
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
            listItem.classList.add('character');
        } else {
            listItem.className = "space";
            listItem.classList.add('character');
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
    const letterButton = document.querySelectorAll('.keyrow button');
    const liLetter = document.querySelectorAll('li.letter');
    const liShow = document.querySelectorAll('li.show');
    const selectedButton = document.querySelectorAll('.keyrow button');
    if (liLetter.length === liShow.length) {
        const h2Header = document.querySelector('h2.header');
        h2Header.style.display = 'none';
        for (let i=0; i < selectedButton.length; i++) {
            selectedButton[i].style.transform = 'none';
            selectedButton[i].style.transition = 'none';
        }
        for (let i=0; i < liShow.length; i++ ) {
            liShow[i].style.transform = 'none';
            liShow[i].style.transition = 'none';
        }
        overlay.style.display = 'flex';
        overlay.classList.add('win');
        overlay.classList.remove('start');
        overlay.firstElementChild.textContent = "You won!";
        overlay.firstElementChild.style.background = 'none';
        startButton.textContent = "Reset Game";
        startButton.addEventListener('click', () => {
            h2Header.style.display ='inline-block';
            const li = document.querySelectorAll('.character');
            console.log(li);
            for (i=0; i < li.length; i++) {
                li[i].remove();
            }
            for (let i=0; i < letterButton.length; i++ ) {
                letterButton[i].removeAttribute('class');
                letterButton[i].removeAttribute('disabled');
                letterButton[i].style.backgroundColor = '#E5E5E5';
            }
            const imgLI = document.querySelectorAll("[src$='lostHeart.png']");
            imgLI.forEach(img => {
                img.setAttribute('src', 'images/liveHeart.png');
              });
            addPhraseToDisplay(getRandomPhraseAsArray(phrases));
            missed = 0;
        });
    } else if (missed > 4) {
        const h2Header = document.querySelector('h2.header');
        h2Header.style.display = 'none';
        for (let i=0; i<selectedButton.length; i++) {
            selectedButton[i].style.transform = 'none';
            selectedButton[i].style.transition = 'none';
        }
        for (let i=0; i < liShow.length; i++ ) {
            liShow[i].style.transform = 'none';
            liShow[i].style.transition = 'none';
        }
        overlay.style.display = 'flex';
        overlay.classList.add('lose');
        overlay.classList.remove('start');
        overlay.firstElementChild.textContent = "Better luck next time!";
        overlay.firstElementChild.style.background = 'none';
        startButton.textContent = "Reset Game";
        startButton.addEventListener('click', () => {
            h2Header.style.display ='inline-block';
            const li = document.querySelectorAll('.character');
            console.log(li);
            for (i=0; i < li.length; i++) {
                li[i].remove();
            }
            for (let i=0; i < letterButton.length; i++ ) {
                letterButton[i].removeAttribute('class');
                letterButton[i].removeAttribute('disabled');
                letterButton[i].style.backgroundColor = '#E5E5E5';
            }
            const imgLI = document.querySelectorAll("[src$='lostHeart.png']");
            imgLI.forEach(img => {
                img.setAttribute('src', 'images/liveHeart.png');
              });
            addPhraseToDisplay(getRandomPhraseAsArray(phrases));
            missed = 0;
        });
    }
}


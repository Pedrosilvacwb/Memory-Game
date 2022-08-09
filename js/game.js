const grid = document.querySelector('.grid');
const characters = [
    'beth',
    'jerry',
    'jessica',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'summer',
    'meeseeks',
    'scroopy'
]
const player = document.querySelector('.player');
const timer = document.querySelector('.timer');

/* FUNÇÃO PARA CRIAR AS CARTAS */

const createElement = (tag, className) =>{
    const element = document.createElement(tag);
    element.className = className;

    return element;
}

/* COMPUTA JOGADA */
let firstCard = '';
let secondCard = '';

const revealCard = ({target}) =>{
    const card = target.parentNode;

    if(card.className.includes('reveal-card')){
        return
    }

    if(firstCard == ''){
        card.classList.add('reveal-card');
        firstCard = card;
    }else if(secondCard == ''){
        card.classList.add('reveal-card');
        secondCard = card;

        checkCards();
    }
   
    
}

const createCard = (carta) => {

    const card = createElement('div', 'card');
    

    const front = createElement('div', 'face front');
    front.style.backgroundImage = `url(../images/${carta}.png)`;
   
    const back = createElement('div', 'face back');

    card.append(front, back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-Character', carta);

    return card;
};

createCard();

/* RENDERIZAR O JOGO */

const loadGame = () => {

    const duplicateCharacters = [...characters, ...characters];

    const shiftedArray = duplicateCharacters.sort(() =>{
        return Math.random()- 0.5;
    });
    

    duplicateCharacters.forEach(carta => {

        const card = createCard(carta);
        grid.appendChild(card);
    })
}


/* FUNÇÃO PARA CONFERIR AS CARTAS */

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if(firstCharacter == secondCharacter) {
        
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard ='';
        secondCard = '';

        checkEndGame();

    }else{

        setTimeout(()=>{

            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard ='';
            secondCard = '';
        }, 1000)
       
    }
}


/* FUNÇÃO PARA VERIFICAR SE O JOGO ACABOU */

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if(disabledCards.length == 20){
        clearInterval(this.loop);
        alert(`Parabéns ${player.innerHTML}!!
        Seu tempo foi: ${timer.innerHTML}`);

        setTimeout(()=>{
            document.location.reload();
        }, 1000)
        
    }
}

/* FUNÇÃO DE TIMER */

const setTimer = () => {

    this.loop = setInterval(() => {
        let currentTimer = +timer.innerHTML;
        timer.innerHTML = currentTimer + 1;
    },1000);
}

/* FUNÇAO DE DISPLAY DO NOME */

window.onload = () => {

    const playerName = localStorage.getItem('player');
    player.innerHTML = playerName;
    setTimer();
    loadGame();
}





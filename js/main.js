const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
let playerHand = [];
let enemyHand = [];
const masterDeck = buildMasterDeck();
let winStatus = null;
let stash = [];
let addPRisk = [];
let addERisk = [];
const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
// Build deck -----------------------------------------------------------------
function buildMasterDeck() {
  const deck = [];
  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      deck.push({
        face: `${suit}${rank}`,
        value: Number(rank) || (rank === 'A' ? 14 : rank === 'K' ? 13 : rank ==='Q' ? 12 : 11)
      });
    });
  });
  return deck;
}
// Shuffle Deck ---------------------------------------------------------------
function getShuffledDeck() {
  const tempDeck = [...masterDeck];
  shuffledDeck = [];
  while (tempDeck.length) {
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    shuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
  }
  return shuffledDeck;
}
// Shuffle cards and begin the game -------------------------------------------
function getHands() {
  getShuffledDeck();
  playerHand = shuffledDeck.splice(0, 26);
  enemyHand = shuffledDeck.splice(0, 26);
}
function getCards() {
  playerDeck.setAttribute('class', 'card back animate__animated animate__flipInX');
  enemyDeck.setAttribute('class', 'card back animate__animated animate__flipInX');
  displayMess.innerHTML = 'Let the battle begin!';
  button.innerHTML = 'Battle!';
}
function firstButtonPush() {
  getHands();
  getCards();
  button.addEventListener('click', getWinner);
}
// Query selectors ------------------------------------------------------------
const playerCard = document.querySelector('#player-card');
const playerDeck = document.querySelector('#player-deck');
const enemyCard = document.querySelector('#enemy-card');
const enemyDeck = document.querySelector('#enemy-deck');
const displayMess = document.querySelector('#display-mess');
const button = document.querySelector('button');
const pRemaining = document.querySelector('#p-how-many');
const eRemaining = document.querySelector('#e-how-many');
const modalInput = document.querySelector('#tie-input');
const tieMessage = document.querySelector('#tie-message');
const firstTieModal = document.querySelector('#tie');
const modalButton = document.querySelector('#tie-button');
const playerCardTie = document.querySelector('#player-card-tie');
const enemyCardTie = document.querySelector('#enemy-card-tie');
const cardResult = document.querySelector('#card-result');
// Global event listener ------------------------------------------------------
button.addEventListener('click', firstButtonPush, { once: true });
// Change of view after battle without a tie-----------------------------------
function viewCardChange(pCard, eCard) {
  if (pCard.value % 2 === 0) {
    playerCard.setAttribute('class', `card ${pCard.face} animate__animated animate__slideInRight`);
    enemyCard.setAttribute('class', `card ${eCard.face} animate__animated animate__slideInLeft`);
  } else {
    playerCard.setAttribute('class', `card ${pCard.face} animate__animated animate__lightSpeedInRight`);
    enemyCard.setAttribute('class', `card ${eCard.face} animate__animated animate__lightSpeedInLeft`);
  }
  if (winStatus === true) {
    displayMess.innerHTML = 'Player wins this battle!';
  }
  if (winStatus === false) {
    displayMess.innerHTML = 'Enemy wins this battle :(';
  }
  pRemaining.innerHTML = `Player has ${playerHand.length} cards in deck.`
  eRemaining.innerHTML = `Enemy has ${enemyHand.length} cards in deck.`
}
// Function to determine simple win or send to tie event ----------------------
function getWinner() {
  let pCard = playerHand[0];
  let eCard = enemyHand[0];
  if (pCard.value > eCard.value) {
    winStatus = true;
    playerHand.push(pCard, eCard);
    playerHand.shift();
    enemyHand.shift();
  }
  if (pCard.value < eCard.value) {
    winStatus = false;
    enemyHand.push(pCard, eCard);
    playerHand.shift();
    enemyHand.shift();
  }
  if (pCard.value === eCard.value) {
    firstTie(pCard, eCard);
  }
  gameStatus();
  viewCardChange(pCard, eCard);
}
// Handle tie and tie view changes --------------------------------------------
function firstTie(pCard, eCard) {
  tieMessage.innerHTML = `It's a tie! How many cards would you like wager on the outcome of this war?  \
  You currently have ${playerHand.length - 1} cards. The enemy has ${enemyHand.length - 1} cards.`;
  modalInput.style.display = 'block';
  playerCardTie.setAttribute('class', `card ${pCard.face} animate__animated animate__fadeInUpBig`);
  enemyCardTie.setAttribute('class', `card ${eCard.face} animate__animated animate__fadeInUpBig`);
  firstTieModal.style.display = 'flex';
  modalButton.removeEventListener('click', resolveSecondTie);
  modalButton.removeEventListener('click', resolveSecondTieButton);
  modalButton.removeEventListener('click', resolveSecondTie);
  modalButton.removeEventListener('click', tieButtonSecond);
  modalButton.addEventListener('click', tieButtonFirst);
  if (playerHand.length <= 3 || enemyHand.length <= 3) {
    gameOver();
  }
}
function tieButtonFirst() {
  tieMessage.innerHTML = `You have decided to wager ${parseInt(modalInput.value)} cards!`;
  decideTie();
}
function decideTie() {
  if (parseInt(modalInput.value) < playerHand.length - 2 && parseInt(modalInput.value) < enemyHand.length - 2 && parseInt(modalInput.value) != NaN && parseInt(modalInput.value) > 0) {
    const risk = parseInt(modalInput.value);
    modalInput.value = '';
    const pRisk = playerHand.splice(0, (risk + 1));
    const eRisk = enemyHand.splice(0, (risk + 1));
    let pCard = playerHand[0];
    let eCard = enemyHand[0];

    if (pCard.value > eCard.value) {
      pRisk.forEach(function(obj) {
        playerHand.push(obj);
      });
      eRisk.forEach(function(obj) {
        playerHand.push(obj);
      });
      playerHand.push(pCard, eCard);
      playerHand.shift();
      enemyHand.shift();
      winStatus = true;
      gameStatus();
      changeTieView(winStatus, pCard, eCard, pRisk);
    }
    if (pCard.value < eCard.value) {
      pRisk.forEach(function(obj) {
        enemyHand.push(obj);
      });
      eRisk.forEach(function(obj) {
        enemyHand.push(obj);
      });
      enemyHand.push(pCard, eCard);
      playerHand.shift();
      enemyHand.shift();
      winStatus = false;
      gameStatus();
      changeTieView(winStatus, pCard, eCard, pRisk);
    }
    if (pCard.value === eCard.value) {
      secondTie(pCard, eCard, pRisk, eRisk);
    }
  } else {
    pCard = playerHand[0];
    eCard = enemyHand[0];
    firstTie(pCard, eCard);
  }
}
function changeTieView(winStatus, pCard, eCard, pRisk) {
  tieMessage.innerHTML = (winStatus === true) ? `You have won this war!` : `You lost the war!! :(`;
  playerCardTie.setAttribute('class', `card ${pCard.face} animate__animated animate__jackInTheBox`);
  enemyCardTie.setAttribute('class', `card ${eCard.face} animate__animated animate__jackInTheBox`);
  cardResult.innerHTML = (winStatus === true) ? `You have GAINED ${pRisk.length * 2 + 2} cards!` : `ENEMY has won ${pRisk.length * 2 + 2} cards`;
  modalButton.innerHTML = 'Continue';
  modalInput.style.display = 'none';
  modalButton.removeEventListener('click', tieButtonFirst);
  modalButton.removeEventListener('click', resolveSecondTie);
  modalButton.removeEventListener('click', resolveSecondTieButton);
  modalButton.removeEventListener('click', resolveSecondTie);
  modalButton.addEventListener('click', tieButtonSecond);
  firstTieModal.style.display = 'flex';
}
function tieButtonSecond() {
  firstTieModal.style.display = 'none';
  cardResult.innerHTML = '';
  getWinner();
}
// Determine if cards are still available and end game if necessary -----------
function gameStatus() {
  if (playerHand.length === 0 || enemyHand.length === 0) {
    gameOver();
  } else {
    return;
  }
}
function gameOver() {
  playerCardTie.style.display = 'none';
  enemyCardTie.style.display = 'none';
  modalInput.style.display = 'none';
  cardResult.style.display = 'none';
  modalButton.innerHTML = 'Play Again!'
  modalButton.removeEventListener('click', tieButtonFirst);
  modalButton.removeEventListener('click', resolveSecondTie);
  modalButton.removeEventListener('click', resolveSecondTieButton);
  modalButton.removeEventListener('click', resolveSecondTie);
  tieMessage.innerHTML = (playerHand.length >= 4) ? `Congratulations! You've WON the game!` : `I'm sorry for your loss! Please play again!`;
  firstTieModal.style.display = 'flex';
  modalButton.addEventListener('click', function() {
    window.location.reload();
  });
}
// if any additional ties occur as the result of a primary tie event ----------
function secondTie(pCard, eCard, pRisk, eRisk) {
    pRisk.forEach(function(obj) {
      stash.push(obj);
    });
    eRisk.forEach(function(obj) {
      stash.push(obj);
    });
    stash.push(pCard, eCard);
    secondTieView(pCard, eCard);
    if (playerHand.length <= 3 || enemyHand.length <= 3) {
      gameOver();
    }
}
function secondTieView(pCard, eCard) {
  tieMessage.innerHTML = `ANOTHER Tie! There is currently ${stash.length} cards at risk!  \
  You will only risk an additional two cards this tie.`
  modalButton.innerHTML = 'Continue';
  playerCardTie.setAttribute('class', `card ${pCard.face} animate__animated animate__fadeInUpBig`);
  enemyCardTie.setAttribute('class', `card ${eCard.face} animate__animated animate__fadeInUpBig`);
  modalInput.style.display = 'none';
  cardResult.style.display = 'none';
  firstTieModal.style.display = 'flex';
  modalButton.removeEventListener('click', tieButtonFirst);
  modalButton.removeEventListener('click', tieButtonSecond);
  modalButton.removeEventListener('click', resolveSecondTie);
  modalButton.removeEventListener('click', resolveSecondTieButton);
  modalButton.addEventListener('click', resolveSecondTie);
}
function resolveSecondTie() {
  playerHand.shift();
  enemyHand.shift();
  if (playerHand.length <= 3 || enemyHand.length <= 3) {
    gameOver();
  }
  addPRisk = playerHand.splice(0, 2);
  addERisk = enemyHand.splice(0, 2);
  pCard = playerHand[0];
  eCard = enemyHand[0];
  if (pCard.value > eCard.value) {
    addPRisk.forEach(function(obj) {
      playerHand.push(obj);
    });
    addERisk.forEach(function(obj) {
      playerHand.push(obj);
    });
    stash.forEach(function(obj) {
      playerHand.push(obj);
    });
    playerHand.push(pCard, eCard);
    playerHand.shift();
    enemyHand.shift();
    winStatus = true;
    gameStatus();
    secondChangeTieView(pCard, eCard);
  }
  if (pCard.value < eCard.value) {
    addPRisk.forEach(function(obj) {
      enemyHand.push(obj);
    });
    addERisk.forEach(function(obj) {
      enemyHand.push(obj);
    });
    stash.forEach(function(obj) {
      enemyHand.push(obj);
    });
    enemyHand.push(pCard, eCard);
    playerHand.shift();
    enemyHand.shift();
    winStatus = false;
    gameStatus();
    secondChangeTieView(pCard, eCard);
  }
  if (pCard.value === eCard.value) {
    addPRisk.forEach(function(obj) {
      stash.push(obj);
    });
    addERisk.forEach(function(obj) {
      stash.push(obj);
    });
    stash.push(pCard, eCard);
    secondTieView(pCard, eCard);
  }
}
function secondChangeTieView(pCard, eCard) {
  firstTieModal.style.display = 'flex';
  tieMessage.innerHTML = (winStatus === true) ? `You have WON this war!` : `You LOST the war!! :(`;
  playerCardTie.setAttribute('class', `card ${pCard.face} animate__animated animate__jackInTheBox`);
  enemyCardTie.setAttribute('class', `card ${eCard.face} animate__animated animate__jackInTheBox`);
  cardResult.innerHTML = (winStatus === true) ? `You have GAINED ${stash.length + addPRisk.length + addERisk.length + 2} cards!` : `You have LOST out on ${stash.length + addPRisk.length + addERisk.length + 2} cards`;
  cardResult.style.display = 'block';
  modalButton.innerHTML = 'Continue';
  modalInput.style.display = 'none';
  modalButton.removeEventListener('click', tieButtonFirst);
  modalButton.removeEventListener('click', resolveSecondTie);
  modalButton.removeEventListener('click', tieButtonSecond);
  modalButton.addEventListener('click', resolveSecondTieButton);
}
function resolveSecondTieButton() {
  stash = [];
  addPRisk = [];
  addERisk = [];
  cardResult.innerHTML = '';
  firstTieModal.style.display = 'none';
  getWinner();
}
if (vw < 1125) {
  alert('This game is best enjoyed on a desktop screen!')
}

// alert('bitch you connected!');
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
let playerHand = [];
let enemyHand = [];
const masterDeck = buildMasterDeck();
let winStatus = null;


// ----------------------------------------------------------
// Build deck
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

// --------------------------------------------------------
// Shuffle Deck
function getShuffledDeck() {
  const tempDeck = [...masterDeck];
  shuffledDeck = [];
  while (tempDeck.length) {
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    shuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
  }
  return shuffledDeck;
}

function getHands() {
  getShuffledDeck();
  playerHand = shuffledDeck.splice(0, 26);
  enemyHand = shuffledDeck.splice(0, 26);
}
// Query selectors ----------------------------
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
// -----------------------------------

button.addEventListener('click', firstButtonPush, { once: true });

function viewCardChange(pCard, eCard) {
  console.log(playerHand, enemyHand, 'inside of the viewCardChange function');
  if (pCard.value % 2 === 0) {
    playerCard.setAttribute('class', `card ${pCard.face} xlarge animate__animated animate__slideInRight`);
    enemyCard.setAttribute('class', `card ${eCard.face} xlarge animate__animated animate__slideInLeft`);
  } else {
    playerCard.setAttribute('class', `card ${pCard.face} xlarge animate__animated animate__lightSpeedInRight`);
    enemyCard.setAttribute('class', `card ${eCard.face} xlarge animate__animated animate__lightSpeedInLeft`);
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
function getCards() {
  playerDeck.setAttribute('class', 'card back xlarge animate__animated animate__flipInX');
  enemyDeck.setAttribute('class', 'card back xlarge animate__animated animate__flipInX');
  displayMess.innerHTML = 'Let the battle begin!';
  button.innerHTML = 'Battle!';
}
function getWinner() {
  console.log(playerHand, enemyHand, 'just inside of getWinner--');
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
  viewCardChange(pCard, eCard);
}
//     if (pCard.value === eCard.value) {
//       const stash = [];
//       stash.forEach(function(obj) {
//         enemyHand.push(obj);
//       });
//       stash.forEach(function(obj) {
//         enemyHand.push(obj);
//       });
//       stash.push(pCard, eCard);
//       console.log(stash, 'stash in its if statement');
//       alert(`It's a tie again! You are risking just an additional two cards`)
//       const addPRisk = playerHand.splice(0, 2);
//       const addERisk = enemyCard.splice(0, 2);
//       pCard = playerHand[0];
//       eCard = enemyHand[0];
//       if (pCard.value > eCard.value) {
//         pRisk.forEach(function(obj) {
//           playerHand.push(obj);
//         });
//         eRisk.forEach(function(obj) {
//           playerHand.push(obj);
//         });
//         stash.forEach(function(obj) {
//           playerHand.push(obj);
//         });
//         playerHand.push(pCard, eCard);
//         console.log(playerHand, enemyHand, 'inside player win');
//         alert(`Outcome: ${pCard.face} vs. ${eCard.face} You've won!`);
//         playerHand.shift();
//         enemyHand.shift();
//         winStatus = true;
//       }
//       if (pCard.value < eCard.value) {
//         pRisk.forEach(function(obj) {
//           enemyHand.push(obj);
//         });
//         eRisk.forEach(function(obj) {
//           enemyHand.push(obj);
//         });
//         stash.forEach(function(obj) {
//           enemyHand.push(obj);
//         });
//         enemyHand.push(pCard, eCard);
//         console.log(playerHand, enemyHand, 'inside enemy win');
//         alert(`Enemy just won ${pRisk.length + eRisk.length + 2} Outcome:
//           ${pCard.face} vs. ${eCard.face}`);
//         playerHand.shift();
//         enemyHand.shift();
//         winStatus = false;
//       }
//       if (pCard.value === eCard.value) {
//         alert('I give up for now')
//       }
//     }
//   }
//   console.log(playerHand, enemyHand, 'at the very end of get win');
// }

function firstButtonPush() {
  getHands();
  getCards();
  button.addEventListener('click', getWinner);
  console.log(playerHand, 'playerHand after firstButtonPush');
}
function firstTie(pCard, eCard) {
  tieMessage.innerHTML = `It's a tie! How many cards would you like wager on the outcome of this war?  \
  You currently have ${playerHand.length} cards in your hand.`;
  // modalInput.removeAttribute('disabled');
  modalInput.style.display = 'block';
  playerCardTie.setAttribute('class', `card xlarge ${pCard.face} animate__animated animate__fadeInUpBig`);
  enemyCardTie.setAttribute('class', `card xlarge ${eCard.face} animate__animated animate__fadeInUpBig`);
  firstTieModal.style.display = 'flex';
  modalButton.addEventListener('click', tieButtonFirst);
}
function tieButtonFirst() {
  tieMessage.innerHTML = `You have decided to wager ${parseInt(modalInput.value)} cards!`;
  // modalButton.style.display = 'none';
  // modalInput.style.display = 'none';
  decideTie();
}
function decideTie() {
  const risk = modalInput.value;
  const atRisk = parseInt(risk);
  const pRisk = playerHand.splice(0, atRisk);
  const eRisk = enemyHand.splice(0, atRisk);
  console.log(pRisk, eRisk, 'inside the tie if');
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
    console.log(playerHand, enemyHand, 'inside player win');
    // alert(`Outcome: ${pCard.face} vs. ${eCard.face} You've won!`);
    playerHand.shift();
    enemyHand.shift();
    winStatus = true;
  }
  if (pCard.value < eCard.value) {
    pRisk.forEach(function(obj) {
      enemyHand.push(obj);
    });
    eRisk.forEach(function(obj) {
      enemyHand.push(obj);
    });
    enemyHand.push(pCard, eCard);
    console.log(playerHand, enemyHand, 'inside enemy win');
    // alert(`Enemy just won ${pRisk.length + eRisk.length + 2} Outcome:
    //   ${pCard.face} vs. ${eCard.face}`);
    playerHand.shift();
    enemyHand.shift();
    winStatus = false;
  }
  if (pCard.value === eCard.value) {
    alert('not yet baby!');
  }
  changeTieView(winStatus, pCard, eCard, pRisk);
}

function changeTieView(winStatus, pCard, eCard, pRisk) {
  firstTieModal.style.display = 'flex';
  tieMessage.innerHTML = (winStatus === true) ? `You have won this war!` : `You lost the war!! :(`;
  playerCardTie.setAttribute('class', `card xlarge ${pCard.face} animate__animated animate__jackInTheBox`);
  enemyCardTie.setAttribute('class', `card xlarge ${eCard.face} animate__animated animate__jackInTheBox`);
  cardResult.innerHTML = (winStatus === true) ? `You have gained ${pRisk.length * 2 + 2} cards!` : `You have lost ${pRisk.length * 2 + 2} cards`;
  modalButton.innerHTML = 'Continue';
  // modalButton.style.display = 'inline';
  modalInput.style.display = 'none';
  modalButton.removeEventListener('click', tieButtonFirst);
  modalButton.addEventListener('click', tieButtonSecond);
}
function tieButtonSecond() {
  firstTieModal.style.display = 'none';
  cardResult.innerHTML = '';
  getWinner();
}
function gameStatus() {
  if (playerHand <= 0 || enemyHand <= 0) {
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
  tieMessage.innerHTML = (playerHand >= 0) ? `Congratulations! You've won the game!` : `I'm sorry for your loss! Please play again`;
  firstTieModal.style.display = 'flex';
  modalButton.addEventListener('click', function() {
    window.location.reload();
  });
}

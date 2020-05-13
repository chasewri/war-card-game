// alert('bitch you connected!');
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
let playerHand = [];
let enemyHand = [];
const masterDeck = buildMasterDeck();


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
  return playerHand && enemyHand;
}

const playerCard = document.querySelector('#player-card');
const playerDeck = document.querySelector('#player-deck');
const enemyCard = document.querySelector('#enemy-card');
const enemyDeck = document.querySelector('#enemy-deck');
const displayMess = document.querySelector('#display-mess');
const button = document.querySelector('button');
const pRemaining = document.querySelector('#p-how-many');
const eRemaining = document.querySelector('#e-how-many');

button.addEventListener('click', firstButtonPush, { once: true });

// console.log(pCard, 'global --');
function viewCardChange(winStatus, pCard, eCard, playerHand, enemyHand) {
  console.log(playerHand, enemyHand, 'inside of the viewCardChange function');
  playerCard.setAttribute('class', `card ${pCard.face} xlarge animate__animated animate__slideInRight`);
  enemyCard.setAttribute('class', `card ${eCard.face} xlarge animate__animated animate__slideInLeft`);
    if (winStatus === true) {
      displayMess.innerHTML = 'Player wins this battle!';
    }
    if (winStatus === false) {
      displayMess.innerHTML = 'Enemy wins this battle :(';
    }
  pRemaining.innerHTML = `Player has ${playerHand.length} cards in deck.`
  eRemaining.innerHTML = `Enemy has ${enemyHand.length} cards in deck.`
  return playerHand && enemyHand;
}
function getCards() {
  playerDeck.setAttribute('class', 'card back xlarge animate__animated animate__flipInX');
  enemyDeck.setAttribute('class', 'card back xlarge animate__animated animate__flipInX');
  displayMess.innerHTML = 'Let the battle begin!';
  button.innerHTML = 'Battle!';
}
function getWinner(playerHand, enemyHand) {
  console.log(playerHand, enemyHand, 'just inside of getWinner--');
  let pCard = playerHand[0];
  let eCard = enemyHand[0];
  let winStatus;
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
    const risk = prompt(`It's a war! ${pCard.face} vs. ${eCard.face}! How many cards
    would you like to wager?`);
    const atRisk = parseInt(risk);
    const pRisk = playerHand.splice(0, atRisk);
    const eRisk = enemyHand.splice(0, atRisk);
    pCard = playerHand[0];
    eCard = enemyHand[0];

    if (pCard.value > eCard.value) {
      pRisk.forEach(function(obj) {
        playerHand.push(obj);
      });
      eRisk.foreach(function(obj) {
        playerHand.push(obj);
      });
      playerHand.push(pCard, eCard);
      console.log(playerHand, enemyHand, 'inside player win');
      alert(`Outcome: ${pCard.face} vs. ${eCard.face} You've won!`);
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
      alert(`Enemy just won ${pRisk.length + eRisk.length + 2} Outcome:
        ${pCard.face} vs. ${eCard.face}`);
      playerHand.shift();
      enemyHand.shift();
      winStatus = false;
    }
    if (pCard.value === eCard.value) {
      const stash = [];
      stash.forEach(function(obj) {
        enemyHand.push(obj);
      });
      stash.forEach(function(obj) {
        enemyHand.push(obj);
      });
      stash.push(pCard, eCard);
      console.log(stash, 'stash in its if statement');
      alert(`It's a tie again! You are risking just an additional two cards`)
      const addPRisk = playerHand.splice(0, 2);
      const addERisk = enemyCard.splice(0, 2);
      pCard = playerHand[0];
      eCard = enemyHand[0];
      if (pCard.value > eCard.value) {
        pRisk.forEach(function(obj) {
          playerHand.push(obj);
        });
        eRisk.foreach(function(obj) {
          playerHand.push(obj);
        });
        stash.forEach(function(obj) {
          playerHand.push(obj);
        });
        playerHand.push(pCard, eCard);
        console.log(playerHand, enemyHand, 'inside player win');
        alert(`Outcome: ${pCard.face} vs. ${eCard.face} You've won!`);
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
        stash.forEach(function(obj) {
          enemyHand.push(obj);
        });
        enemyHand.push(pCard, eCard);
        console.log(playerHand, enemyHand, 'inside enemy win');
        alert(`Enemy just won ${pRisk.length + eRisk.length + 2} Outcome:
          ${pCard.face} vs. ${eCard.face}`);
        playerHand.shift();
        enemyHand.shift();
        winStatus = false;
      }
      if (pCard.value === eCard.value) {
        alert('I give up for now')
      }
    }
  }
  console.log(playerHand, enemyHand, 'at the very end of get win');
  viewCardChange(winStatus, pCard, eCard, playerHand, enemyHand);
  return playerHand && enemyHand && pCard && eCard;
}

function firstButtonPush() {
  getHands();
  getCards();
  button.addEventListener('click', function(){getWinner(playerHand, enemyHand)});
  console.log(playerHand, 'playerHand after firstButtonPush');
  return playerHand && enemyHand;
}

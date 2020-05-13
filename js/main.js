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
  // Use nested forEach to generate card objects
  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      deck.push({
        // The 'face' property maps to the library's CSS classes for cards
        face: `${suit}${rank}`,
        // Setting the 'value' property for game of blackjack, not war
        value: Number(rank) || (rank === 'A' ? 14 : rank === 'K' ? 13 : rank ==='Q' ? 12 : 11)
      });
    });
  });
  return deck;
}

// --------------------------------------------------------
// Shuffle Deck
function getShuffledDeck() {
  // Create a copy of the masterDeck (leave masterDeck untouched!)
  const tempDeck = [...masterDeck];
  shuffledDeck = [];
  while (tempDeck.length) {
    // Get a random index for a card still in the tempDeck
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
    shuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
    // console.log(shuffledDeck)
  }
  return shuffledDeck;
}

function getHands() {
  getShuffledDeck();
  playerHand = shuffledDeck.splice(0, 26);
  // console.log(playerHand);
  enemyHand = shuffledDeck.splice(0, 26);
  // console.log(enemyHand);
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
    // button.addEventListener('click', function(){render(pCard, eCard, playerHand, enemyHand)});
}
function getWinner(playerHand, enemyHand) {
  console.log(playerHand, enemyHand, 'just inside of getWinner--');
  let pCard = playerHand[0];
  // console.log(pCard, 'in get winner here --');
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
    // warTime(playerHand, enemyHand, pCard, eCard);
    const risk = prompt(`It's a war! ${pCard.face} vs. ${eCard.face}! How many cards
    would you like to wager?`);
    // console.log(risk);
    const atRisk = parseInt(risk);
    // console.log(atRisk);
    // risknumber splice those cards from each deck.
    // const pHandCopy = [...playerHand];
    // const eHandCopy = [...enemyHand];
    const pRisk = playerHand.splice(0, atRisk);
    // console.log(pRisk);
    const eRisk = enemyHand.splice(0, atRisk);
      // console.log(eRisk);
    // console.log(playerHand, 'should be new player hand minus risk');
    // the flip over the next card
    pCard = playerHand[0];
    eCard = enemyHand[0];
    // console.log(pCard, 'new pCard should be here');
    // console.log(eCard, 'should be new ecard here too');
    if (pCard.value > eCard.value) {
      // playerHand = playerHand.concat(pRisk, eRisk);
      pRisk.forEach(function(obj) {
        playerHand.push(obj);
      });
      eRisk.foreach(function(obj) {
        playerHand.push(obj);
      });
      // console.log(playerHand);
      // playerHand = playerHand.concat(eRisk);
      // console.log(playerHand);
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
      // console.log(enemyHand);
      // enemyHand = enemyHand.concat(eRisk);
      // console.log(enemyHand);
      enemyHand.push(pCard, eCard);
      console.log(playerHand, enemyHand, 'inside enemy win');
      alert(`Enemy just won ${pRisk.length + eRisk.length + 2} Outcome: ${pCard.face} vs. ${eCard.face}`);
      playerHand.shift();
      enemyHand.shift();
      winStatus = false;
    }
    if (pCard.value === eCard.value) {
      alert('Go fuck yourself for now');
    }
  }
  console.log(playerHand, enemyHand, 'at the very end of get win');
  viewCardChange(winStatus, pCard, eCard, playerHand, enemyHand);
  // button.removeEventListener('click', function(){nextButtonPushes(playerHand, enemyHand)}, { once: true });
  // button.addEventListener('click', function(){nextButtonPushes(playerHand, enemyHand)}, { once: true });
  return playerHand && enemyHand && pCard && eCard;
}

function firstButtonPush() {
  getHands();
  getCards();
  button.addEventListener('click', function(){getWinner(playerHand, enemyHand)});
  console.log(playerHand, 'playerHand after firstButtonPush');
  return playerHand && enemyHand;
}
// function nextButtonPushes(playerHand, enemyHand) {
//   console.log(playerHand, enemyHand, 'in nextButtonPushes before getWinner call');
//   getWinner(playerHand, enemyHand);
//   console.log(playerHand, enemyHand, 'in nextButtonPushes after getWinner call');
//
// }
function warTime(playerHand, enemyHand, pCard, eCard) {
  // light box to ask how many cards the player wants to risk

  // viewCardChange(winStatus, pCard, eCard);
  // return playerHand && enemyHand;
}

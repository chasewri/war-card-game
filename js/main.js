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
function viewCardChange(winStatus, pCard, eCard) {
  playerCard.setAttribute('class', `card ${pCard.face} xlarge`);
  enemyCard.setAttribute('class', `card ${eCard.face} xlarge`);
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
  playerDeck.setAttribute('class', 'card back xlarge');
  enemyDeck.setAttribute('class', 'card back xlarge');
  displayMess.innerHTML = 'Let the battle begin!';
  button.innerHTML = 'Battle!';
    // button.addEventListener('click', function(){render(pCard, eCard, playerHand, enemyHand)});
}
function getWinner(playerHand, enemyHand) {
  const pCard = playerHand[0];
  console.log(pCard, 'in get winner here --');
  const eCard = enemyHand[0];
  let winStatus;
  if (pCard.value > eCard.value) {
    winStatus = true;
    playerHand.push(pCard, eCard);
  }
  if (pCard.value < eCard.value) {
    winStatus = false;
    enemyHand.push(pCard, eCard);
  }
  if (pCard.value === eCard.value) {
    warTime(playerHand, enemyHand, pCard, eCard);
  }
  viewCardChange(winStatus, pCard, eCard);
  playerHand.shift();
  enemyHand.shift();
  return playerHand && enemyHand;
}

function firstButtonPush() {
  getHands();
  getCards();
  button.addEventListener('click', nextButtonPushes);
  console.log(playerHand, 'playerHand after firstButtonPush');
  return playerHand && enemyHand;
}
function nextButtonPushes() {
  getWinner(playerHand, enemyHand);
}
function warTime(playerHand, enemyHand, pCard, eCard) {
  // light box to ask how many cards the player wants to risk
  const risk = prompt('How many cards would you like to wager?');
  console.log(risk);
  const atRisk = parseInt(risk);
  console.log(atRisk);
  // risknumber splice those cards from each deck.
  const pRisk = playerHand.splice(0, atRisk);
  pRisk.unshift(pCard);
  console.log(pRisk);
  const eRisk = enemyHand.splice(0, atRisk);
  eRisk.unshift(eCard);
  console.log(eRisk);
  console.log(playerHand, 'should be new player hand minus risk');
  // the flip over the next card
  pCard = playerHand[0];
  eCard = enemyHand[0];
  console.log(pCard, 'new pCard should be here');
  console.log(eCard, 'should be new ecard here too');
  if (pCard.value > eCard.value) {
    playerHand.push(pRisk, eRisk, pCard, eCard);
    console.log(playerHand, enemyHand);
    alert(`You just won ${pRisk.length + eRisk.length + 2} cards!`)
    playerHand.pop();
    enemyHand.pop();
  }
  if (pCard.value < eCard.value) {
    enemyHand.push(pRisk, eRisk, pCard, eCard)
    console.log(playerHand, enemyHand);
    alert(`Enemy just won ${pRisk.length + eRisk.length + 2} cards!`)
    playerHand.pop();
    enemyHand.pop();
  }
}

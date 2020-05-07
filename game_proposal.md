# Project 1 - Card Game Proposal

## Game : War
The game I have chosen is war. The card game where players randomly draw cards, and the player who has drawn the card with the highest value wins
the current battle.

## Wireframe

![War Wireframe](https://imgur.com/5E7GGXD.png)

The game has a title, a display message stating who won the last battle,
displays the cards each player has drawn, and displays the number of battles won by each player in the current war.

## Pseudocode
```
variables:
- array of all cards in deck
- arrays of each player's cards
- array of cards played on current turn

- counts of both player's wins
```

```
init:
- randomly push half of the deck cards to each player's deck

onClick:
- push new cards to current cards array one from each player's deck
- compare values of cards, find winner
- add to winner's count
- push current played cards to winner's deck
- call checkWinner
- call render

checkWinner:
-check that both players still have cards remaining

render:
-init render
-update cards in play
-update winner of current battle

```

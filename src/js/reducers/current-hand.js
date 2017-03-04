// @flow
import type { FSA } from 'types/redux';
import type { Card, CurrentHand, Player, PlayerID, Trick } from 'types/hearts';

import _ from 'lodash';
import {
  NUMBER_OF_PLAYERS,
  removeCardFromCards,
  determineWinningPlayerForTrick,
} from 'utils/cards';
import {
  DEAL_CARDS,
  START_HAND,
  PLAYER_PLAY_CARD,
} from 'actions/hearts';

export const defaultState: CurrentHand = {
  number: 0,
  phase: 'PLAY',
  orderOfPlay: [],
  heartsBroken: false,
  currentTrick: null,
  players: {},
};

function removeCardFromPlayer(player: Player, card: Card): Player {
  const playerClone = _.cloneDeep(player);
  const playerCards: Array<Card> = playerClone.cards;
  playerClone.cards = removeCardFromCards(playerCards, card);
  return playerClone;
}

function currentHand(state: CurrentHand = defaultState, action: FSA): CurrentHand {
  switch (action.type) {
    case DEAL_CARDS:
      {
        const players = {};
        _.range(NUMBER_OF_PLAYERS).forEach((number) => {
          players[number] = {
            cards: action.payload[number],
            wonTricks: [],
          };
        });
        return {
          ...state,
          orderOfPlay: _.range(NUMBER_OF_PLAYERS),
          players,
        };
      }
    case START_HAND:
      {
        const newState: CurrentHand = _.cloneDeep(state);
        const twoClubs: Card = { rank: '2', suit: 'Clubs' };
        let playerIDWithTwoClubs: ?PlayerID = null;
        _.forEach(_.range(NUMBER_OF_PLAYERS), (playerID: PlayerID) => {
          if (_.find(newState.players[playerID].cards, twoClubs)) {
            playerIDWithTwoClubs = playerID;
            return false;
          }
          return true;
        });
        if (playerIDWithTwoClubs == null) {
          return newState;
        }
        newState.currentTrick = {
          number: 0,
          ledByPlayer: playerIDWithTwoClubs,
          currentPlayer: playerIDWithTwoClubs,
          cards: [],
        };
        return newState;
      }
    case PLAYER_PLAY_CARD:
      {
        const newState: CurrentHand = _.cloneDeep(state);
        const card: Card = action.payload.card;
        const playerID: PlayerID = action.payload.playerID;
        const indexOfCurrentPlayer: number = _.indexOf(newState.orderOfPlay, playerID);
        const indexOfNextPlayer: number = (indexOfCurrentPlayer + 1) % NUMBER_OF_PLAYERS;
        const nextPlayerID: PlayerID = newState.orderOfPlay[indexOfNextPlayer];
        if (newState.currentTrick == null) {
          return newState;
        }

        if (card.suit === 'Hearts') {
          newState.heartsBroken = true;
        }

        const currentTrick: Trick = newState.currentTrick;
        currentTrick.currentPlayer = nextPlayerID;
        currentTrick.cards.push({
          byPlayer: playerID,
          card,
        });
        newState.players[playerID] = removeCardFromPlayer(newState.players[playerID], card);

        if (currentTrick != null &&
          currentTrick.cards.length !== NUMBER_OF_PLAYERS) {
          // More cards left to make up a trick. Continue playing.
          newState.currentTrick = currentTrick;
          return newState;
        }

        const winningPlayerID: PlayerID = determineWinningPlayerForTrick(currentTrick);
        newState.players[winningPlayerID].wonTricks.push(currentTrick);
        newState.currentTrick = {
          number: currentTrick.number + 1,
          ledByPlayer: winningPlayerID,
          currentPlayer: winningPlayerID,
          cards: [],
        };
        return newState;
      }
    default:
      return state;
  }
}

export default currentHand;

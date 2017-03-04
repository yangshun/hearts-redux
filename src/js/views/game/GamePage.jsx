// @flow
import type { StoreState } from 'reducers';
import type { PlayerID, Player, Card, Trick, PlayedCard } from 'types/hearts';

import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import {
  dealCards,
  startHand,
  playerPlayCard,
} from 'actions/hearts';
import {
  pointsForPlayer,
  allowedToPlayCard,
} from 'utils/cards';

import './GamePage.scss';

type Props = {
  handNumber: number,
  heartsBroken: boolean,
  currentTrick: Trick,
  players: {
    [id: PlayerID]: Player,
  },
  dealCards: Function,
  startHand: Function,
  playerPlayCard: Function,
};

export const GamePage = (props: Props) => (
  <div>
    <h6>Hand: {props.handNumber}</h6>
    <h6>Hearts Broken: {props.heartsBroken.toString()}</h6>
    <button className="btn btn-primary" onClick={() => {
      props.dealCards();
      props.startHand();
    }}
    >
      Deal
    </button>
    {props.currentTrick &&
      <div>
        <hr/>
        Cards Played:
        {props.currentTrick.cards.map((playedCard: PlayedCard) => {
          const card: Card = playedCard.card;
          return (
            <span key={card.rank + card.suit}>
              &nbsp;{card.rank} {card.suit} (P{playedCard.byPlayer})&nbsp;
            </span>
          );
        })}
      </div>
    }
    <hr/>
    <div className="row">
      {Object.keys(props.players).map((number) => {
        const playerID: PlayerID = parseInt(number, 10);
        const player: Player = props.players[playerID];
        const isCurrentPlayer = props.currentTrick && props.currentTrick.currentPlayer === playerID;
        return (
          <div className={classnames('col-md-3', {
            'player-idle': !isCurrentPlayer,
          })}
            key={playerID}
          >
            <h6>Player {playerID}{' '}
              {isCurrentPlayer && '(Curr)'}
            </h6>
            <p>Points won: {pointsForPlayer(player)}</p>
            <hr/>
            <div>{player.cards.map((card: Card) => {
              const allowed = props.currentTrick.currentPlayer === playerID &&
                allowedToPlayCard(props.currentTrick, props.heartsBroken,
                  player.cards, card)
              return (
                <div key={card.rank + card.suit}
                  onClick={() => {
                    props.playerPlayCard(playerID, card);
                  }}
                  className={classnames('card', {
                    allowed,
                    'not-allowed': !allowed,
                  })}
                >
                  &nbsp;{card.rank}&nbsp;{card.suit}&nbsp;
                </div>
              );
            })}</div>
          </div>
        );
      })}
    </div>
  </div>
);

export function mapStateToProps(state: StoreState) {
  return {
    handNumber: state.currentHand.number,
    heartsBroken: state.currentHand.heartsBroken,
    currentTrick: state.currentHand.currentTrick,
    players: state.currentHand.players,
  };
}

export default connect(
  mapStateToProps,
  {
    dealCards,
    startHand,
    playerPlayCard,
  },
)(GamePage);

// @flow
import type { StoreState } from 'reducers';
import type { PlayerID, Player, Card, Trick, PlayedCard, PlayerScores } from 'types/hearts';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import {
  dealCards,
  startHand,
  playerPlayCard,
  transferScores,
  resetAll,
} from 'actions/hearts';
import {
  pointsForPlayer,
  allowedToPlayCard,
} from 'utils/cards';

import './GamePage.scss';

type Props = {
  playerScores: PlayerScores,
  handNumber: number,
  heartsBroken: boolean,
  currentTrick: Trick,
  players: {
    [id: PlayerID]: Player,
  },
  dealCards: Function,
  startHand: Function,
  playerPlayCard: Function,
  transferScores: Function,
  resetAll: Function,
};

/* eslint-disable react/prefer-stateless-function */
export class GamePage extends Component {
  props: Props;

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <h6>Hand: {this.props.handNumber + 1}</h6>
            {this.props.currentTrick &&
              <div>
                <h6>Trick: {this.props.currentTrick.number === 13 ? '-' :
                  this.props.currentTrick.number + 1}
                </h6>
                <h6>Hearts Broken: {this.props.heartsBroken.toString()}</h6>
              </div>
            }
            <button className="btn btn-primary" onClick={() => {
              if (this.props.currentTrick && this.props.currentTrick.number === 13) {
                this.props.transferScores();
              }
              this.props.dealCards();
              this.props.startHand();
            }}
            >
              {this.props.currentTrick && this.props.currentTrick.number === 13 ?
                'Next hand' : 'Deal'
              }
            </button>
            <button className="btn btn-danger" onClick={this.props.resetAll}>
              Reset
            </button>
          </div>
          <div className="col-md-6">
            <h4>Scores</h4>
            <ul>
              {Object.keys(this.props.playerScores).map((number) => {
                const playerID: PlayerID = parseInt(number, 10);
                return (
                  <li>Player {playerID}: {this.props.playerScores[playerID]}</li>
                );
              })}
            </ul>
          </div>
        </div>
        {this.props.currentTrick &&
          <div>
            <hr/>
            Cards Played<br/>
            {this.props.currentTrick.cards.map((playedCard: PlayedCard) => {
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
          {Object.keys(this.props.players).map((number) => {
            const playerID: PlayerID = parseInt(number, 10);
            const player: Player = this.props.players[playerID];
            const isCurrentPlayer = this.props.currentTrick &&
              this.props.currentTrick.currentPlayer === playerID;
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
                  const allowed = this.props.currentTrick.currentPlayer === playerID &&
                    allowedToPlayCard(this.props.currentTrick, this.props.heartsBroken,
                      player.cards, card);
                  return (
                    <div key={card.rank + card.suit}
                      onClick={() => {
                        this.props.playerPlayCard(playerID, card);
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
  }
}

export function mapStateToProps(state: StoreState) {
  return {
    playerScores: state.playerScores,
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
    transferScores,
    resetAll,
  },
)(GamePage);

// @flow
import type { StoreState } from 'reducers';
import type { PlayerID, Player, Card } from 'types/hearts';

import React from 'react';
import { connect } from 'react-redux';
import { dealCards } from 'actions/hearts';

type Props = {
  handNumber: number,
  heartsBroken: boolean,
  dealCards: Function,
  players: {
    [id: PlayerID]: Player,
  },
};

export const GamePage = (props: Props) => (
  <div>
    <h1>Counter</h1>
    <hr/>
    <h3>Hand: {props.handNumber}</h3>
    <h3>Hearts Broken: {props.heartsBroken}</h3>
    <button className="btn btn-primary" onClick={props.dealCards}>Deal</button>
    <div className="row">
      {Object.keys(props.players).map((playerID) => {
        const player: Player = props.players[playerID];
        return (
          <div className="col-md-3" key={playerID}>
            <h3>{playerID}</h3>
            <ul>{player.cards.map((card: Card) => {
              return <li key={card.rank + card.suit}>{card.rank} {card.suit}</li>;
            })}</ul>
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
    players: state.currentHand.players,
  };
}

export default connect(
  mapStateToProps,
  {
    dealCards,
  },
)(GamePage);

// @flow

import React from 'react';
import { Link } from 'react-router';

type Props = {
  children: React$Element<any>,
};

export default function AppContainer(props: Props) {
  return (
    <div className="app-container">
      <div className="container">
        <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
          <button className="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            data-target="#navbar-supported-content"
            aria-controls="navbar-supported-content"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"/>
          </button>
          <Link className="navbar-brand" to="/">Hearts</Link>
        </nav>
        <br/>
        {props.children}
      </div>
    </div>
  );
}

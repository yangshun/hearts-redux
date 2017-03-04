// @flow
import React from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router';

const HomePage = () => (
  <DocumentTitle title="Hearts">
    <div>
      <h1>Hearts</h1>
      <hr/>
      <div>
        <Link className="btn btn-primary" to="/game">Play</Link>
      </div>
    </div>
  </DocumentTitle>
);

export default HomePage;

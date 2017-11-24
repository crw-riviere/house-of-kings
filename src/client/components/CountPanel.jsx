import React from 'react';

export default function CountPanel(props) {
  return (
  <nav className="level is-mobile panel-count">
    <div className="level-item has-text-centered">
      <div>
        <p className="heading">Cards</p>
        <p className="title">{props.cardCount}</p>
      </div>
    </div>
    <div className="level-item has-text-centered">
      <div>
        <p className="heading">Kings</p>
        <p className="title">{props.kingCount}</p>
      </div>
    </div>
  </nav>);
}

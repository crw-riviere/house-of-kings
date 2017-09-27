import React from 'react';

export default function GameOverModal(props) {
  return (
    <a
      className="button is-large is-fullwidth"
      onClick={() => props.onClick()}
    >Play Again</a>
  );
}

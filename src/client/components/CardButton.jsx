import React from 'react';

export default function CardButton(props) {
  const buttonText = props.isTurn ? 'Pick Card' : 'Waiting for turn...';
  return (
    <a
      className="button is-large is-fullwidth button-action"
      onClick={() => props.onClick()}
    >
      {buttonText}
    </a>
  );
}

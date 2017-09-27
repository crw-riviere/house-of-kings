import React from 'react';
import Deck from '../../models/deck';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const cardColorClass = `${Deck.getCardColor(this.props.suit)  }-card`;
    return (
      <div className="box" style={{ minHeight: '160px', overflow: 'hidden' }}>
        <article className="media">
          <div className="media-content">
            <div className="content">
              <p className="has-text-centered">
                <strong className={cardColorClass}>{this.props.number} {this.props.suit}</strong> - <strong>{this.props.rule.title}</strong>
                <br />
                <span className="is-size-6">{this.props.rule.description}</span>
              </p>
            </div>
          </div>
        </article>
      </div>
    );
  }
}

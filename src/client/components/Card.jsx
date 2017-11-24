import React from 'react';
import Deck from '../../models/deck';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const cardColorClass = `${Deck.getCardColor(this.props.suit)}-card`;
    return (
      <div className="box panel-card" style={{ minHeight: '200px', overflow: 'hidden' }}>
        <article className="media">
          <div className="media-content">
            <div className="content">
              <p className="">
                <span>
                  <strong className={cardColorClass}>{this.props.number} {this.props.suit}</strong> | <strong>{this.props.rule.title}</strong>
                </span>
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

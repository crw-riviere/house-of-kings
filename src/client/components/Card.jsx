import React from 'react'
import Deck from '../../models/deck.js'

export default class Card extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const cardColorClass = Deck.getCardColor(this.props.suit) + '-card'
        return (
            <div className="box" style={{'height':'140px','overflow':'scroll', 'overflowX':'hidden'}}>
                <article className="media">
                    <div className="media-left">
                        <figure className="image is-64x64">
                            <p className="has-text-centered is-size-2">
                                <span className={cardColorClass}>{this.props.number}{this.props.suit}</span>
                            </p>
                        </figure>
                    </div>
                    <div className="media-content">
                        <div className="content">
                            <p>
                                <strong>{this.props.rule.title}</strong><br />
                                <span className="is-size-7">{this.props.rule.description}</span>
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        )
    }
}
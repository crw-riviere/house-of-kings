import React from 'react'

export default class Card extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="box">
                <article className="media">
                    <div className="media-left">
                        <figure className="image is-64x64">
                            <p className="has-text-centered is-size-1">{this.props.number}{this.props.suit}</p>
                        </figure>
                    </div>
                    <div className="media-content">
                        <div className="content">
                            <p>
                                <strong>{this.props.rule.title}</strong><br/>
                                {this.props.rule.description}
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        )
    }
}
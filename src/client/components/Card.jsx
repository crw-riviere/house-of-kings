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
                            <p className="has-text-centered is-size-2">{this.props.number}{this.props.suit}</p>
                        </figure>
                    </div>
                    <div className="media-content">
                        <div className="content">
                            <p>
                                <strong>{this.props.rule.title}</strong><br/>
                                <span className="is-size-7">{this.props.rule.description}</span>
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        )
    }
}
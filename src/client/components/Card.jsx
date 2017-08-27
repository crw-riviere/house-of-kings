import React from 'react'

export default class Card extends React.Component{
    constructor(){
        super();
    }

    render(){
        return (
            <p>{this.props.number}{this.props.suit}</p>
        )
    }
}
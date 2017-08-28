import React from 'react'

export default function CardButton(props){
    let buttonText = props.isTurn ? 'Pick Card' : 'Waiting for turn...'
    return (
        <a className="button is-large is-fullwidth"
        onClick={() => props.onHandlePickCard()}>{buttonText}</a>
    )
}
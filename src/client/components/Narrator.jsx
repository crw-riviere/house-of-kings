import React from 'react'

export default function Narrator(props) {
    return (
        <div className="content">
            <blockquote>{props.quote}</blockquote>
        </div>
    )
}
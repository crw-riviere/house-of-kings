import React from 'react'
import ReactDOM from 'react-dom'

export default function UserList(props) {
    const users = props.users
    const userList = users.map((userId) =>
        <span className="tag" key={userId}>{userId}</span>
    )
    return (
            <div className="tags">
                {userList}
            </div>
    )
}
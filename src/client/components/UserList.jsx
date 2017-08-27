import React from 'react'
import ReactDOM from 'react-dom'

function UserList(props) {
    const users = props.users
    const userList = users.map((userId) =>
        <li key={userId}>{userId}</li>
    )
    return (
        <div>
            <h2>List</h2>
            <ul>
                {userList}
            </ul>
        </div>
    )
}

export default UserList
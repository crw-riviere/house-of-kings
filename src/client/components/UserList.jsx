import React from 'react'
import ReactDOM from 'react-dom'

function UserList(props) {
    const users = props.users
    const userList = users.map((user) =>
        <li key={user.id}>{user.id}</li>
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
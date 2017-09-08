import React from 'react'
import ReactDOM from 'react-dom'

export default class UserList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const users = this.props.users
        const userList = users.map((user, index) =>
            <div className="control" key={user.id}>
                <div className="tags has-addons">
                    <span className="tag">{user.id}</span>
                    <span className="tag">
                        {'🤴'.repeat(user.kingCount)}
                        </span>
                </div>
            </div>
        )
        return (
            <div className="field is-grouped is-grouped-multiline">
                {userList}
            </div>
        )
    }
}
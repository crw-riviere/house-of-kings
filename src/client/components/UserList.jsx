import React from 'react'
import ReactDOM from 'react-dom'

export default class UserList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const users = this.props.users
        const userList = users.map((userId, index) =>
            <div className="control" key={index}>
                <div className="tags has-addons">
                    <span className="tag">{userId}</span>
                    <span className="tag is-info">👍</span>
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
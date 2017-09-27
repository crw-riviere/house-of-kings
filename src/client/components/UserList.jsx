import React from 'react';
import ReactDOM from 'react-dom';

export default class UserList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const users = this.props.users;
    if (users.length > 0) {
      users[0].isCurrentTurn = true;
    }
    const userList = users.sort((x, y) => x.joinedGameDate > y.joinedGameDate).map((user, index) =>
      (<div className="control" key={user.id}>
        <div className="tags has-addons">
          <span className="tag is-dark">{user.id}</span>
          {user.isThumbMaster && <span className="tag">👍</span>}
          {user.kingCount > 0 && <span className="tag">{'🤴'.repeat(user.kingCount)}</span>}
        </div>
      </div>),
    );
    return (
      <div className="field is-grouped is-grouped-multiline">
        {userList}
      </div>
    );
  }
}

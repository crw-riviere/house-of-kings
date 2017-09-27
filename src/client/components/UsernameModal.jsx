import React from 'react';

export default class UsernameModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      username: event.target.value,
    });
  }

  render() {
    const username = this.state.username;
    return (
      <div className="modal is-active">
        <div className="modal-background" />
        <div className="modal-content">
          <div className="box">
            <form onSubmit={(e) => { e.preventDefault(); this.props.onSubmit(username); }}>
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input
                    className="input is-large"
                    maxLength="10"
                    type="text"
                    value={this.state.username}
                    onChange={this.handleChange}
                    placeholder="please enter your username..."
                    autoFocus
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button className="button is-primary" type="submit">Continue</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

import React from 'react'

export default class UsernameModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username:''
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
        this.setState({
            username:event.target.value
        })
    }

    render() {
        const username = this.state.username
        return (
            <div className="modal is-active">
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="box">
                        <div className="field">
                            <label className="label">Username</label>
                            <div className="control">
                                <input className="input is-large" type="text" value={this.state.username} onChange={this.handleChange} placeholder="please enter a username..." />
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <button className="button is-primary" onClick={() => this.props.onSubmit(username)}>Continue</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
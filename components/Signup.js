import React from 'react';

class Signup extends React.Component {
    constructor() {
        super();
        this.state = {
            text: ''
        };

    }

    render() {
        return (
          <div className="paddingTopM paddingBottomM">
            <div>
              <label className="marginBottomXS">Username</label>
              <input className={this.props.usernameError ? "error marginBottomM":"marginBottomM"} onChange={this.props.inputHandler} value={this.props.signUpUsername} name="signUpUsername" type="text"/>
            </div>
            <div>
              <label className="marginBottomXS">Email</label>
              <input className={this.props.messages ? "error marginBottomM":"marginBottomM"} onChange={this.props.inputHandler} value={this.props.email} name="signUpEmail" type="text"/>
            </div>
            <div>
              <label className="marginBottomXS">Password</label>
              <input className={this.props.messages ? "error marginBottomM":"marginBottomM"} onChange={this.props.inputHandler} value={this.props.password} name="signUpPassword" type="password"/>
            </div>
            <div>
              <button onClick={this.props.submit}>Sign up</button>
            </div>
          </div>
        )
    }
};

export default Signup;

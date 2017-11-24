import React from 'react';

class Login extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
          <div className="paddingTopM paddingBottomM">
            <div>
              <label className="marginBottomXS">Email</label>
              <input className={this.props.messages ? "error marginBottomM":"marginBottomM"} onChange={this.props.inputHandler} value={this.props.email} name="signUpEmail" type="text"/>
            </div>
            <div>
              <label className="marginBottomXS">Password</label>
              <input className={this.props.messages ? "error marginBottomM":"marginBottomM"} onChange={this.props.inputHandler} value={this.props.password} name="signUpPassword" type="password"/>
            </div>
            <div>
              <button onClick={this.props.submit}>Sign in</button>
            </div>
          </div>
        )
    }
};

export default Login;

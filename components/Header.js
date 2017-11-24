import React from 'react';

class Header extends React.Component {

    render() {
        const { user } = this.props;
        return (
          <header>
            <div>{this.props.user.length > 0 ? this.props.user : "Sign in to see Christmas gift database"}</div>
            {this.props.user.length > 0 ? <button onClick={this.props.logOut}>Log out</button>: null}
          </header>
        )
    }
}

export default Header;

import React from 'react';

import Login from '../Components/Login';
import Signup from '../Components/Signup';
import Header from '../Components/Header';
import MyWishes from '../Components/MyWishes';
import ToBuy from '../Components/presentsToBuy';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      logged: null,
      userId: null,
      currentSection: "signIn",
      signUpUsername: "",
      signUpEmail: "",
      signUpPassword: "",
      signInEmail: "",
      signInPassword: "",
      username: "",
      messages: null,
      usernameError: null
    };

    this.tab = this.tab.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
    this.signUpHandler = this.signUpHandler.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
    this.logOut = this.logOut.bind(this);
    this.renderCredentialsSection = this.renderCredentialsSection.bind(this);
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        return firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
          this.setState({
            logged: true,
            userId: user.uid,
            username: (snapshot.val() && snapshot.val().username)
          });
        }.bind(this));
      } else {
        this.setState({
          logged: false
        });
      }
    }.bind(this));
  }

  signUpHandler(){
    if(this.state.signUpUsername.length > 0){
      firebase.auth().createUserWithEmailAndPassword(this.state.signUpEmail, this.state.signUpPassword)
          .then(function(user) {

                firebase.database().ref('users/' + user.uid).set({
                    email: this.state.signUpEmail,
                    username: this.state.signUpUsername
                });

                this.setState({
                  logged: true,
                  userId: user.uid
                });

          }.bind(this))
          .catch(function(error) {
            this.setState({
              messages: error.message
            });
          }.bind(this));
    } else {
      this.setState({
        usernameError: true
      });
    }

  };
  loginHandler(){
    firebase.auth().signInWithEmailAndPassword(this.state.signUpEmail, this.state.signUpPassword)
    .then(function(user){

          return firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
            this.setState({
              logged: true,
              userId: user.uid,
              username: (snapshot.val() && snapshot.val().username)
            });
          }.bind(this));

    }.bind(this))
    .catch(
      function(error) {

        this.setState({
          messages: error.message
        });

      }.bind(this)
    );
  };
  logOut(){
    firebase.auth().signOut().then(function() {
      this.setState({
        logged: false,
        userId: "",
        username: "",
        messages: null
      });
    }.bind(this)).catch(function(error) {
      console.log('neco je spatne');
    });
  };
  inputHandler(e){
    this.setState({
      [e.target.getAttribute('name')]: e.target.value
    });
  };

  renderCredentialsSection(){
    switch(this.state.currentSection){
      case 'signUp':
        return (
          <Signup
              inputHandler={this.inputHandler}
              submit={this.signUpHandler}
              username={this.state.username}
              email={this.state.signUpEmail}
              password={this.state.signUpPassword}
              messages={this.state.messages}
              usernameError={this.state.usernameError}/>
        );
        break;
      case 'signIn':
        return (
          <Login
            inputHandler={this.inputHandler}
            submit={this.loginHandler}
            email={this.state.signUpEmail}
            password={this.state.signUpPassword}
            messages={this.state.messages}/>
        );
        break;

    }

  };

  renderContent() {
    return (
      <div className="content">
        <ToBuy currentUser={this.state.userId}/>
        <MyWishes/>
      </div>
    )
  };
  tab(e){
    this.setState({
      currentSection: e.target.getAttribute('data-tab')
    });
  };

  renderLoader(){
    return (
      <div className="loading marginTopL marginBottomL">Loading...</div>
    )
  };

  renderCredentials(){
    return (
      <div className="credentials">
          <div className="credentials-tabs">
              <div onClick={this.tab} className={this.state.currentSection === 'signUp' ? "tab-selected":""} data-tab="signUp">
                Sign up
              </div>
              <div onClick={this.tab} className={this.state.currentSection === 'signIn' ? "tab-selected":""} data-tab="signIn">
                Sign in
              </div>
          </div>
          <div className="content-credentials-section">
            {this.renderCredentialsSection()}
          </div>
      </div>
    )
  };



  render() {
    return (
      <div>
        <Header user={this.state.username} logOut={this.logOut}/>
        <div className="main marginTopM">
          { this.state.logged === null ? this.renderLoader() : (this.state.logged ? this.renderContent() : this.renderCredentials()) }
        </div>
      </div>
    )
  }
};

export default App;

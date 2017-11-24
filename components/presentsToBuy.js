import React from 'react';

class Tobuy extends React.Component {
    constructor() {
        super();

        this.state = {
          users: [],
          userWishes: null,
          selectedUser: null
        };

        this.selectUser = this.selectUser.bind(this);
        this.changeBuyerValue = this.changeBuyerValue.bind(this);
    }

    componentDidMount(){
      var user = firebase.auth().currentUser;

        if (user) {
          firebase.database().ref('/users').on('value', function(snapshot) {

            let users = [];

            snapshot.forEach(function(childSnapshot) {
              var item = childSnapshot.val()
              item.key = childSnapshot.key;

              users.push(item)
            });

            if(this.refs.root){
              this.setState({
                users: users
              });
            }

          }.bind(this));

        }
    };

    selectUser(e){
      firebase.database().ref('/users/' + e.target.value + '/wishes').on('value', function(snapshot) {

        let userWishes = [];

        if(snapshot.val()){
          snapshot.forEach(function(childSnapshot) {
            var item = childSnapshot.val()
            item.key = childSnapshot.key;

            userWishes.push(item)
          });
        }

        this.setState({
          userWishes: userWishes,
          selectedUser: e.target.value
        });

      }.bind(this));
    }
    changeBuyerValue(e){
      var value = e.target.value;
      var key = e.target.getAttribute('data-id');
      var updates = {
        buyer: value
      };

      firebase.database().ref('users/' + this.state.selectedUser + '/wishes/' + key).update(updates);
    }


    render() {
        var userWishesList = null;
        var userWishesListFunc = null;
        if(this.state.userWishes && this.state.userWishes.length > 0){
            userWishesList = this.state.userWishes.map(function(item, index){

                return(
                  <div className="row toBuyBox paddingTopS paddingBottomS borderBottom" key={item.key}>
                    <div className="col-xs-12 col-md-6 marginTopXS marginBottomXS">
                        <span>{(index + 1) + '. ' + item.wish}</span>
                        <span>{'Where to get it: ' + item.where}</span>
                    </div>
                    <div className="col-xs-12 col-md-6 marginTopXS marginBottomXS">
                        <label className="marginBottomXS">Who is responsible</label>
                        <textarea defaultValue={item.buyer} data-id={item.key} onBlur={this.changeBuyerValue}></textarea>
                    </div>
                  </div>
                );

            }.bind(this));
          } else if(this.state.userWishes && this.state.userWishes.length === 0) {

            userWishesListFunc = function(){
              return <p>This person does not have any wishes</p>
            }
          } else {
            userWishesListFunc = function(){
              return <p>Choose someone who you want to buy a gift for</p>
            }
          }

        return (
          <div className="section paddingBottomM marginBottomM borderBottom" ref="root">
              <h1 className="marginBottomM">
                Other wishes
              </h1>
              <div className="row">
                  <div className="col-xs-12 marginBottomM">
                      <select onChange={this.selectUser} defaultValue="choose">
                          <option disabled value="choose">Choose</option>
                          {this.state.users.map(function(user){
                            if(user.key !== this.props.currentUser){
                                return <option key={user.key} value={user.key}>{user.username}</option>
                            }
                          }.bind(this))}
                      </select>
                  </div>
              </div>
              <div>
                  {userWishesList ? userWishesList : userWishesListFunc()}
              </div>
          </div>
        )
    }
};

export default Tobuy;

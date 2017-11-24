import React from 'react';

class MyWishes extends React.Component {
    constructor() {
        super();

        this.state = {
          addWish: "",
          addWhere: "",
          wishes: []
        };

        this.inputHandler = this.inputHandler.bind(this);
        this.addNew = this.addNew.bind(this);
        this.updateWish = this.updateWish.bind(this);
    }

    componentWillMount(){
      var user = firebase.auth().currentUser;

        if (user) {
          firebase.database().ref('/users/' + user.uid + "/wishes").on('value', function(snapshot) {

              let wishesArray = [];

              snapshot.forEach(function(childSnapshot) {
                var item = childSnapshot.val();
                item.key = childSnapshot.key;

                wishesArray.push(item)
              });

              this.setState({
                wishes: wishesArray
              });
            }.bind(this));

        } else {
        console.log('No wishes');
        }
    };
    addNew(){
      var user = firebase.auth().currentUser;

      if(this.state.addWish.length > 0){
        firebase.database().ref('users/' + user.uid + '/wishes').push({
            wish: this.state.addWish,
            where: this.state.addWhere
        });

        this.setState({
          addWish: "",
          addWhere: ""
        });

      }
    };

    inputHandler(e){
      this.setState({
        [e.target.getAttribute('name')]: e.target.value
      });
    };
    updateWish(e){
      var user = firebase.auth().currentUser;
      var wishId = e.target.getAttribute('data-key');
      var defaultValue = e.target.getAttribute('data-default');
      var wish = document.querySelector('#' + wishId + ' input[name="wish"]').value;
      var where = document.querySelector('#' + wishId + ' input[name="where"]').value;

      var updates = {
        wish: wish,
        where: where
      };


      if(wish.length > 0 && where.length > 0){
        firebase.database().ref('users/' + user.uid + '/wishes/' + wishId).update(updates);
      } else {
        e.target.value = defaultValue;
      }

    };

    deleteWish(e){
      var user = firebase.auth().currentUser;
      var wishId = e.target.getAttribute('data-key');
      firebase.database().ref('users/' + user.uid + '/wishes/' + wishId).remove();
    };

    render() {
        return (
          <div className="section">
            <h1 className="marginBottomM">
              My wishes
            </h1>
            <div className="myWishesBox">
              {this.state.wishes.map(function(wish){
                return(
                  <div className="row paddingTopXS paddingBottomXS" key={wish.key} id={wish.key}>
                    <div className="col-xs-12 col-sm-6 col-md-4 paddingTopXS paddingBottomXS">
                      <input defaultValue={wish.wish} data-default={wish.wish} data-key={wish.key} onBlur={this.updateWish} name="wish"/>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-4 paddingTopXS paddingBottomXS">
                      <input defaultValue={wish.where} data-default={wish.where} data-key={wish.key} onBlur={this.updateWish} name="where"/>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-3 paddingTopXS paddingBottomXS">
                      <button className="delete" onClick={this.deleteWish} data-key={wish.key}>Useless</button>
                    </div>
                  </div>
                );
              }.bind(this))}
            </div>
            <div className="row wishAddBox paddingTopM paddingBottomM">
              <h1 className="paddingTopM paddingBottomM borderTop">+</h1>
              <div className="col-xs-12 col-sm-6 marginBottomS">
                <input className="wishAddBox-input marginBottomS" placeholder="Add wish" onChange={this.inputHandler} value={this.state.addWish} name="addWish"/>
              </div>
              <div className="col-xs-12 col-sm-6 marginBottomS">
                <input className="wishAddBox-input marginBottomS" placeholder="Where to get it" onChange={this.inputHandler} value={this.state.addWhere} name="addWhere"/>
              </div>
              <div className="col-xs-12 col-sm-6 marginBottomS">
                <button onClick={this.addNew}>Add</button>
              </div>
            </div>
          </div>
        )
    }
};

export default MyWishes;

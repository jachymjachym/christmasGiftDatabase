# react-firebase christmas app starterpack

```
yarn version
```
checks if yarn is installed

```
yarn install
```
installs all packages

```
yarn build  
```  
first step. It creates dist folder and copy index.html file and js file  
```
yarn dev  
```
starts development server

```
yarn prod
```
builds application to production  

##1.create account on firebase
##2.go to firebase console
##3.add a new project
##4.configure database rules (database -> rules)
```
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```
##5.set sign-in method to email/password (authentication -> sign-in method)
##6.replace demo firebase config with your project config. Find it in Settings -> Add firebase to your web app
```
<script src="https://www.gstatic.com/firebasejs/4.6.2/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC2NGMumb9R8nasylwZE2vhq9IYS06BvWI",
    authDomain: "vanockagithubexample-e9f9b.firebaseapp.com",
    databaseURL: "https://vanockagithubexample-e9f9b.firebaseio.com",
    projectId: "vanockagithubexample-e9f9b",
    storageBucket: "",
    messagingSenderId: "1083470429413"
  };
  firebase.initializeApp(config);
</script>
```
##7.thats it

#This is testing demo, feel free to play with it
```
user1@gmail.com
test1234

user2@gmail.com
test1234

user3@gmail.com
test1234
```
test user
```
http://christmas-app-demo.surge.sh/
```
demo

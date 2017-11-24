# react-firebase christmas app starterpack  
https://yarnpkg.com/en/

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

## 1.create account on firebase
## 2.go to firebase console
## 3.add a new project
## 4.configure database rules (database -> rules)
```
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```
## 5.set sign-in method to email/password (authentication -> sign-in method)
## 6.replace demo firebase config with your project config in index.html file. Find it in Settings -> Add firebase to your web app
```
<script src="https://www.gstatic.com/firebasejs/4.6.2/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "your-apiKey",
    authDomain: "your-authDomain",
    databaseURL: "your-databaseURL",
    projectId: "your-projectId",
    storageBucket: "",
    messagingSenderId: "your-messagingSenderId"
  };
  firebase.initializeApp(config);
</script>
```
## 7.thats it

# This is testing demo, feel free to play with it
```
user1@gmail.com
test1234

user2@gmail.com
test1234

user3@gmail.com
test1234
```
test user

http://christmas-app-demo.surge.sh/

demo

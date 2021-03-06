# Accounts Manager

#### Description

Application to manage access credentials to multiple accounts.
It allows to add accounts, delete and edit them.

Developed using **React.js** and **Sass** ([here](src/App.scss)) for styling and responsiveness.
The application stores the data on the *localStorage*, and if it is empty it will load some example accounts at the beginning ([this](src/utils/accounts.js)).

#### Setup

* Install dependencies
```
$ npm install
```
* Build the application
```
$ npm build
```
* Run it
```
$ npm start
```
* Open `http://localhost:3000` on the browser

#### Screenshots

Accounts grid:
<br>
<img src="others/screenshot-1.png" width="600"/>
<br>
<br>
Grid responsiveness with different screen sizes:
<br>
<img src="others/screenshot-2.png" width="400"/>
<br>
<br>
Adding new account:
<br>
<img src="others/screenshot-3.png" width="400"/>

# battle-api

## Requirements
We are using some ES6 features like rest operator. So latest version of node (atleast > ```8.3.0```) is recommended.

## Installation
```
git clone https://github.com/sankethande/battle-api.git
cd battle-api
npm install
npm start
```
Visit http://127.0.0.1:3000 in your browser.

## Coding guidelines
We are using ESLint to force some best practices. Below are some key rules
- 4 spaces indentation
- Doble quotes
- Although we are extensively using asyn await still we prefer not to try catch in every controller function.
"express-async-errors" takes care of it for us. This module enables express error handling middleware to catch async errors.

## Development server
```npm run start-local```
Above command will start the app in development mode.
In development mode ESLint will be activated.

## Importing CSV to MongoDb
```
mongoimport -h <host>:<port> -d <database> -c <collection> --type csv -u <user> -p <password> --file <path to .csv> --headerline
```
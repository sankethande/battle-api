# battle-api

## Requirements
We are using some ES6 features like rest operator. So latest version of node (preferably > ```8.3.0```) is recommended.

## Coding guidelines
We are using ESLint to force some best practices. Below are some key rules
- 4 spaces indentation
- Doble quotes

## Development server
```npm run start-local```
Above command will start the app in development mode.
In development mode ESLint will be activated.

## Importing CSV to MongoDb
```
mongoimport -h <host>:<port> -d <database> -c <collection> --type csv -u <user> -p <password> --file <path to .csv> --headerline
```
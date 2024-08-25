# ClimbTime Climbing Log App

In this repository, you will find all the steps and information required to build an app which is a climbing fitness tracker using React, Node/Express, and MySQL.

## Setup

### Dependencies

Run `npm install` in the project folder to install dependencies related to Express (the server).

`cd client` and run `npm install` install dependencies related to React (the client).

### Database Prep
- Run `npm run migrate` in the project folder of this repository, in a new terminal window. This will create a table called 'climbs' and 'users' in the 'climbing_log' database.

### Run Your Development Servers

- Run `npm start` in project directory to start the Express server on port 4000
- `cd client` and run `npm run dev` to start client server in development mode with hot reloading in port 5173.
- Client is configured so all API calls will be proxied to port 4000 for a smoother development experience. Yay!
- You can test your client app in `http://localhost:5173`
- You can test your API in `http://localhost:4000/api`

### Getting started
- Go to http://localhost:5173 and either create an account or log in as an existing user.

## About the app

This is a simple fitness tracker type app that can be used to track your climbing workouts and their respective locations. You can add new entries to the same location or add as many locations as you like - it is totally up to you! There is also login functionality to be able to handle multiple accounts in the future.

## Notes

_This is a student project that was created at [CodeOp](http://CodeOp.tech), a full stack development bootcamp in Barcelona._

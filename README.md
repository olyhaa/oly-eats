# oly-eats

React-based recipe app to store recipes and plan meals.

## File Structure

The repo is split into two folders:

- `client` which contains the front-end React code
- `server` which contains the back-end Apollo/GraphQL server

## Starting the Server

In the `server` directory, you can run:

`npm install`

`npm run start`

Open [http://localhost:4000](http://localhost:4000) to view the Apollo Server Playground editor in the browser.

## Starting the Client

Prereq: the Apollo Server must be running for the Client to work properly. Follow the **Starting the Server** steps above to start the server.

In the `client` directory, you can run:

`npm install`

`npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Testing

In both the `server` and `client` directories, you can run

`npm run test`

This will launches the jest test runner which runs all available unit tests.

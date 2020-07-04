# oly-eats

React-based recipe app to store recipes and plan meals.

## File Structure

The repo is split into two directories:

- `client` which contains the front-end React code
- `server` which contains the back-end Apollo/GraphQL server

## Starting the Server

In the `server` directory, you can run:

```
npm install
npm run start
```

Open [http://localhost:4000](http://localhost:4000) to view the Apollo Server Playground editor in the browser.

## Starting the Client

Prereq: the Apollo Server must be running for the Client to work properly. Follow the **Starting the Server** steps above to start the server.

In the `client` directory, you can run:

```
npm install
npm run start
```

This will run the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

## Testing

When a PR is opened, all CI tests will run against the Server and Client codebases. Tests must all pass before a merge is allowed.

### Server

In the `server` subdirectory, you can run

`npm run test`

This will launch the jest test runner which runs all available unit tests.

### Client

In the `client` subdirectory, you can run

`npm run test`

This will launch the jest test runner which runs all available unit tests. In addition, it will launch [Cypress](https://www.cypress.io/) which will run all integration tests. To run either individually, run `npm run test:unit` or `npm run test:cypress`.

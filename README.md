# Notifications Service Worker

  *Worker responsible for consuming, processing and sending notifications through different channels*

This an component of [Notifications Manager](https://github.com/davicedraz/notifications-manager) that is an stateless instance server responsible only for consuming notification events from message queues and try to send them to the corresponding providers. 

See the main project page for details and other components.

## Setup & Run

This Node.js project uses typescript, which will be automatically installed as a development dependency.

Install all project dependencies, like Node.js and Npm. Then run:

```bash
npm install
```
Run it 

```bash
npm start
```

## Using Docker

Create a Docker network called notifications-net by running the command:
```bash
docker network create notifications-net
```
Start the Service Workers containers by running the following commands
```bash
docker-compose up
```

## Test

Execute the following command to run all test suites and log mocked results:

```bash
npm test
```

In order to see a test coverage report, run:

```bash
 npm run test:coverage
```

# Notifications Service Worker

  *Worker responsible for consuming, processing and sending notifications through different channels*

## Setup & Run

This Node.js project uses typescript, which will be automatically installed as a development dependency. However, make sure your environment has the following at least:
- [node.js](https://nodejs.org/en/download/)
- npm

Install all project dependencies

```bash
npm install
```
Run it 

```bash
npm start
```

## Test

*To test typescript files, we need to transpile them during testing. Vitest do that natively, so we don't need to deal with the complexity of transforming source files. Watch mode is enabled by default, aligning itself with the way Vite pushes for a dev first experience. Also, Vitest cares a lot about performance and uses Worker threads to run as much as possible in parallel.*

I found it interesting and it turned out to be really useful and fast.


Execute the following command to run all test suites and log mocked results:

```bash
npm test
```

In order to see a test coverage report, run:

```bash
 npm run test:coverage
```

## Docker

```bash
docker network create notifications-net
```

```bash
docker-compose up
```
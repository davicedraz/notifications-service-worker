require('dotenv').config();

class Application {

  constructor() {
  }

  public run() {

  }

  // private verifyEnvironment() {
  //   const requiredEnvs = [];
  //   requiredEnvs.forEach((env) => {
  //     if (!(env in process.env)) {
  //       throw new Error(`Env variable ${env} is not defined`);
  //     }
  //   });
  // }

}

const app = new Application();
app.run();

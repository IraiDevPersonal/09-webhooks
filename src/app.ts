import express from "express";
import { envs } from "./configs";
import { GithubController } from "./presentation/github/controller";

(() => {
  main();
})();

function main() {
  const app = express();

  app.use(express.json());

  const controller = new GithubController();
  app.post("/api/github", controller.webhookHanlder);

  app.listen(envs.PORT, () => {
    console.log(`App is running on port ${envs.PORT}`);
  });
}

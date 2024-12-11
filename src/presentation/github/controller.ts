import { Request, Response } from "express";
import { GithubService } from "../services/github.service";

export class GithubController {
  constructor(
    private readonly githubService: GithubService = new GithubService()
  ) {}

  webhookHanlder = (req: Request, res: Response) => {
    const githubEvent = req.header("x-github-event") ?? "unknown";
    const signature = req.header("x-hub-signature-256") ?? "unknown";
    const payload = req.body;
    let message: string = "";

    switch (githubEvent) {
      case "star":
        // aqui podria hacerse un mapper para mantenedor la informacion en caso de cambios
        message = this.githubService.onStar(payload);
        break;
      case "issues":
        message = this.githubService.onIssue(payload);
        break;
      default:
        message = `Unknown event ${githubEvent}`;
        break;
    }

    console.log({ message });

    res.status(202).send("Accepted");
  };
}

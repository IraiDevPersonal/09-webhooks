import { GithubIssuePayload, GithubStarPayload } from "../../interfaces";

export class GithubService {
  constructor() {}

  onStar(payload: GithubStarPayload): string {
    const { starred_at, action, sender, repository } = payload;
    console.log({ starred_at });
    let message: string = "";

    message = `User: ${sender.login} ${action} star on repo: ${repository.name}`;

    return message;
  }

  onIssue(payload: GithubIssuePayload): string {
    const { action, issue } = payload;
    let message: string = "";

    if (action === "opened") {
      return `An issue was opened with this title: ${issue.title}`;
    }

    if (action === "closed") {
      return `An issue was close by: ${issue.user.login}`;
    }

    if (action === "reopened") {
      return `An issue was reopened by: ${issue.user.login}`;
    }

    return `Unhandled action for the issue event ${action}`;
  }
}

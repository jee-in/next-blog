export const GITHUB_USER = "jee-in";
export const MAIN_BRANCH = "main";
export const GITHUB_AUTH_TOKEN = process.env.GITHUB_AUTH_TOKEN;

export interface ContentList {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  _links: {
    self: string;
    git: string;
    html: string;
  };
}

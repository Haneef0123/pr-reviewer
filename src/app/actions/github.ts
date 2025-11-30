"use server";

import { Octokit } from "octokit";

export async function fetchPRs(token: string, repo: string) {
  if (!token || !repo) return { error: "Missing token or repository" };

  try {
    const octokit = new Octokit({ auth: token });
    const [owner, repoName] = repo.split('/');

    const { data } = await octokit.rest.pulls.list({
      owner,
      repo: repoName,
      state: 'open',
      sort: 'updated',
      direction: 'desc',
      per_page: 10,
    });

    return { 
      data: data.map(pr => ({
        id: pr.number,
        title: pr.title,
        repo: repo,
        author: pr.user?.login || 'unknown',
        status: 'open', // GitHub API returns 'open'
        time: new Date(pr.updated_at).toLocaleString(),
        url: pr.html_url,
      }))
    };
  } catch (error: any) {
    console.error("GitHub API Error:", error);
    return { error: error.message || "Failed to fetch PRs" };
  }
}

export async function fetchPRDiff(token: string, repo: string, prNumber: number) {
  if (!token || !repo) return { error: "Missing token or repository" };

  try {
    const octokit = new Octokit({ auth: token });
    const [owner, repoName] = repo.split('/');

    const { data } = await octokit.rest.pulls.get({
      owner,
      repo: repoName,
      pull_number: prNumber,
      mediaType: {
        format: "diff",
      },
    });

    // When mediaType is diff, data is the diff string
    return { data: data as unknown as string };
  } catch (error: any) {
    return { error: error.message || "Failed to fetch diff" };
  }
}

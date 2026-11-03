
import "dotenv/config";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

async function fetchAllRepos() {
  const repos = [];

  for (let page = 1; ; page++) {
    const response = await fetch(
      `${URL}/api/projects`
      
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`GitHub API error ${response.status}: ${error.message}`);
    }

    const data = await response.json();
    console.log(data);
    
  }

}
fetchAllRepos()

const TOKEN = process.env.VERCEL_TOKEN;

async function main() {
  if (!TOKEN) {
    throw new Error("VERCEL_TOKEN is not set");
  }

  const headers = {
    Authorization: `Bearer ${TOKEN}`,
  };

  const projectsResponse = await fetch(
    "https://api.vercel.com/v9/projects?limit=100",
    { headers }
  );

  if (!projectsResponse.ok) {
    throw new Error(`Projects API: ${projectsResponse.status}`);
  }

  const projectsData = await projectsResponse.json();

  for (const project of projectsData.projects ?? []) {
    const url = new URL(
      `https://api.vercel.com/v9/projects/${encodeURIComponent(project.id)}/domains`
    );
    url.searchParams.set("limit", "100");

    const response = await fetch(url, { headers });

    if (!response.ok) {
      console.log(`\n${project.name}: API error ${response.status}`);
      continue;
    }

    const data = await response.json();
    console.log(`\n${project.name}`);

    if (!data.domains?.length) {
      console.log("  No assigned domains found");
      continue;
    }

    for (const domain of data.domains) {
      console.log(
        `  https://${domain.name} | ${
          domain.verified ? "Verified" : "Not verified"
        }`
      );
    }
  }
}

main().catch(console.error);

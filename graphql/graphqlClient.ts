const endpoint = process.env.CONTENTFUL_GRAPHQL_ENDPOINT as string;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN as string;

if (!endpoint || !accessToken) {
  throw new Error("Missing Contentful environment variables.");
}

interface GraphQLRequestOptions {
  query: string;
  variables?: Record<string, any>;
  revalidate?: number; // seconds for ISR
}

export async function graphQLClient<T>({
  query,
  variables,
  revalidate = 60, // default revalidate 60 seconds
}: GraphQLRequestOptions): Promise<T> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(`GraphQL request failed with status ${res.status}`);
  }

  const json = await res.json();

  if (json.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  return json.data as T;
}

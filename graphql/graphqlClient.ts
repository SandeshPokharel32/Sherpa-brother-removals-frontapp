import { GraphQLClient } from "graphql-request";

const endpoint = process.env.CONTENTFUL_GRAPHQL_ENDPOINT as string;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN as string;

if (!endpoint || !accessToken) {
  throw new Error("Missing Contentful environment variables.");
}

export const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

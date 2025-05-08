import { GraphQLClient, gql } from "graphql-request";

const endpoint = process.env.CONTENTFUL_GRAPHQL_ENDPOINT as string;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN as string;

if (!endpoint || !accessToken) {
  throw new Error("Missing Contentful environment variables.");
}

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

type ExpeditionCategories = {
  name: string;
  slug: string;
  type: {
    name: string;
    slug: string;
  };
};

type ExpeditionCategoryResponse = {
  expeditionCategoryCollection: {
    items: ExpeditionCategories[];
    total: number;
  };
};

export async function fetchExpeditionCategories(): Promise<
  ExpeditionCategories[]
> {
  const query = gql`
    query ExpeditionCategories {
      expeditionCategoryCollection {
        items {
          name
          slug
          type {
            name
            slug
          }
        }
        total
      }
    }
  `;

  const data = await graphQLClient.request<ExpeditionCategoryResponse>(query);
  return data.expeditionCategoryCollection.items;
}

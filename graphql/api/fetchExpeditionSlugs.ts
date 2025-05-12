import { gql } from "graphql-request";
import { graphQLClient } from "../graphqlClient";

export const EXPEDITION_SLUGS_QUERY = gql`
  query ExpeditionSlugs {
    expeditionCollection {
      items {
        slug
      }
    }
  }
`;

export async function fetchExpeditionSlugs(): Promise<string[]> {
  try {
    const data = await graphQLClient.request<{
      expeditionCollection: { items: { slug?: string | null }[] };
    }>(EXPEDITION_SLUGS_QUERY);

    return data.expeditionCollection.items
      .map((item) => item.slug)
      .filter((slug): slug is string => !!slug);
  } catch (error) {
    console.error("Error fetching expedition slugs:", error);
    return [];
  }
}

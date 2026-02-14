import { gql } from "graphql-request";
import { graphQLClient } from "../graphqlClient";

// Types for the response from `expeditionTypeCollection`
type ExpeditionCategory = {
  name: string;
  slug: string;
  description: string;
};

type ExpeditionType = {
  name: string;
  slug: string;
  expeditionCategoriesCollection: {
    items: ExpeditionCategory[];
  };
};

export const EXPEDITION_TYPE_BY_SLUG_QUERY = gql`
  query ExpeditionTypeBySlug($slug: String!) {
    expeditionTypeCollection(where: { slug: $slug }, limit: 1) {
      items {
        name
        slug
        expeditionCategoriesCollection(limit: 2) {
          items {
            name
            slug
            description
          }
        }
      }
    }
  }
`;

export async function fetchExpeditionTypeBySlug(slug: string) {
  try {
    const data = await graphQLClient<{
      expeditionTypeCollection: { items: ExpeditionType[] };
    }>({ query: EXPEDITION_TYPE_BY_SLUG_QUERY, variables: { slug } });

    return data.expeditionTypeCollection.items[0];
  } catch (error) {
    console.error(`Error fetching expedition with slug ${slug}:`, error);
    return null;
  }
}

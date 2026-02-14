import { gql } from "graphql-request";
import { graphQLClient } from "../graphqlClient";

export const EXPEDITION_BY_SLUG_QUERY = gql`
  query CategoryBySlug($slug: String!) {
    expeditionCategoryCollection(where: { slug: $slug }, limit: 1) {
      items {
        slug
        name
        description
        type {
          name
          slug
        }
        expeditionsCollection {
          items {
            title
            slug
            altitude
            groupSize
            duration
            subtitle
            mainImage {
              url
            }
          }
        }
      }
    }
  }
`;

export async function fetchCategoryBySlug(slug: string) {
  try {
    const data = await graphQLClient<{
      expeditionCategoryCollection: { items: any[] };
    }>({ query: EXPEDITION_BY_SLUG_QUERY, variables: { slug } });

    return data.expeditionCategoryCollection.items[0] || null;
  } catch (error) {
    console.error(`Error fetching expedition with slug ${slug}:`, error);
    return null;
  }
}

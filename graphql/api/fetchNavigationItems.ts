import { gql } from "graphql-request";
import { graphQLClient } from "../graphqlClient";
import { ExpeditionTypesQuery } from "../types";

export const NAVIGATION_ITEMS = gql`
  query NavigationItems {
    types: expeditionTypeCollection(limit: 13) {
      items {
        __typename
        name
        slug
        categories: expeditionCategoriesCollection(limit: 13) {
          items {
            __typename
            name
            slug
            expeditions: expeditionsCollection(limit: 13) {
              items {
                __typename
                title
                slug
                subtitle
              }
            }
          }
        }
      }
    }
  }
`;

export async function fetchNavigationItems() {
  try {
    const data = await graphQLClient<ExpeditionTypesQuery>({
      query: NAVIGATION_ITEMS,
    });

    return data;
  } catch (e) {
    console.error("Error fetching expedition categories:", e);
    return null;
  }
}

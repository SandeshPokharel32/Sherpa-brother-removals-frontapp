import { gql } from "graphql-request";
import { graphQLClient } from "../graphqlClient";
import { ExpeditionTypesQuery } from "../types";

export const EXPEDITION_TYPES_QUERY = gql`
  query ExpeditionTypes {
    types: expeditionTypeCollection(limit: 113) {
      items {
        __typename
        name
        slug
        categories: expeditionCategoriesCollection(limit: 2) {
          items {
            __typename
            name
            slug
            expeditions: expeditionsCollection(limit: 3) {
              items {
                __typename
                title
                slug
                subtitle
                altitude
                duration
                groupSize
                itenaries: itenariesCollection(limit: 3) {
                  limit
                  __typename
                  items {
                    day
                  }
                  total
                }
              }
              total
            }
          }
          total
        }
      }
      total
    }
  }
`;

export async function fetchExpeditionTypes() {
  try {
    const data = await graphQLClient.request<ExpeditionTypesQuery>(
      EXPEDITION_TYPES_QUERY
    );

    return data;
  } catch (e) {
    console.error("Error fetching expedition categories:", e);
    return null;
  }
}

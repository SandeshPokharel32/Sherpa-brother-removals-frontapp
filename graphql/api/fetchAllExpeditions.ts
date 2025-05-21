import { gql } from "graphql-request";
import { graphQLClient } from "../graphqlClient";

export interface GetAllExpeditionsQuery {
  expeditionCollection: {
    items: Expedition[];
  };
}

export interface Expedition {
  __typename: string;
  title: string;
  slug: string;
  subtitle: string;
  groupSize: string;
  mainImage: {
    url: string;
  };
  duration: string;
  altitude: string;
  description: string;
}

export const ALL_EXPEDITIONS_QUERY = gql`
  query GetAllExpeditionsQuery {
    expeditionCollection {
      items {
        __typename
        title
        slug
        subtitle
        groupSize
        mainImage {
          url
        }
        duration
        altitude
      }
    }
  }
`;

export async function fetchAllExpeditions() {
  try {
    const data = await graphQLClient<GetAllExpeditionsQuery>({
      query: ALL_EXPEDITIONS_QUERY,
    });

    return data;
  } catch (e) {
    console.error("Error fetching expedition categories:", e);
    return null;
  }
}

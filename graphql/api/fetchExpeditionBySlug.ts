import { gql } from "graphql-request";
import { graphQLClient } from "../graphqlClient";

export const EXPEDITION_BY_SLUG_QUERY = gql`
  query ExpeditionBySlug($slug: String!) {
    expeditionCollection(where: { slug: $slug }, limit: 1) {
      items {
        _id
        slug
        title
        subtitle
        region
        price
        duration
        difficulty
        overview
        expeditionType {
          name
          slug
        }
        groupSize
        altitude
        season
        mainImage {
          url
        }
        galleryImageCollection {
          items {
            title
            description
            fileName
            url
          }
        }
        itenariesCollection {
          items {
            day
            expedition
            title
            description
            meal
            hotel
          }
        }
        included: includedCollection {
          items {
            title
            description
          }
        }
        excluded: excludedCollection {
          items {
            title
            description
          }
        }
        gearListCollection {
          items {
            title
            description
            url
          }
        }
      }
    }
  }
`;

export async function fetchExpeditionBySlug(slug: string) {
  try {
    const data = await graphQLClient<{
      expeditionCollection: { items: any[] };
    }>({ query: EXPEDITION_BY_SLUG_QUERY, variables: { slug } });

    return data.expeditionCollection.items[0] || null;
  } catch (error) {
    console.error(`Error fetching expedition with slug ${slug}:`, error);
    return null;
  }
}

import { gql } from "graphql-request";
import { graphQLClient } from "../graphqlClient";

export const EXPEDITION_TYPE_SLUGS_QUERY = gql`
  query ExpeditionTypeSlugs {
    expeditionTypeCollection {
      items {
        slug
      }
    }
  }
`;

export async function fetchExpeditionTypeSlugs(): Promise<
  { slug: string | null | undefined }[]
> {
  try {
    const data = await graphQLClient<{
      expeditionTypeCollection: {
        items: { slug?: string | null }[];
      };
    }>({ query: EXPEDITION_TYPE_SLUGS_QUERY });

    return data.expeditionTypeCollection.items.map((item) => ({
      slug: item.slug,
    }));
  } catch (error) {
    console.error("Error fetching expedition type slugs:", error);
    return [];
  }
}

import { gql } from "graphql-request";
import { graphQLClient } from "../graphqlClient";

export const CATEGORIES_SLUGS_QUERY = gql`
  query ExpeditionSlugs {
    expeditionCategoryCollection {
      items {
        slug
        name
      }
    }
  }
`;

export async function fetchCategoriesSlugs(): Promise<
  { slug: string | null | undefined }[]
> {
  try {
    const data = await graphQLClient<{
      expeditionCategoryCollection: {
        items: { slug?: string | null }[];
      };
    }>({ query: CATEGORIES_SLUGS_QUERY });

    return data.expeditionCategoryCollection.items.map((item) => ({
      slug: item.slug,
    }));
  } catch (error) {
    console.error("Error fetching expedition slugs:", error);
    return [];
  }
}

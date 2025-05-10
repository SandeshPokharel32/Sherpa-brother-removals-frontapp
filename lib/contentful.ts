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

// Define the types based on the GraphQL query structure
export type ItineraryItem = {
  day?: number | null;
};

export type ItineraryCollection = {
  limit?: number | null;
  __typename: "ItenariesCollection";
  items: ItineraryItem[];
  total: number;
};

export type Expedition = {
  __typename: "Expeditions";
  title?: string | null;
  subtitle?: string | null;
  itenaries?: ItineraryCollection | null;
};

export type ExpeditionCollection = {
  items: Expedition[];
  total: number;
};

export type ExpeditionCategory = {
  __typename: "ExpeditionCategory"; // Corrected type name based on likely Contentful structure
  name?: string | null;
  slug?: string | null;
  expeditions?: ExpeditionCollection | null;
};

export type ExpeditionCategoryCollection = {
  items: ExpeditionCategory[];
  total: number;
};

export type ExpeditionType = {
  __typename: "ExpeditionType";
  name?: string | null;
  slug?: string | null;
  categories?: ExpeditionCategoryCollection | null;
};

export type ExpeditionTypeCollection = {
  items: ExpeditionType[];
  total: number;
};

// The root query type reflecting the structure of the GraphQL response
export type ExpeditionTypesQuery = {
  types?: ExpeditionTypeCollection | null;
};

export async function fetchExpeditionCategories() {
  const query = gql`
    query ExpeditionTypes {
      types: expeditionTypeCollection {
        items {
          __typename
          name
          slug
          categories: expeditionCategoriesCollection(limit: 3) {
            items {
              __typename
              name
              slug
              expeditions: expeditionsCollection(limit: 2) {
                items {
                  __typename
                  title
                  slug
                  subtitle
                  altitude
                  duration
                  groupSize
                  itenaries: itenariesCollection(limit: 2) {
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

  try {
    const data = await graphQLClient.request<ExpeditionTypesQuery>(query);

    // Flatten the categories from all expedition types into a single array
    const allCategories: ExpeditionCategory[] = [];
    // if (data.types?.items) {
    //   data.types.items.forEach((expeditionType) => {
    //     if (expeditionType.categories?.items) {
    //       allCategories.push(...expeditionType.categories.items);
    //     }
    //   });
    // }
    return data;
  } catch (e) {
    console.error("Error fetching expedition categories:", e);
    return [];
  }
}

const EXPEDITION_SLUGS_QUERY = gql`
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

const EXPEDITION_BY_SLUG_QUERY = gql`
  query ExpeditionBySlug($slug: String!) {
    expeditionCollection(where: { slug: $slug }, limit: 1) {
      items {
        _id
        slug
        title
        subtitle
        price
        altitude
        groupSize
        expeditionType {
          name
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
      }
    }
  }
`;

export async function fetchExpeditionBySlug(slug: string) {
  try {
    const data = await graphQLClient.request<{
      expeditionCollection: { items: any[] };
    }>(EXPEDITION_BY_SLUG_QUERY, { slug });
    return data.expeditionCollection.items[0] || null;
  } catch (error) {
    console.error(`Error fetching expedition with slug ${slug}:`, error);
    return null;
  }
}

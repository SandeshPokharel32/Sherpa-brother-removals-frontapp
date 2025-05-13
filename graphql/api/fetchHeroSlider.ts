import { gql } from "graphql-request";
import { graphQLClient } from "../graphqlClient";
import { HeroSliderData } from "../types";

export const HERO_SLIDER_QUERY = gql`
  query HeroSlider {
    videoContentCollection {
      items {
        heading
        cta
        src
        mobileSrc
        description
      }
    }
  }
`;

export async function fetchHeroSlider() {
  try {
    const data = await graphQLClient<HeroSliderData>({
      query: HERO_SLIDER_QUERY,
    });
    return data;
  } catch (e) {
    console.error("Error fetching expedition categories:", e);
    return null;
  }
}

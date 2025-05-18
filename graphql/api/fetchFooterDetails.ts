import { gql } from "graphql-request";
import { graphQLClient } from "../graphqlClient";

export interface FooterDetailsData {
  footerDetailsCollection: {
    items: FooterDetailItem[];
  };
}

export interface FooterDetailItem {
  key: any;
  description: string | null;
  regionsCollection: {
    items: Region[];
  } | null;
  expeditionsCollection: {
    items: Expedition[];
  } | null;
  contactDetail: ContactDetail | null;
}

export interface Region {
  slug: string | null;
  name: string | null;
}

export interface Expedition {
  slug: string | null;
  title: string | null;
}

export interface ContactDetail {
  _id: string | null;
  email: string | null;
  address: string | null;
  phoneNumber: string | null;
  facebookLink: string | null;
  instagramLink: string | null;
  whatsappLink: string | null;
}

export const FOOTER_DETAILS_QUERY = gql`
  query GetFooterDetails {
    footerDetailsCollection {
      items {
        description
        regionsCollection {
          items {
            slug
            name
          }
        }
        expeditionsCollection {
          items {
            slug
            title
          }
        }
        contactDetail {
          _id
          email
          address
          phoneNumber
          facebookLink
          instagramLink
          whatsappLink
        }
      }
    }
  }
`;

export async function fetchFooterDetails() {
  try {
    const data = await graphQLClient<FooterDetailsData>({
      query: FOOTER_DETAILS_QUERY,
    });

    return data;
  } catch (e) {
    console.error("Error fetching footer details:", e);
    return null;
  }
}

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
  __typename: "Expedition";
  title?: string | null;
  slug?: string | null;
  subtitle?: string | null;
  itenaries?: ItineraryCollection | null;
};

export type ExpeditionCollection = {
  items: Expedition[];
  total: number;
};

export type ExpeditionCategory = {
  __typename: "ExpeditionCategory";
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

export type ExpeditionTypesQuery = {
  types?: ExpeditionTypeCollection | null;
};

export type VideoContentItem = {
  heading: string;
  cta: string;
  src: string;
  mobileSrc: string;
  description: string;
};

export type HeroSliderData = {
  videoContentCollection: {
    items: VideoContentItem[];
  };
};

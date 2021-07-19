export interface Places {
  degradedQuery?: boolean;
  hits?: object[];
  nbHits?: number;
  params?: string;
  processingTimeMS?: number;
  query?: string;
}

export interface Place {
  objectID?: string;
  locale_names?: {
    default?: string[] | undefined;
  };
}

export interface Places {
  degradedQuery?: boolean;
  hits?: object[];
  nbHits?: number;
  params?: string;
  processingTimeMS?: number;
  query?: string;
}

export interface Place {
  is_city?: boolean;
  city?: {
    en?: string;
  };
  country?: {
    en?: string;
    default?: string;
  };
  population?: number;
  county?: {
    default?: string[];
  };
  objectID?: string;
  locale_names?: {
    default?: string[] | undefined;
  };
  _geoloc?:
    | {
        lat: number;
        lng: number;
      }
    | [
        {
          lat: number;
          lng: number;
        }
      ];
  name?: string;
}

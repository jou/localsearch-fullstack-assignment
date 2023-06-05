// NOTE: (jou) They're copied from places-bff for now, might make sense to have them in a shared package. Comments from
//             the copy in places-bff also applies here

export interface PlacesListEntry {
    entryId: string;
    displayName: string;
    displayAddress: string;
}

export interface PlacesDetailEntry extends PlacesListEntry {
    links: PlaceLink[];
    openingHours: OpeningHours | null;
}

export type PlaceLinkType = 'phone' | 'web';

export interface PlaceLink {
    contactId: string;
    type: PlaceLinkType;
    uri: string;
    label: string;
}

export type WeekdayName =
    | 'monday'
    | 'tuesday'
    | 'wednesday'
    | 'thursday'
    | 'friday'
    | 'saturday'
    | 'sunday';

export interface OpeningPeriod {
    /** Start time of the period in 24h format */
    start: string;
    /** End time of the period in 24h format */
    end: string;
    // NOTE: (jou) only encountered `OPEN` so far
    type: 'OPEN';
}

export interface OpeningHours {
    /**
     * Opening periods per weekday. If a weekday is missing, it means that it's closed. For weekdays with
     * `OpeningPeriod`s available, any time of day not covered by one of the `OpeningPeriod` can be assumed as
     * closed
     */
    days: Partial<Record<WeekdayName, OpeningPeriod[]>>;
    closedOnHolidays: boolean;
}

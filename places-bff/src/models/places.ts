// NOTE: (jou) These are the models used for responses from the bff and also for the web app to type the JSON it gets back.

/**
 * A representation of a place intended for displaying in a list.
 */
export interface PlacesListEntry {
    entryId: string;
    displayName: string;
    displayAddress: string;
}

/**
 * Full representation of a place for detail view.
 */
export interface PlacesDetailEntry extends PlacesListEntry {
    links: PlaceLink[];
    openingHours: OpeningHours | null;
}

export type PlaceLinkType = 'phone' | 'web';

/**
 * Both phone and web contacts are normalized into this format that is easier to render.
 */
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

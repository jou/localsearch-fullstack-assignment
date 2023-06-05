// NOTE(jou): They're copied from places-bff for now, might make sense to have them in a shared package

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
    start: string;
    end: string;
    type: 'OPEN' | 'CLOSE';
}

export interface OpeningHours {
    days: Record<WeekdayName, OpeningPeriod[]>;
    closedOnHolidays: boolean;
}

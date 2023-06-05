import {
    OpeningHours,
    OpeningPeriod,
    PlaceLink,
    PlacesDetailEntry,
    PlacesListEntry,
    WeekdayName,
} from '../models/places';
import { AxiosInstance, AxiosResponse } from 'axios';
import { getPlacesHttpClient } from './http-client';
import { head } from 'lodash';

import filter from 'lodash/filter';

interface UpstreamPlace {
    _class: string;
}

interface PlaceLocalEntry extends UpstreamPlace {
    _class: 'ch.local.storage.model.localentry.v1.PlaceLocalEntry';
    local_entry_id: string;
    displayed_what: string;
    displayed_where: string;

    // NOTE(jou): Not sure how optional they are
    addresses?: UpstreamAddress[];
    opening_hours?: UpstreamOpeningHours;
}

function isPlaceLocalEntry(
    upstreamPlace: UpstreamPlace,
): upstreamPlace is PlaceLocalEntry {
    return (
        upstreamPlace._class ===
        'ch.local.storage.model.localentry.v1.PlaceLocalEntry'
    );
}

interface UpstreamAddress {
    _class: string;
}

interface UpstreamBusinessAddress extends UpstreamAddress {
    _class: 'ch.local.storage.model.localentry.v1.BusinessAddress';
    contacts: UpstreamContact[];
}

function isUpstreamBusinessAddress(
    upstreamAddress: UpstreamAddress,
): upstreamAddress is UpstreamBusinessAddress {
    return (
        upstreamAddress._class ===
        'ch.local.storage.model.localentry.v1.BusinessAddress'
    );
}

function findBusinessAddresses(
    addresses: UpstreamAddress[] | undefined,
): UpstreamBusinessAddress[] {
    return (addresses ?? []).filter((address) =>
        isUpstreamBusinessAddress(address),
    ) as UpstreamBusinessAddress[];
}

interface UpstreamContact {
    _class: string;
    id: string;
    service_code: string;
    formatted_service_code: string;
}

interface UpstreamPhoneContact extends UpstreamContact {
    _class: 'ch.local.storage.model.contact.v1.ContactType.phone';
    call_link: string;
}

interface UpstreamUrlContact extends UpstreamContact {
    _class: 'ch.local.storage.model.contact.v1.ContactType.url';
    url: string;
}

function isUpstreamPhoneContact(
    contact: UpstreamContact,
): contact is UpstreamPhoneContact {
    return (
        contact._class === 'ch.local.storage.model.contact.v1.ContactType.phone'
    );
}

function isUpstreamUrlContact(
    contact: UpstreamContact,
): contact is UpstreamUrlContact {
    return (
        contact._class === 'ch.local.storage.model.contact.v1.ContactType.url'
    );
}

interface UpstreamOpeningHours {
    days: Record<WeekdayName, OpeningPeriod[]>;
    closed_on_holidays?: boolean;
}

function convertUpstreamOpeningHours(
    upstreamOpeningHours: UpstreamOpeningHours,
): OpeningHours {
    return {
        days: upstreamOpeningHours.days,
        closedOnHolidays: upstreamOpeningHours.closed_on_holidays,
    };
}

export interface PlacesService {
    /**
     * Get a list of available places.
     */
    listPlaces(): Promise<PlacesListEntry[]>;

    /**
     * Search for a place matching the given query.
     */
    searchPlaces(query: string): Promise<PlacesListEntry[]>;

    /**
     * Get details of the place with the given ID.
     */
    getPlaceDetails(placeId: string): Promise<PlacesDetailEntry>;
}

function convertUpstreamPlaceToPlacesListEntry(
    upstreamPlace: UpstreamPlace,
): PlacesListEntry {
    if (isPlaceLocalEntry(upstreamPlace)) {
        return {
            entryId: upstreamPlace.local_entry_id,
            displayName: upstreamPlace.displayed_what,
            displayAddress: upstreamPlace.displayed_where,
        };
    }

    throw new TypeError(
        `Unexpected place _class encountered: ${upstreamPlace._class}`,
    );
}

function convertUpstreamPlaceToPlacesDetailEntry(
    upstreamPlace: UpstreamPlace,
): PlacesDetailEntry {
    if (isPlaceLocalEntry(upstreamPlace)) {
        // Assuming that there can be only one business address for now
        const businessAddress: UpstreamBusinessAddress | undefined = head(
            findBusinessAddresses(upstreamPlace.addresses),
        );

        const links = businessAddress?.contacts.flatMap((contact) => {
            const link = convertUpstreamContactToLink(contact);
            return link ? [link] : [];
        });

        const openingHours = upstreamPlace.opening_hours
            ? convertUpstreamOpeningHours(upstreamPlace.opening_hours)
            : null;

        return {
            ...convertUpstreamPlaceToPlacesListEntry(upstreamPlace),
            links: links ?? [],
            openingHours: openingHours,
        };
    }

    throw new TypeError(
        `Unexpected place _class encountered: ${upstreamPlace._class}`,
    );
}

function convertUpstreamContactToLink(
    upstreamContact: UpstreamContact,
): PlaceLink | null {
    if (isUpstreamPhoneContact(upstreamContact)) {
        return {
            type: 'phone',
            contactId: upstreamContact.id,
            uri: `tel://${upstreamContact.call_link}`,
            label: upstreamContact.formatted_service_code,
        };
    }
    if (isUpstreamUrlContact(upstreamContact)) {
        return {
            type: 'web',
            contactId: upstreamContact.id,
            uri: upstreamContact.url,
            label: upstreamContact.formatted_service_code,
        };
    }

    return null;
}

/**
 * `PlacesService` with dummy data.
 */
export class DummyPlacesServiceImpl implements PlacesService {
    static DUMMY_PLACE_IDS = [
        'GXvPAor1ifNfpF0U5PTG0w',
        'ohGSnJtMIC5nPfYRi_HTAg',
    ];

    private _httpClient: AxiosInstance;

    /**
     * @param httpClient An axios instance that returns a place by requesting `/{placeId}`.
     */
    constructor(httpClient: AxiosInstance) {
        this._httpClient = httpClient;
    }

    async listPlaces(): Promise<PlacesListEntry[]> {
        const responses: AxiosResponse<UpstreamPlace>[] = await Promise.all(
            DummyPlacesServiceImpl.DUMMY_PLACE_IDS.map((placeId) =>
                this._httpClient.get<UpstreamPlace>(`/${placeId}`),
            ),
        );

        return responses.map((response) =>
            convertUpstreamPlaceToPlacesListEntry(response.data),
        );
    }

    async searchPlaces(query: string): Promise<PlacesListEntry[]> {
        const places = await this.listPlaces();
        const searchString = query.toLowerCase();

        return filter(places, (place: PlacesListEntry) => {
            const searchContent =
                `${place.displayName} ${place.displayAddress}`.toLowerCase();
            return searchContent.includes(searchString);
        });
    }

    async getPlaceDetails(
        placeId: string,
    ): Promise<PlacesDetailEntry | undefined> {
        if (!DummyPlacesServiceImpl.DUMMY_PLACE_IDS.includes(placeId)) {
            return undefined;
        }

        const response = await this._httpClient.get<UpstreamPlace>(
            `/${placeId}`,
        );

        return convertUpstreamPlaceToPlacesDetailEntry(response.data);
    }
}

let defaultPlacesServiceInstance: PlacesService | null = null;

export function defaultPlacesService(): PlacesService {
    if (!defaultPlacesServiceInstance) {
        defaultPlacesServiceInstance = new DummyPlacesServiceImpl(
            getPlacesHttpClient(),
        );
    }

    return defaultPlacesServiceInstance;
}

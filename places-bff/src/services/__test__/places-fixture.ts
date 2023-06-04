import { PlacesListEntry } from '../../models/places';

export const LIST_PLACES = {
    WEYLAND_YUTANI: {
        entryId: 'entry 1',
        displayName: 'Weyland-Yutani Corporation',
        displayAddress: 'Musterstrasse 42, 8099 Musterstadt',
    },
    CYBERDYNE: {
        entryId: 'entry 2',
        displayName: 'Cyberdyne Systems',
        displayAddress: 'Rue Exemple 8, 1337 Exempleville',
    },
};

export const ALL_LIST_PLACES: PlacesListEntry[] = Object.values(LIST_PLACES);

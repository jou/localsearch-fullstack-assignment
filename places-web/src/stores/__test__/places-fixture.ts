import { PlacesListEntry } from '../../models/places';
import { range } from 'lodash';

export const PLACES_FIXTURE: PlacesListEntry[] = range(8).map(
    (i: number): PlacesListEntry => ({
        entryId: `entry id ${i}`,
        displayName: `displayName ${i}`,
        displayAddress: `displayAddress ${i}`,
    }),
);

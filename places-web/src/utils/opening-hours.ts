import { last, isEqual } from 'lodash';

import { OpeningHours, OpeningPeriod, WeekdayName } from '../models/places';
import { allWeekdayNames } from './weekdays';

/** Representation of consecutive weekdays with identical opening hours */
export interface ConsolidatedOpeningHours {
    /** Weekday the given opening hours start applying. */
    startWeekday: WeekdayName;
    /** Weekday the given opening hours stops applying. */
    endWeekday: WeekdayName;
    /** Time periods the business is open at. `null` indicates that it is closed for the day. */
    openingPeriods: OpeningPeriod[] | null;
}

export function consolidateOpeningHours(
    rawOpeningHours: OpeningHours,
): ConsolidatedOpeningHours[] {
    // Note: (jou) - Currently assuming week starts on Monday regardless of user's locale
    const weekdays = allWeekdayNames();
    const consolidatedHours: ConsolidatedOpeningHours[] = [];

    for (const weekday of weekdays) {
        // NOTE: (jou) The data model seems to only denote open hours, working on the assumption that anything time
        //             not explicitly marked as open is closed.
        const latestConsolidatedHour = last(consolidatedHours);
        const openingPeriods = rawOpeningHours.days[weekday] ?? null;

        if (!latestConsolidatedHour) {
            // First iteration, start stuff
            consolidatedHours.push({
                startWeekday: weekday,
                endWeekday: weekday,
                openingPeriods: openingPeriods,
            });
            continue;
        }

        if (isEqual(latestConsolidatedHour.openingPeriods, openingPeriods)) {
            // Hours of the latest entry is the same as this one, proceed
            latestConsolidatedHour.endWeekday = weekday;
        } else {
            // Hours are different, start a new entry
            consolidatedHours.push({
                startWeekday: weekday,
                endWeekday: weekday,
                openingPeriods: openingPeriods,
            });
        }
    }

    return consolidatedHours;
}

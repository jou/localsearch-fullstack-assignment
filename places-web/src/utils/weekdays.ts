import { range } from 'lodash';
import { DateTime } from 'luxon';
import { WeekdayName } from '../models/places.ts';

/** Maps `WeekdayName` values to JavaScript `Date`'s, e.g. JS_WEEKDAY_NAME_ORDER[0] is sunday */
const JS_WEEKDAY_NAME_ORDER: WeekdayName[] = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
];

/** Inverse mapping of the above */
const WEEKDAY_NAME_TO_JS_WEEKDAY_MAP: Record<WeekdayName, number> =
    Object.fromEntries(
        Array.from(JS_WEEKDAY_NAME_ORDER.entries()).map(
            ([index, weekDay]): [WeekdayName, number] => [weekDay, index],
        ),
    ) as Record<WeekdayName, number>;

const FORMATTED_WEEKDAY_NAMES: Record<WeekdayName, string> = Object.fromEntries(
    Array.from(JS_WEEKDAY_NAME_ORDER.entries()).map(
        ([weekdayNumber, weekdayName]): [WeekdayName, string] => {
            return [
                weekdayName,
                DateTime.fromObject({ weekday: weekdayNumber }).toLocaleString({
                    weekday: 'long',
                }),
            ];
        },
    ),
) as Record<WeekdayName, string>;

export function jsDayNumberToWeekdayName(jsDayNumber: number): WeekdayName {
    return JS_WEEKDAY_NAME_ORDER[jsDayNumber];
}

export function weekdayNameToJsDayNumber(weekday: WeekdayName): number {
    return WEEKDAY_NAME_TO_JS_WEEKDAY_MAP[weekday];
}

/** Returns a list of JS weekday numbers for a whole week, starting from the specified start of week. */
export function allWeekdayNumbers(startOfWeek = 1): number[] {
    return [...range(startOfWeek, 7), ...range(0, startOfWeek)];
}

/** Returns a list of `WeekdayName` for a whole week, starting from the specified start of week. */
export function allWeekdayNames(startOfWeek = 1): WeekdayName[] {
    return allWeekdayNumbers(startOfWeek).map((weekdayNumber) =>
        jsDayNumberToWeekdayName(weekdayNumber),
    );
}

export function formatWeekday(weekday: WeekdayName): string {
    return FORMATTED_WEEKDAY_NAMES[weekday];
}

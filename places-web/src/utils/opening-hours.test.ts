import { describe, it, expect } from 'vitest';
import { OpeningHours } from '../models/places';
import {
    ConsolidatedOpeningHours,
    consolidateOpeningHours,
} from './opening-hours';

describe('opening-hours', () => {
    describe('consolidateOpeningHours()', () => {
        it('should consolidate consecutive days with identical opening hours', () => {
            const openingHours: OpeningHours = {
                days: {
                    monday: [{ start: '10:00', end: '10:00', type: 'OPEN' }],
                    tuesday: [{ start: '10:00', end: '10:00', type: 'OPEN' }],
                    wednesday: [{ start: '10:00', end: '10:00', type: 'OPEN' }],
                },
                closedOnHolidays: false,
            };

            const expectedConsolidatedHours: ConsolidatedOpeningHours[] = [
                {
                    startWeekday: 'monday',
                    endWeekday: 'wednesday',
                    openingPeriods: [
                        { start: '10:00', end: '10:00', type: 'OPEN' },
                    ],
                },
                {
                    startWeekday: 'thursday',
                    endWeekday: 'sunday',
                    openingPeriods: null,
                },
            ];

            expect(consolidateOpeningHours(openingHours)).toEqual(
                expectedConsolidatedHours,
            );
        });

        it('should handle everyday having the same opening hours', () => {
            const openingHours: OpeningHours = {
                days: {
                    monday: [{ start: '10:00', end: '10:00', type: 'OPEN' }],
                    tuesday: [{ start: '10:00', end: '10:00', type: 'OPEN' }],
                    wednesday: [{ start: '10:00', end: '10:00', type: 'OPEN' }],
                    thursday: [{ start: '10:00', end: '10:00', type: 'OPEN' }],
                    friday: [{ start: '10:00', end: '10:00', type: 'OPEN' }],
                    saturday: [{ start: '10:00', end: '10:00', type: 'OPEN' }],
                    sunday: [{ start: '10:00', end: '10:00', type: 'OPEN' }],
                },
                closedOnHolidays: false,
            };

            const expectedConsolidatedHours: ConsolidatedOpeningHours[] = [
                {
                    startWeekday: 'monday',
                    endWeekday: 'sunday',
                    openingPeriods: [
                        { start: '10:00', end: '10:00', type: 'OPEN' },
                    ],
                },
            ];

            expect(consolidateOpeningHours(openingHours)).toEqual(
                expectedConsolidatedHours,
            );
        });

        it('should handle everyday being closed', () => {
            const openingHours: OpeningHours = {
                days: {},
                closedOnHolidays: false,
            };

            const expectedConsolidatedHours: ConsolidatedOpeningHours[] = [
                {
                    startWeekday: 'monday',
                    endWeekday: 'sunday',
                    openingPeriods: null,
                },
            ];

            expect(consolidateOpeningHours(openingHours)).toEqual(
                expectedConsolidatedHours,
            );
        });

        it('should create distinct entries with gap in the middle', () => {
            const openingHours: OpeningHours = {
                days: {
                    monday: [{ start: '10:00', end: '10:00', type: 'OPEN' }],
                    tuesday: [{ start: '10:00', end: '10:00', type: 'OPEN' }],
                    wednesday: [{ start: '10:00', end: '10:00', type: 'OPEN' }],
                    saturday: [{ start: '10:00', end: '10:00', type: 'OPEN' }],
                    sunday: [{ start: '10:00', end: '10:00', type: 'OPEN' }],
                },
                closedOnHolidays: false,
            };

            const expectedConsolidatedHours: ConsolidatedOpeningHours[] = [
                {
                    startWeekday: 'monday',
                    endWeekday: 'wednesday',
                    openingPeriods: [
                        { start: '10:00', end: '10:00', type: 'OPEN' },
                    ],
                },
                {
                    startWeekday: 'thursday',
                    endWeekday: 'friday',
                    openingPeriods: null,
                },
                {
                    startWeekday: 'saturday',
                    endWeekday: 'sunday',
                    openingPeriods: [
                        { start: '10:00', end: '10:00', type: 'OPEN' },
                    ],
                },
            ];

            expect(consolidateOpeningHours(openingHours)).toEqual(
                expectedConsolidatedHours,
            );
        });
    });
});

import { describe, it, expect } from 'vitest';
import { allWeekdayNames, allWeekdayNumbers } from './weekdays';

describe('weekday utils', () => {
    describe('allWeekdayNumbers', () => {
        it('should return weekday numbers of a week starting from monday', () => {
            expect(allWeekdayNumbers(1)).toEqual([1, 2, 3, 4, 5, 6, 0]);
        });

        it('should return weekday numbers of a week starting from sunday', () => {
            expect(allWeekdayNumbers(0)).toEqual([0, 1, 2, 3, 4, 5, 6]);
        });

        it('should default to starting from monday', () => {
            expect(allWeekdayNumbers()).toEqual([1, 2, 3, 4, 5, 6, 0]);
        });
    });

    describe('allWeekdayNames', () => {
        it('should return weekday names of a week starting from monday', () => {
            expect(allWeekdayNames(1)).toEqual([
                'monday',
                'tuesday',
                'wednesday',
                'thursday',
                'friday',
                'saturday',
                'sunday',
            ]);
        });

        it('should return weekday names of a week starting from sunday', () => {
            expect(allWeekdayNames(0)).toEqual([
                'sunday',
                'monday',
                'tuesday',
                'wednesday',
                'thursday',
                'friday',
                'saturday',
            ]);
        });
        it('should return default to starting from monday', () => {
            expect(allWeekdayNames()).toEqual([
                'monday',
                'tuesday',
                'wednesday',
                'thursday',
                'friday',
                'saturday',
                'sunday',
            ]);
        });
    });
});

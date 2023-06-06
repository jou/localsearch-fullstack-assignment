<script setup lang="ts">
import { ConsolidatedOpeningHours } from '../../utils/opening-hours';
import { formatWeekday } from '../../utils/weekdays';

defineProps<{
    openingHours: ConsolidatedOpeningHours[];
}>();

function formatValidWeekdayRange(
    openingHoursEntry: ConsolidatedOpeningHours,
): string {
    if (openingHoursEntry.startWeekday === openingHoursEntry.endWeekday) {
        // Entry is valid for single day only
        return formatWeekday(openingHoursEntry.startWeekday);
    }

    return `${formatWeekday(
        openingHoursEntry.startWeekday,
    )}\xA0-\xA0${formatWeekday(openingHoursEntry.endWeekday)}`;
}
</script>

<template>
    <div class="opening-hours gap-4">
        <template
            v-for="openingHoursEntry in openingHours"
            :key="openingHoursEntry.startWeekday"
        >
            <div class="text-right">
                {{ formatValidWeekdayRange(openingHoursEntry) }}
            </div>
            <div>
                <template v-if="openingHoursEntry.openingPeriods">
                    <p
                        v-for="openingPeriod in openingHoursEntry.openingPeriods"
                        :key="`${openingPeriod.start}${openingPeriod.end}`"
                    >
                        {{ openingPeriod.start }}&nbsp;-&nbsp;{{
                            openingPeriod.end
                        }}
                    </p>
                </template>
                <template v-else>Closed</template>
            </div>
        </template>
    </div>
</template>

<style scoped>
.opening-hours {
    display: grid;
    grid-template-columns: fit-content(75%) auto;
}
</style>

import { z } from 'zod';

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/; // HH:MM regex

export const slotValidationSchema = z.object({
  body: z
    .object({
      service: z.string({ invalid_type_error: 'service id is required!' }),
      date: z
        .string({ invalid_type_error: 'date is required!' })
        .regex(
          /^\d{4}-\d{2}-\d{2}$/,
          'Invalid date format, must be YYYY-MM-DD',
        ),
      startTime: z.string().regex(timeRegex, 'Invalid start time format!'),
      endTime: z.string().regex(timeRegex, 'Invalid end time format!'),
    })
    .refine(
      (data) => {
        const [startHours, startMinutes] = data.startTime
          .split(':')
          .map(Number);
        const [endHours, endMinutes] = data.endTime.split(':').map(Number);

        const start = new Date(0, 0, 0, startHours, startMinutes);
        const end = new Date(0, 0, 0, endHours, endMinutes);
        const minDuration = 60 * 60 * 1000; // 1 hour in milliseconds
        const maxEndTime = new Date(0, 0, 0, 20, 0); // Maximum allowed end time (e.g., 20:00)

        // Check if startMinutes and endMinutes are on the hour (00 minutes)
        const isValidStartMinutes = startMinutes === 0;
        const isValidEndMinutes = endMinutes === 0;

        // Ensure end time is at least 1 hour after start time
        const isValidDuration = end.getTime() - start.getTime() >= minDuration;

        // Ensure end time does not exceed the allowed range
        const isWithinAllowedRange = end.getTime() <= maxEndTime.getTime();

        // Ensure end time is not before start time
        const isValidEndTime = end.getTime() > start.getTime();

        // Handle errors
        if (
          !isValidStartMinutes ||
          !isValidEndMinutes ||
          !isValidDuration ||
          !isValidEndTime ||
          !isWithinAllowedRange
        ) {
          return false;
        }

        return true;
      },
      {
        message:
          'Start time and end time must both be on the hour, end time must be at least 1 hour after start time, and end time must be within the allowed range (e.g., not exceeding 20:00).',
        path: ['endTime'],
      },
    ),
});

export const updateSlotStatusSchema = z.object({
  body: z.object({
    slotStatus: z.enum(['available', 'unavailable'], {
      invalid_type_error: 'Invalid slot status',
    }),
  }),
});

'use client';

import { useEffect, useState } from 'react';
import { format, formatDistance } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

export const useLocalDateTime = () => {
  const [userTimeZone, setUserTimeZone] = useState<string>('');
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
      setUserTimeZone(timeZone);

      const now = new Date();
      const currentTimeInTimeZone = toZonedTime(now, timeZone);
      setCurrentTime(currentTimeInTimeZone);
    }
  }, []);

  return { userTimeZone, currentTime };
};

export const formatDate = (
  date: Date,
  formatStr = 'dd-LLL-yyyy',
): string | Date => (date ? format(date, formatStr) : date);

export const formatDateTime = (
  date: Date,
  formatStr = 'dd-LLL-yyy HH:mm',
): string | Date => (date ? format(date, formatStr) : date);

export const formatDateDistance = (date: Date): string | Date =>
  date
    ? formatDistance(date, new Date(), {
        addSuffix: true,
        includeSeconds: false,
      })
    : date;

export function formatDateTimeLocal(
  date: Date | string | undefined,
  userTimeZone: string,
  formatStr = 'yyyy/MM/dd, HH:mm:ss',
): string {
  if (date) {
    const originalDate = typeof date === 'string' ? new Date(date) : date;
    const currentTimeInTimeZone = toZonedTime(originalDate, userTimeZone);

    return formatDate(currentTimeInTimeZone, formatStr) as string;
  }

  return '';
}

export const utcFormatDate = (
  dateString: string | null,
  hours = 0,
  minutes = 0,
  seconds = 0,
  milliseconds = 0,
): string | null => {
  if (!dateString) {
    return null;
  }
  const date = new Date(dateString);
  date.setHours(hours, minutes, seconds, milliseconds);

  return date.toISOString();
};

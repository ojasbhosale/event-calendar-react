// Ensure consistent date handling across the application
export const DAYS_IN_WEEK = 7;
export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const WEEKDAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function createLocalDate(date) {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function getMonthDays(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

export function getMonthFirstDay(month, year) {
  return new Date(year, month, 1).getDay();
}

export function formatDateForInput(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function isSameDay(date1, date2) {
  if (!date1 || !date2) return false;
  const d1 = createLocalDate(date1);
  const d2 = createLocalDate(date2);
  return d1.getTime() === d2.getTime();
}

export function formatTime(timeString) {
  if (!timeString) return '';
  try {
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  } catch (error) {
    return timeString;
  }
}

export function isWeekend(date) {
  return date.getDay() === 0 || date.getDay() === 6;
}

export function isToday(date) {
  return isSameDay(date, new Date());
}

export function timeToMinutes(timeString) {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
}

export function getDayName(date) {
  return WEEKDAYS[new Date(date).getDay()];
}


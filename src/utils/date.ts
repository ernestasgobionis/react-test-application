import * as DateFNS from 'date-fns';

// export const parseTimestamp = timestamp => {
//   return DateFNS.parse(DateFNS.format(timestamp));
// };

export const formatDate = (date: any, format: string = 'yyyy-MM-dd') => {
  return DateFNS.format(date, format);
};

// export const getTime = date => {
//   return DateFNS.getTime(date);
// };
//
// export const isPastDate = date => {
//   return DateFNS.isPast(date);
// };
//
// export const isSameYear = (a, b) => {
//   return DateFNS.isSameYear(a, b);
// };
//
// export const isSameDay = (a, b) => {
//   return DateFNS.isSameDay(a, b);
// };
//
// export const addTime = (date, { hours = 0, minutes = 0, seconds = 0 }) => {
//   let newDate = date;
//   newDate = DateFNS.addSeconds(newDate, seconds);
//   newDate = DateFNS.addMinutes(newDate, minutes);
//   newDate = DateFNS.addHours(newDate, hours);
//   return newDate;
// };
//
// export const differenceInMinutes = (dateA, dateB) => {
//   return DateFNS.differenceInMinutes(dateA, dateB);
// };
//
// export const convertTimestampToSecondPrecision = timestamp => {
//   const time = parseInt(timestamp);
//   return Math.round(time / 1000) * 1000;
// };
//
// export const isWithinRange = (date, startDate, endDate) => {
//   return DateFNS.isWithinRange(date, startDate, endDate);
// };
//
// export const addToDate = (date, { years = 0, months = 0, days = 0 }) => {
//   let newDate = date;
//   newDate = DateFNS.addYears(newDate, years);
//   newDate = DateFNS.addMonths(newDate, months);
//   newDate = DateFNS.addDays(newDate, days);
//   return newDate;
// };
//
// export const subFromDate = (date, { years = 0, months = 0, days = 0 }) => {
//   let newDate = date;
//   newDate = DateFNS.subYears(newDate, years);
//   newDate = DateFNS.subMonths(newDate, months);
//   newDate = DateFNS.subDays(newDate, days);
//   return newDate;
// };
//
// export const addMonths = (date, amount) => {
//   return DateFNS.addMonths(date, amount);
// };
//
// export const subMonths = (date, amount) => {
//   return DateFNS.subMonths(date, amount);
// };

import * as DateFNS from 'date-fns';

export const formatDate = (date: any, format: string = 'yyyy-MM-dd') => {
  return DateFNS.format(date, format);
};

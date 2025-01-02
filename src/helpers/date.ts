import moment, { type Moment } from 'moment';
import 'moment-timezone';
import config from '@/config';

export const dateObj = (datetime?: string | Date | moment.Moment | null): Moment | null => {
  if (!datetime) {
    return null;
  }

  let momentDatetime;
  if (moment.isMoment(datetime)) {
    momentDatetime = datetime;
  } else {
    if (datetime === 'now') {
      momentDatetime = moment();
    } else {
      momentDatetime = moment(datetime);
    }
  }

  return momentDatetime.tz(config.VITE_TZ);
};

export const date = (
  datetime?: string | Date | moment.Moment | null,
  format = 'YYYY/MM/DD',
): any => {
  return dateObj(datetime)?.format(format);
};

export const now = (): Moment => {
  return dateObj('now') as Moment;
};

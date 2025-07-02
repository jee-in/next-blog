import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const KoreaTimeZone = "Asia/Seoul";

export function formatUtcToKoreanDate(utcString: string): string {
  if (!utcString) {
    return "";
  }
  return dayjs.utc(utcString).tz(KoreaTimeZone).format("YYYY년 M월 D일");
}

export function isSameDate(utcString1: string, utcString2: string): boolean {
  const date1 = dayjs.utc(utcString1).tz(KoreaTimeZone);
  const date2 = dayjs.utc(utcString2).tz(KoreaTimeZone);

  return (
    date1.year() === date2.year() &&
    date1.month() === date2.month() &&
    date1.date() === date2.date()
  );
}

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

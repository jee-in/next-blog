import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";
// import * as Sentry from "@sentry/nextjs";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

const KoreaTimeZone = "Asia/Seoul";

export function formatUtcToKoreanDate(utcString: string): string | null {
  if (!utcString || utcString.trim() === "") {
    // Sentry.captureMessage(
    //   `[formatUtcToKoreanDate] Received empty string as input: ${utcString}`
    // );
    return null;
  }

  const parsed = dayjs(
    utcString,
    ["YYYY-MM-DDTHH:mm:ssZ", "YYYY-MM-DDTHH:mm:ss.SSSZ", "YYYY-MM-DDTHH:mm:ss[Z]"],
    true
  );

  if (!parsed.isValid()) {
    // Sentry.captureMessage(
    //   `[formatUtcToKoreanDate] Received invalid string as input: ${utcString}`
    // );
    return null;
  }

  return dayjs.utc(utcString).tz(KoreaTimeZone).format("YYYY년 M월 D일");
}

export function isSameDate(utcString1: string, utcString2: string): boolean | null {
  if (!utcString1 || !utcString2 || utcString1.trim() === "" || utcString2.trim() === "") {
    // Sentry.captureMessage(
    //   `[formatUtcToKoreanDate] Received empty string as input: (${utcString1}, ${utcString2})`
    // );
    return null;
  }

  const parsed1 = dayjs(
    utcString1,
    ["YYYY-MM-DDTHH:mm:ssZ", "YYYY-MM-DDTHH:mm:ss.SSSZ", "YYYY-MM-DDTHH:mm:ss[Z]"],
    true
  );
  const parsed2 = dayjs(
    utcString2,
    ["YYYY-MM-DDTHH:mm:ssZ", "YYYY-MM-DDTHH:mm:ss.SSSZ", "YYYY-MM-DDTHH:mm:ss[Z]"],
    true
  );

  if (!parsed1.isValid() || !parsed2.isValid()) {
    // Sentry.captureMessage(
    //   `[formatUtcToKoreanDate] Received invalid string as input: (${utcString1}, ${utcString2})`
    // );
    return null;
  }

  return (
    parsed1.year() === parsed2.year() &&
    parsed1.month() === parsed2.month() &&
    parsed1.date() === parsed2.date()
  );
}

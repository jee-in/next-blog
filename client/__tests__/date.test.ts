import { formatUtcToKoreanDate, isSameDate } from "../src/shared/lib/date";

describe("formatUtcToKoreanDate", () => {
  it("입력값이 유효한 UTC 문자열이면 한국 날짜로 포맷팅된다", () => {
    const input = "2024-07-07T15:00:00Z";
    const result = formatUtcToKoreanDate(input);
    expect(result).toBe("2024년 7월 8일");
  });

  it("입력값이 빈 문자열이면 null을 반환한다.", () => {
    expect(formatUtcToKoreanDate("")).toBeNull();
  });

  it("입력값이 유효하지 않은 문자열이면 null을 반환한다.", () => {
    expect(formatUtcToKoreanDate("2024")).toBeNull();
  });
});

describe("isSameDate", () => {
  it("같은 날짜이면 true를 반환한다.", () => {
    const a = "2024-07-07T15:00:00Z";
    const b = "2024-07-07T18:00:00Z";
    expect(isSameDate(a, b)).toBe(true);
  });

  it("다른 날짜면 false를 반환한다.", () => {
    const a = "2024-07-07T14:00:00Z";
    const b = "2024-07-08T14:00:00Z";
    expect(isSameDate(a, b)).toBe(false);
  });

  it("입력값 중 빈 문자열이 있으면 null을 반환한다.", () => {
    expect(isSameDate("", "2024-07-07T15:00:00Z")).toBeNull();
    expect(isSameDate("2024-07-07T15:00:00Z", "")).toBeNull();
  });

  it("입력값 중 유효하지 않은 문자열이 있으면 null을 반환한다", () => {
    expect(isSameDate("not-a-date", "2024-07-07T15:00:00Z")).toBeNull();
    expect(isSameDate("2024-07-07T15:00:00Z", "2024")).toBeNull();
  });
});

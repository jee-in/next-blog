export const BASE_REPO = process.env.BASE_REPO;

export const milestoneMap = new Map<string, number>([
  ["react", 1],
  ["blog", 2],
  ["algorithm", 3],
  ["computer-system", 4],
]);

export const topics = [
  { name: "React", path: "react" },
  { name: "자료구조와 알고리즘", path: "algorithm" },
  { name: "컴퓨터 시스템", path: "computer-system" },
] as const;

export const references = [{ name: "React 19", path: "react-19" }] as const;

export const referenceMap = new Map<string, string>(
  references.map(({ path, name }) => [path, name])
);

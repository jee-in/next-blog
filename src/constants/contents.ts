export const BASE_REPO = process.env.BASE_REPO;

const topics = [
  { path: "react", topic: "React", milestone: 1 },
  { path: "blog", topic: "Blog", milestone: 3 },
  { path: "algorithm", topic: "자료구조와 알고리즘", milestone: 4 },
  { path: "computer-system", topic: "컴퓨터 시스템", milestone: 5 },
] as const;

export const topicMap = new Map(
  topics.map(({ path, topic, milestone }) => [path, { topic, milestone }])
);

export const references = [{ name: "React 19", path: "react-19" }] as const;

export const referenceMap = new Map<string, string>(
  references.map(({ path, name }) => [path, name])
);

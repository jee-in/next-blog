export const BASE_REPO = process.env.BASE_REPO;

export const topics = [
  { path: "react", topic: "React", milestoneNo: 1 },
  { path: "blog", topic: "Blog", milestoneNo: 3 },
  { path: "algorithm", topic: "자료구조와 알고리즘", milestoneNo: 4 },
  { path: "computer-system", topic: "컴퓨터 시스템", milestoneNo: 5 },
] as const;

export const topicMap = new Map(
  topics.map(({ path, topic, milestoneNo }) => [path, { topic, milestoneNo }])
);

export type TopicPath = (typeof topics)[number]["path"];

export const references = [{ name: "React 19", path: "react-19" }] as const;

export const referenceMap = new Map<string, string>(
  references.map(({ path, name }) => [path, name])
);

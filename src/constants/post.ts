export const BASE_REPO = process.env.BASE_REPO;

export const references = [{ name: "React 19", path: "react-19" }] as const;

export const referenceMap = new Map<string, string>(
  references.map(({ path, name }) => [path, name])
);

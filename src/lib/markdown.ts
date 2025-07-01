export function extractMarkdownTitle(markdown: string): string {
  const match = markdown.match(/^#\s+(.+)/m);
  return match ? match[1].trim() : "";
}

export function removeTitle(markdown: string): string {
  const lines = markdown.split("\n");
  const firstNonEmptyIndex = lines.findIndex((line) =>
    /^#\s+/.test(line.trim())
  );
  if (firstNonEmptyIndex !== -1) {
    lines.splice(firstNonEmptyIndex, 1);
  }
  return lines.join("\n").trim();
}

export function removeMdExtension(filename: string): string {
  return filename.endsWith(".md") ? filename.slice(0, -3) : filename;
}

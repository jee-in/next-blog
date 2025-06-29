import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

interface ContentProps {
  children: string;
}

export default function Content({ children }: ContentProps) {
  return (
    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{children}</ReactMarkdown>
  );
}

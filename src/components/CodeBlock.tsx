import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  diff?: boolean;
  maxHeight?: string;
  height?: string;
  highlightLines?: (number | string)[];
  wrap?: boolean;
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center justify-center w-7 h-7 rounded-md hover:bg-white/10 transition-colors"
      title="Copy to clipboard"
    >
      {copied ? (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#4ade80"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      ) : (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#9ca3af"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
    </button>
  );
}

type DiffType = "add" | "remove" | "context";

function parseDiffLine(line: string): { type: DiffType; content: string } {
  if (line.startsWith("+ ")) return { type: "add", content: line.slice(2) };
  if (line.startsWith("- ")) return { type: "remove", content: line.slice(2) };
  return { type: "context", content: line };
}

const diffLineBg: Record<DiffType, string> = {
  add: "bg-green-900/40",
  remove: "bg-red-900/40",
  context: "",
};

const diffGutterStyle: Record<DiffType, string> = {
  add: "text-green-400",
  remove: "text-red-400",
  context: "text-gray-600",
};

const diffGutterChar: Record<DiffType, string> = {
  add: "+",
  remove: "-",
  context: " ",
};

const diffTokenExtra: Record<DiffType, string> = {
  add: "",
  remove: "line-through decoration-red-500/50",
  context: "",
};

function expandLineRanges(lines: (number | string)[]): Set<number> {
  const set = new Set<number>();
  for (const entry of lines) {
    if (typeof entry === "number") {
      set.add(entry);
    } else {
      const [start, end] = entry.split("-").map(Number);
      for (let i = start; i <= end; i++) set.add(i);
    }
  }
  return set;
}

export function CodeBlock({
  code,
  language = "typescript",
  filename,
  showLineNumbers = true,
  diff = false,
  maxHeight,
  height,
  highlightLines,
  wrap = false,
}: CodeBlockProps) {
  // For diff mode, parse prefixes and strip them for syntax highlighting
  const rawLines = code.trim().split("\n");
  const diffInfo = diff ? rawLines.map(parseDiffLine) : null;
  const highlightSet = highlightLines ? expandLineRanges(highlightLines) : null;
  const highlightCode = diff
    ? diffInfo!.map((d) => d.content).join("\n")
    : code.trim();

  return (
    <div
      className="rounded-lg overflow-auto border border-cf-border bg-[#1e1e1e] flex flex-col"
      style={{
        ...(maxHeight ? { maxHeight } : {}),
        ...(height ? { height } : {}),
      }}
    >
      {filename ? (
        <div className="px-4 py-2 bg-[#2d2d2d] border-b border-[#3d3d3d] flex items-center justify-between sticky top-0 z-10 shrink-0">
          <span className="text-sm text-gray-400">{filename}</span>
          <CopyButton code={highlightCode} />
        </div>
      ) : (
        <div className="flex justify-end px-3 pt-2 shrink-0">
          <CopyButton code={highlightCode} />
        </div>
      )}
      <Highlight theme={themes.vsDark} code={highlightCode} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} p-4 ${!filename ? "pt-1" : ""} ${wrap ? "whitespace-pre-wrap break-words" : "overflow-x-auto"} text-sm leading-relaxed`}
            style={{ ...style, margin: 0, background: "transparent" }}
          >
            {tokens.map((line, i) => {
              const lineType = diffInfo
                ? (diffInfo[i]?.type ?? "context")
                : null;
              const isHighlighted = highlightSet && highlightSet.has(i + 1);
              const bgClass = lineType
                ? diffLineBg[lineType]
                : isHighlighted
                  ? "bg-yellow-500/15"
                  : "";
              const tokenExtra = lineType ? diffTokenExtra[lineType] : "";

              return (
                <div
                  key={i}
                  {...getLineProps({ line })}
                  className={`table-row ${bgClass}`}
                >
                  {diff && lineType && (
                    <span
                      className={`table-cell pr-3 select-none w-4 ${diffGutterStyle[lineType]}`}
                    >
                      {diffGutterChar[lineType]}
                    </span>
                  )}
                  {showLineNumbers && !diff && (
                    <span className="table-cell pr-4 text-gray-600 text-right select-none w-8">
                      {i + 1}
                    </span>
                  )}
                  <span className={`table-cell ${tokenExtra}`}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </div>
  );
}

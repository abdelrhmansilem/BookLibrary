/**
 * A deliberately small Markdown renderer (~90 lines).
 * It supports exactly what the documentation files in `src/docs/` use:
 * headings, paragraphs, unordered and ordered lists, fenced code blocks,
 * **bold**, `inline code` and [links](url).
 *
 * We wrote it instead of adding a dependency: the whole parser is one readable file.
 */

function renderInline(text) {
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  const nodes = [];
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));

    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(<strong key={key++}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("`")) {
      nodes.push(<code key={key++}>{token.slice(1, -1)}</code>);
    } else {
      const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token);
      nodes.push(
        <a key={key++} href={link[2]} target="_blank" rel="noopener noreferrer">
          {link[1]}
        </a>,
      );
    }

    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

const isHeading = (line) => /^(#{1,4})\s+/.test(line);
const isBullet = (line) => /^[-*]\s+/.test(line);
const isNumbered = (line) => /^\d+\.\s+/.test(line);
const isFence = (line) => line.trimStart().startsWith("```");

export function renderMarkdown(markdown) {
  const lines = markdown.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  let index = 0;
  let key = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (isFence(line)) {
      const code = [];
      index += 1;
      while (index < lines.length && !isFence(lines[index])) {
        code.push(lines[index]);
        index += 1;
      }
      index += 1; // skip the closing fence
      blocks.push(
        <pre key={key++}>
          <code>{code.join("\n")}</code>
        </pre>,
      );
      continue;
    }

    if (isHeading(line)) {
      const level = line.match(/^(#{1,4})/)[1].length;
      const Tag = `h${level}`;
      blocks.push(<Tag key={key++}>{renderInline(line.replace(/^(#{1,4})\s+/, ""))}</Tag>);
      index += 1;
      continue;
    }

    if (isBullet(line) || isNumbered(line)) {
      const ordered = isNumbered(line);
      const items = [];
      while (index < lines.length && (isBullet(lines[index]) || isNumbered(lines[index]))) {
        items.push(<li key={index}>{renderInline(lines[index].replace(/^([-*]|\d+\.)\s+/, ""))}</li>);
        index += 1;
      }
      blocks.push(ordered ? <ol key={key++}>{items}</ol> : <ul key={key++}>{items}</ul>);
      continue;
    }

    const paragraph = [];
    while (
      index < lines.length &&
      lines[index].trim() &&
      !isHeading(lines[index]) &&
      !isBullet(lines[index]) &&
      !isNumbered(lines[index]) &&
      !isFence(lines[index])
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    blocks.push(<p key={key++}>{renderInline(paragraph.join(" "))}</p>);
  }

  return blocks;
}

/** The first `# Heading` of a file, used as its table-of-contents label. */
export function markdownTitle(markdown, fallback) {
  const match = markdown.replace(/^\uFEFF/, "").match(/^#\s+(.+)$/m);
  return match ? match[1].trim().replace(/^\d+\.\s*/, "") : fallback;
}

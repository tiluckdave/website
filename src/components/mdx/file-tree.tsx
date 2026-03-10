import { isValidElement, ReactNode } from "react";

interface FileTreeProps {
  children: ReactNode;
}

interface TreeNode {
  name: string;
  depth: number;
  isDir: boolean;
}

function getTextContent(node: any): string {
  if (!node) return "";
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getTextContent).join("");
  if (isValidElement(node)) return getTextContent((node.props as { children?: unknown }).children);
  return "";
}

function walkList(node: any, depth: number, out: TreeNode[]) {
  if (!node) return;
  if (Array.isArray(node)) { node.forEach((n) => walkList(n, depth, out)); return; }
  if (!isValidElement(node)) return;

  const type = node.type as string;
  const props = node.props as { children?: unknown };

  if (type === "ul") {
    walkList(props.children, depth + 1, out);
  } else if (type === "li") {
    const liChildren = Array.isArray(props.children) ? props.children : [props.children];
    const textNodes = liChildren.filter(
      (c: any) => !isValidElement(c) || (c as any).type !== "ul"
    );
    const nestedLists = liChildren.filter(
      (c: any) => isValidElement(c) && (c as any).type === "ul"
    );
    const name = textNodes.map(getTextContent).join("").trim();
    if (name) {
      const isDir = name.endsWith("/") || nestedLists.length > 0;
      out.push({ name: isDir && !name.endsWith("/") ? name + "/" : name, depth: depth - 1, isDir });
    }
    nestedLists.forEach((ul) => walkList(ul, depth, out));
  } else {
    walkList(props.children, depth, out);
  }
}

export default function FileTree({ children }: FileTreeProps) {
  const nodes: TreeNode[] = [];
  walkList(children, 0, nodes);

  return (
    <div
      style={{
        background: "var(--bg-code)",
        borderRadius: "0.5rem",
        padding: "16px",
        margin: "24px 0",
        fontFamily: "var(--font-mono)",
        fontSize: "14px",
        lineHeight: 1.7,
        overflowX: "auto",
      }}
    >
      {nodes.map((node, i) => (
        <div
          key={i}
          style={{
            paddingLeft: `${node.depth * 16}px`,
            color: node.isDir ? "var(--text-primary)" : "var(--text-secondary)",
          }}
        >
          <span style={{ marginRight: "6px", userSelect: "none" }}>{node.isDir ? "📁" : "📄"}</span>
          {node.name}
        </div>
      ))}
    </div>
  );
}

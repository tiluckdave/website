import { Children, isValidElement } from "react";
import type { ReactElement } from "react";
import CodeTabsUI from "./code-tabs-ui";

interface CodeTabsProps {
  children: React.ReactNode;
}

function extractText(node: any): string {
  if (!node) return "";
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (isValidElement(node)) {
    return extractText((node.props as any).children);
  }
  return "";
}

function getTabLabel(child: ReactElement, fallback: string): string {
  const props = child.props as any;
  if (props?.title) return props.title;
  if (props?.children) {
    const kids = Children.toArray(props.children);
    for (const kid of kids) {
      if (isValidElement(kid)) {
        const kidProps = kid.props as any;
        if (kidProps?.["data-rehype-pretty-code-title"] !== undefined) {
          return extractText(kidProps.children) || fallback;
        }
      }
    }
  }
  return fallback;
}

export default function CodeTabs({ children }: CodeTabsProps) {
  const childArray = Children.toArray(children).filter(isValidElement) as ReactElement[];
  const tabs = childArray.map((child, i) => getTabLabel(child, `Tab ${i + 1}`));

  return (
    <CodeTabsUI tabs={tabs}>
      {childArray}
    </CodeTabsUI>
  );
}

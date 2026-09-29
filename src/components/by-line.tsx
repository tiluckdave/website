import Image from "next/image";

interface ByLineProps {
  /**
   * Show avatar photo + author name. Default: false
   * Set to true to render avatar + author name.
   */
  identity?: boolean;
  /** Override the display name shown when identity=true */
  author?: string;
  /** Optional date string if not passed as children */
  date?: string;
  children?: React.ReactNode;
}

export default function ByLine({
  identity = false,
  author = "Tilak Dave",
  date,
  children,
}: ByLineProps) {
  const content = children || date;

  return (
    <span className="byline">
      {identity && (
        <span className="byline-avatar">
          <Image
            src="/pfp.png"
            alt={author}
            width={24}
            height={24}
            className="byline-avatar-img"
            priority
          />
        </span>
      )}

      {content && (
        <span className="byline-text">{content}</span>
      )}

      {identity && content && (
        <span className="byline-sep" aria-hidden="true">·</span>
      )}

      {identity && (
        <span className="byline-name">{author}</span>
      )}
    </span>
  );
}

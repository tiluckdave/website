import Link from "next/link";

interface LinkPreviewProps {
  url: string;
  title?: string;
  description?: string;
}

export default function LinkPreview({ url, title, description }: LinkPreviewProps) {
  const domain = new URL(url).hostname.replace("www.", "");

  if (!title) {
    return <Link href={url} target="_blank" rel="noopener noreferrer">{url}</Link>;
  }

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none", display: "block" }}
    >
      <div
        style={{
          border: "1px solid var(--border)",
          borderRadius: "0.5rem",
          padding: "12px 16px",
          margin: "16px 0",
          background: "var(--bg-secondary)",
        }}
      >
        <div style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "4px" }}>
          {domain}
        </div>
        <div style={{ fontWeight: 500, color: "var(--text-primary)", textDecoration: "underline" }}>
          {title}
        </div>
        {description && (
          <div style={{ fontSize: "14px", color: "var(--text-secondary)", marginTop: "4px" }}>
            {description}
          </div>
        )}
      </div>
    </Link>
  );
}

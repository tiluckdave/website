type CalloutType = "info" | "warning" | "tip" | "danger";

const styles: Record<CalloutType, { label: string; borderColor: string; bg: string; color: string }> = {
  info:    { label: "Note",    borderColor: "var(--accent)",  bg: "var(--accent-subtle)", color: "var(--accent)" },
  tip:     { label: "Tip",     borderColor: "var(--accent)",  bg: "var(--accent-subtle)", color: "var(--accent)" },
  warning: { label: "Warning", borderColor: "#B8860B",        bg: "rgba(184,134,11,0.07)", color: "#B8860B" },
  danger:  { label: "Danger",  borderColor: "#C0392B",        bg: "rgba(192,57,43,0.07)",  color: "#C0392B" },
};

interface CalloutProps {
  type?: CalloutType;
  children: React.ReactNode;
}

export default function Callout({ type = "info", children }: CalloutProps) {
  const s = styles[type];
  return (
    <div
      style={{
        borderLeft: `3px solid ${s.borderColor}`,
        background: s.bg,
        padding: "12px 16px",
        margin: "24px 0",
        fontSize: "15px",
        lineHeight: 1.6,
      }}
    >
      <div style={{
        fontWeight: 700,
        fontSize: "11px",
        color: s.color,
        marginBottom: "4px",
        textTransform: "uppercase",
        letterSpacing: "0.07em",
      }}>
        {s.label}
      </div>
      <div>{children}</div>
    </div>
  );
}

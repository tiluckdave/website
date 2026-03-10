interface StepProps {
  n: number | string;
  title: string;
  children: React.ReactNode;
}

interface StepsProps {
  children: React.ReactNode;
}

export function Steps({ children }: StepsProps) {
  return (
    <div className="steps-container" style={{ margin: "24px 0" }}>
      {children}
    </div>
  );
}

export function Step({ n, title, children }: StepProps) {
  return (
    <div className="step-item" style={{ display: "flex", gap: "16px", paddingBottom: "24px", alignItems: "flex-start" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, alignSelf: "stretch" }}>
        <div
          style={{
            width: "28px",
            height: "28px",
            minHeight: "28px",
            borderRadius: "50%",
            background: "var(--accent)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "13px",
            fontWeight: 700,
            lineHeight: 1,
            flexShrink: 0,
          }}
        >
          {String(n ?? "")}
        </div>
        <div className="step-connector" style={{ width: "1px", flex: 1, background: "var(--border)", marginTop: "6px" }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: "16px", lineHeight: "28px", marginBottom: "6px" }}>{title}</div>
        <div style={{ color: "var(--text-secondary)", fontSize: "15px", lineHeight: 1.6 }}>{children}</div>
      </div>
    </div>
  );
}

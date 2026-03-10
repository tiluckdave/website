import HireNav from "@/components/hire-nav";
import HireFooter from "@/components/hire-footer";

// PRD Section 7 — Hire section layout with adjusted navigation
export default function HireLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HireNav />
      <main
        style={{
          maxWidth: "640px",
          margin: "0 auto",
          padding: "48px 24px 96px",
        }}
      >
        {children}
      </main>
      <HireFooter />
    </>
  );
}

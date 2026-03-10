import HireNav from "@/components/hire-nav";
import HireFooter from "@/components/hire-footer";

export default function HireLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="ambient-glow ambient-glow--hire" aria-hidden="true" />
      <HireNav />
      <main
        style={{
          maxWidth: "680px",
          margin: "0 auto",
          padding: "40px 24px 96px",
        }}
      >
        {children}
      </main>
      <HireFooter />
    </>
  );
}

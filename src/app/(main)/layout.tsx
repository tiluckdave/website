import Nav from "@/components/nav";
import Footer from "@/components/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="ambient-glow" aria-hidden="true" />
      <Nav />
      <main
        style={{
          maxWidth: "680px",
          margin: "0 auto",
          padding: "40px 24px 96px",
        }}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}

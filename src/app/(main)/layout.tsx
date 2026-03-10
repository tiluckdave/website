import Nav from "@/components/nav";
import Footer from "@/components/footer";

// Main site layout — wraps all non-hire pages with main site nav/footer
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main
        style={{
          maxWidth: "640px",
          margin: "0 auto",
          padding: "48px 24px 96px",
        }}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}

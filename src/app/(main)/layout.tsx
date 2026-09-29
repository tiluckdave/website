export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="subpage-wrapper">
      <div className="subpage-container">
        <main className="subpage-main">{children}</main>
      </div>
    </div>
  );
}

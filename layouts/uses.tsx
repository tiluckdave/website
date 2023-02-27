import Container from 'components/Container';

export default function UsesLayout({ children }) {
  return (
    <Container
      title="Uses – Tilak Dave"
      description="Here's what tech I'm currently using for coding and others."
    >
      <article className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-zinc-900 dark:text-zinc-50">
          My Gear
        </h1>
        <p className="text-zinc-700 dark:text-zinc-300 mt-2 mb-8">
          Here's what tech I'm currently using for coding and others. I'll try
          to keep this page updated as I change my setup.
        </p>
        <div className="prose dark:prose-dark w-full">{children}</div>
      </article>
    </Container>
  );
}

import { useMDXComponent } from 'next-contentlayer/hooks';
import components from 'components/MDXComponents';
import ProposalsLayout from 'layouts/proposals';
import { allOtherPages } from '.contentlayer/data';
import type { OtherPage } from '.contentlayer/types';

export default function Demi({ body: { code } }: OtherPage) {
  const Component = useMDXComponent(code);

  return (
    <ProposalsLayout>
      <Component components={components as any} />
    </ProposalsLayout>
  );
}

export async function getStaticProps() {
  const demi = allOtherPages.find((page) => page.slug === 'proposal-plank-studio')!;

  return { props: demi };
}

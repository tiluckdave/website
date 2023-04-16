import Link from 'next/link';
import Image from 'next/image';

import ProsCard from 'components/ProsCard';
import ConsCard from 'components/ConsCard';
import Step from 'components/Step';
import ImageWithTheme from 'components/ImageWithTheme';

const CustomLink = (props) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...props}>{props.children}</a>
      </Link>
    );
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

function RoundedImage(props) {
  return <img alt={props.alt} className="rounded-lg mx-auto max-h-[65vh]" {...props} />;
}

const MDXComponents = {
  img: RoundedImage,
  ImageWithTheme,
  a: CustomLink,
  ConsCard,
  ProsCard,
  Step,
};

export default MDXComponents;

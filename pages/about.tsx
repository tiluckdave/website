import Link from 'next/link';

import Timeline from '../components/Timeline';
import Container from 'components/Container';
import { ExternalLink } from 'components/Footer';


export default function About() {
  return (
    <Container title="About – Tilak Dave">
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-slate-900 dark:text-slate-50">
          About Me
        </h1>
        <div className="mb-8 prose text-slate-600 dark:text-slate-400">
          <p>
            Hey, I’m Tilak. I'm a student, developer and learnerer.
            I work at BlueLearn as Event & Community Management Intern.
            I am trying to build SaaS applications now-a-days and a bit of freelancing.
          </p>
          <p>
            I grew up in small-town Akola and did schooling there. Currently I am in 3rd Year Diploma in CSE from Gov Poly Pune.
          </p>
          <p>Follow me on socials {' '}<Link href="https://linkedin.com/in/tiluckdave">LinkedIn</Link>, {' '}
        <Link href="https://twitter.com/tiluckdave">Twitter</Link>, {' '}
        <Link href="https://instagram.com/tiluckdave">Instagram</Link>, {' '}
        <Link href="https://github.com/tiluckdave">GitHub</Link>.
          </p>
        </div>
        <Timeline />
      </div>
    </Container>
  );
}

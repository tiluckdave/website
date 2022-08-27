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
          Hey, I’m Tilak - a student, developer and learner. I am trying to build some SaaS applications along with a bit of freelancing. Actively looking internship opportunities as a web developer.
          </p>
          <p>
          I grew up and did my schooling in the city of Akola. I’m done with a Diploma in Computer Science from Government Polytechnic in Pune. And I will get admitted to a degree college soon.
          </p>
          <p>Check me on socials {' '}<Link href="https://linkedin.com/in/tiluckdave">LinkedIn</Link>, {' '}
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

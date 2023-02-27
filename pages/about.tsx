import Link from 'next/link';

import Timeline from '../components/Timeline';
import Container from 'components/Container';

export default function About() {
  return (
    <Container title="About – Tilak Dave">
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-zinc-900 dark:text-zinc-50">
          About Me
        </h1>
        <div className="mb-8 prose text-zinc-600 dark:text-zinc-400">
          <p>
            Hey there! I'm Tilak, a student, developer, and lifelong learner. My
            passion is building great software and working on projects that are
            both exciting and challenging. I am currently seeking internship
            opportunities as a front-end web developer.
          </p>
          <p>
            I grew up in Akola and did my schooling there. At present, I am
            pursuing a B Tech in Computer Science and Engineering from the
            Vishwakarma Institute of Technology in Pune, India.
          </p>
          <p>
            Check me on socials{' '}
            <Link href="https://linkedin.com/in/tiluckdave">LinkedIn</Link>,{' '}
            <Link href="https://twitter.com/tiluckdave">Twitter</Link>,{' '}
            <Link href="https://instagram.com/tiluckdave">Instagram</Link>,{' '}
            {' and '}
            <Link href="https://github.com/tiluckdave">GitHub</Link>.
          </p>
        </div>
        <Timeline />
      </div>
    </Container>
  );
}

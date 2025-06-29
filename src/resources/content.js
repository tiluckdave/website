import { Logo } from "@once-ui-system/core";

const person = {
  firstName: "Tilak",
  lastName: "Dave",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Software Engineer",
  avatar: "/images/avatar.png",
  email: "davetilak003@gmail.com",
  location: "Asia/Kolkata", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: [], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      I occasionally write about design, technology, and share thoughts on the intersection of
      creativity and engineering.
    </>
  ),
};

const social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/tiluckdave",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/tiluckdave/",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Personal website showcasing my work as a ${person.role}`,
  headline: <>Tilak Dave</>,
  featured: {
    display: false,
    title: <>Building <strong className="ml-4">prempushp.in</strong></>,
    href: "https://prempushp.in",
  },
  subline: (
    <>
      a software engineer at Workato, where I develop connectors and integrations After hours, I build my own projects.
    </>
  ),
};

const about = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: false,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I am tech enthusiast, who loves to build projects, contribute to open source, and learn new things. I am a fast iterative programmer, I can stay calm under pressure, manage teams, and deliver results.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Experience",
    experiences: [
      {
        company: "Workato",
        timeframe: "September 2024 - Present",
        role: "Intern, Software Engineer",
        achievements: [
          <>
            Developed connectors and integrations for the workato community library using Workato's connector SDK.
          </>,
          <>
            Act as subject matter expert for stuff related to connectors and the SDK.
          </>
        ],
        images: [],
      },
      {
        company: "AfterQuote",
        timeframe: "July 2023 - March 2024",
        role: "Software Development, Intern",
        achievements: [
          <>
            Played key role in the development of a SaaS platform which helps automate Request for Quotation (RFQ) processes.
          </>
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Education",
    institutions: [
      {
        name: "Vishwakarma Institute of Technology Pune",
        description: <>B. Tech. Computer Engineering</>,
      },
      {
        name: "Government Polytechnic Pune",
        description: <>Diploma in Computer Engineering</>,
      },
    ],
  },
  technical: {
    display: false, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Figma",
        description: <>Able to prototype in Figma with Once UI with unnatural speed.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-02.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-01/cover-03.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Next.js",
        description: <>Building next gen apps with Next.js + Once UI + Supabase.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-04.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about tech...",
  description: `Read what ${person.name} has been up to recently`,
};

const work = {
  path: "/work",
  label: "Projects",
  title: `Projects – ${person.name}`,
  description: `Dev projects by ${person.name}`,
};

export { person, social, newsletter, home, about, blog, work };

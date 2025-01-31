import { InlineCode } from "@/once-ui/components";

const person = {
  firstName: "Tilak",
  lastName: "Dave",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Software Engineer",
  avatar: "/images/avatar.jpg",
  location: "Asia/India", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
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
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/tiluckdave",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/tiluckdave",
  },
  {
    name: "X",
    icon: "x",
    link: "https://www.x.com/tiluckdave",
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:hello@tiluckdave.in",
  },
];

const home = {
  label: "Home",
  title: `${person.name}`,
  description: `Personal website showcasing my work as a ${person.role}`,
  headline: <>Development, Caffine, Sleep</>,
  subline: (
    <>
      I'm Tilak, a software engineering intern at <InlineCode>Workato</InlineCode>, where I develop connectors. After hours, I build my own SaaS projects.
    </>
  ),
};

const about = {
  label: "About",
  title: "About me",
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
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
        I'm a technology enthusiast with a solid background in software development and problem-solving. I focus on collaboration, creativity, and staying calm under pressure, always aiming to drive meaningful change and connect with others professionally.
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
            Developed multiple connectors to enrich the Workato ecosystem, enabling users to automate their workflows with ease.
          </>
        ],
        images: []
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
        images: []
      },
    ]
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
        images: [],
      },
    ],
  },
};

const blog = {
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  label: "Projects",
  title: "My projects",
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  label: "Gallery",
  title: "My photo gallery",
  description: `A photo collection by ${person.name}`,
  images: [
    {
      src: "/images/gallery/img-01.jpg",
      alt: "image",
      orientation: "vertical",
    }
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };

import { useState } from 'react';

const Divider = () => {
  return (
    <div className="border border-zinc-200 dark:border-zinc-600 w-full my-8" />
  );
};

const Year = ({ children }) => {
  return (
    <h3 className="text-lg md:text-xl font-bold mb-4 tracking-tight text-zinc-900 dark:text-zinc-100">
      {children}
    </h3>
  );
};

const Step = (props) => {
  return (
    <li className="mb-4 ml-2">
      <div className="flex items-center mb-2 text-green-700 dark:text-green-300">
        <span className="sr-only">Check</span>
        <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <path d="M22 4L12 14.01l-3-3" />
          </g>
        </svg>
        <p className="font-medium text-zinc-900 dark:text-zinc-100">
          {props.title}
        </p>
      </div>
      <p className="text-zinc-700 dark:text-zinc-400 ml-6">{props.children}</p>
    </li>
  );
};

const FullTimeline = () => (
  <>
    <Divider />
    <Year>2018</Year>
    <ul>
      <Step title="Love ❤">
        Finally proposed to my crush, and I was so excited!
      </Step>
      <Step title="Won State level Essay Compitition ✍">
        Literally wrote the essay in 3 - 4 hours. But won the competition.
      </Step>
      <Step title="Final year of School 🎒">
        Last year of beloved school.
      </Step>
    </ul>
    <Divider />
    <Year>2017</Year>
    <ul>
      <Step title="Won district level Pitch Compitition 🚗">
        Problem was traffic congetion near hot spot of cities.
      </Step>
      <Step title="School Vice President 👨‍💼">
        I was enough famous to win the election. My election symbol was Lotus.
      </Step>
    </ul>
    <Divider />
    <Year>2011</Year>
    <ul>
      <Step title="First Computer at home 💾">
        I remember playing roadrash every night chance by chance with my brother!
      </Step>
      <Step title="Climbed stage for a speech 🎤">
        My first speech for Republic day. Stood there quaking with fear.
      </Step>
      <Step title="School's Music Squad 🎶">
        Became a part of school's music squad. Singing songs at multiple ocasions!
      </Step>
    </ul>
    <Divider />
    <Year>2005</Year>
    <ul>
      <Step title="Went to school 🏫">
      </Step>
    </ul>
    <Divider />
    <Year>2003</Year>
    <ul>
      <Step title="Born 👶🏼🍼" />
    </ul>
  </>
);

export default function Timeline() {
  const [isShowingFullTimeline, showFullTimeline] = useState(false);

  return (
    <>
      <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 mt-8 text-zinc-900 dark:text-zinc-50">
        Timeline
      </h3>
      <Year>2023</Year>
      <ul>
        <Step title="First Hackathon 👩‍💻">
          Participated in my first hackathon. Guess what? I won it!
        </Step>
      </ul>
      <Divider />
      <Year>2022</Year>
      <ul>
        <Step title="Degree College 🏫">
          Got admitted to Vishwakarma Institute of Technology.
        </Step>
        <Step title="First SaaS app 🍎">
          Made Fast Feedback, a mini SaaS application for developers.
        </Step>
        <Step title="Started Game Development 🎮">
          Trying out a little with Unity and Defold. Loving the Lua language.
        </Step>
        <Step title="President @ COM'e'IT 💻">
          President of my department's student association. Not really proud of it though.
        </Step>
        <Step title="First Freelancing Client 💵">
          Got my first client for a little webdev job. New start!
        </Step>
        <Step title="Started Investing 📈">
          Used my earnings and invested a small part into Indian Stock Market.
        </Step>
      </ul>
      <Divider />
      <Year>2021</Year>
      <ul>
        <Step title="Joined BlueLEarn as an Intern 👨‍👩‍👧‍👦">
          Staying in the community lead me join the company as an Event and Community Management Intern. Started earning a little.
        </Step>
        <Step title="Got interest about Finance 💲">
          Learnt a bit about Financial literacy from youtube.
        </Step>
        <Step title="Member of BlueLearn 🤼">
          One of the best descisions I ever made. I'm so glad I joined the community and made multiple connections with awesome minds!
        </Step>
      </ul>
      <Divider />
      <Year>2020</Year>
      <ul>
        <Step title="Taught coding 👨‍🏫">
          Taught Web Development and C language to school students and juniors.
        </Step>
        <Step title="Lockdown happened 🔒">
          Came back to home, had a nice long vacations.
        </Step>
      </ul>
      <Divider />
      <Year>2019</Year>
      <ul>
        <Step title="Went to Pune for college 🎓">
          Chose something which no one would. Got CSE at Government Polytechnic Pune.
        </Step>
        <Step title="First Website 🌐">
          Made my first website using WordPress. It was fun.
        </Step>
        <Step title="96.20% ✔">
          Secured this much in my 10th std. Okay, sorry for flex.
        </Step>
        <Step title="Left my home 🏃‍♂️">
          I was disturbed and left my home. Thank God I realised I was wrong, returned back in 3 days.
        </Step>
      </ul>
      {isShowingFullTimeline ? (
        <FullTimeline />
      ) : (
        <button
          type="button"
          className="flex items-center text-sm my-4 mx-auto px-4 py-2 rounded-md font-medium text-zinc-900 dark:text-zinc-100"
          onClick={() => showFullTimeline(true)}
        >
          See More
          <svg
            className="h-4 w-4 ml-1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      )}
    </>
  );
}

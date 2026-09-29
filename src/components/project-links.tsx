interface ProjectLinkItemProps {
  href: string;
  children: React.ReactNode;
}

interface ProjectLinksProps {
  links?: Array<{ label: string; url: string }>;
  children?: React.ReactNode;
}

/** 
 * Drop-in MDX component. Two usage patterns:
 *
 * 1. Prop-based (works in Server Components):
 *    <ProjectLinks links={[{ label: "Live ↗", url: "https://..." }]} />
 *
 * 2. Children-based (more MDX-native):
 *    <ProjectLinks>
 *      <ProjectLink href="https://...">Live Site ↗</ProjectLink>
 *    </ProjectLinks>
 */
export function ProjectLink({ href, children }: ProjectLinkItemProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="project-link-btn"
    >
      {children}
    </a>
  );
}

export default function ProjectLinks({ links, children }: ProjectLinksProps) {
  return (
    <div className="project-links">
      {links?.map((link) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link-btn"
        >
          {link.label}
        </a>
      ))}
      {children}
    </div>
  );
}

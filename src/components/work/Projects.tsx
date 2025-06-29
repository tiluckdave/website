import { getPosts } from "@/utils/utils";
import { Column } from "@once-ui-system/core";
import { ProjectCard } from "@/components";

interface ProjectsProps {
	range?: [number, number?];
}

export function Projects({ range }: ProjectsProps) {
	let allProjects: ReturnType<typeof getPosts>;

	try {
		allProjects = getPosts(["src", "app", "work", "projects"]);
	} catch (error) {
		// Return empty component if no projects exist
		allProjects = [];
	}

	const sortedProjects = allProjects.sort((a, b) => {
		return (
			new Date(b.metadata.publishedAt).getTime() -
			new Date(a.metadata.publishedAt).getTime()
		);
	});

	const displayedProjects = range
		? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
		: sortedProjects;

	// Don't render anything if there are no projects to display
	if (displayedProjects.length === 0) {
		return null;
	}

	return (
		<Column fillWidth gap='xl' marginBottom='40' paddingX='l'>
			{displayedProjects.map((post, index) => (
				<ProjectCard
					priority={index < 2}
					key={post.slug}
					href={`work/${post.slug}`}
					images={post.metadata.images}
					title={post.metadata.title}
					description={post.metadata.summary}
					content={post.content}
					avatars={
						post.metadata.team?.map((member) => ({ src: member.avatar })) || []
					}
					link={post.metadata.link || ""}
				/>
			))}
		</Column>
	);
}

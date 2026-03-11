import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import projects from "@/../content/projects.json";

export const metadata: Metadata = {
	title: siteConfig.seo.hireWork.title,
	description: siteConfig.seo.hireWork.description,
	keywords: [...siteConfig.seo.hireWork.keywords],
	authors: [{ name: siteConfig.name, url: siteConfig.url }],
	alternates: {
		canonical: `${siteConfig.url}/hire/work`,
	},
	openGraph: {
		type: "website",
		title: siteConfig.seo.hireWork.title,
		description: siteConfig.seo.hireWork.ogDescription,
		url: `${siteConfig.url}/hire/work`,
		images: [{ url: "/hire/opengraph-image", width: 1200, height: 630 }],
	},
	twitter: {
		card: "summary_large_image",
		images: ["/hire/opengraph-image"],
	},
};

export default function HireWorkPage() {
	const { hireWork } = siteConfig;
	const featuredProjects = projects.filter((p) => p.featured);

	return (
		<div className='animate-in'>
			<h1>{hireWork.heading}</h1>
			<p style={{ color: "var(--text-secondary)" }}>
				{hireWork.intro} <Link href='/projects'>all projects →</Link>
			</p>

			<div className='stagger-children' style={{ marginTop: "48px" }}>
				{featuredProjects.map((project, i) => (
					<div
						key={project.slug}
						style={{
							paddingBottom: "48px",
							marginBottom: "48px",
							borderBottom:
								i < featuredProjects.length - 1
									? "1px solid var(--border)"
									: "none",
						}}
					>
						<div
							className='hover-lift'
							style={{
								width: "100%",
								aspectRatio: "3 / 1",
								borderRadius: "0.5rem",
								border: "1px solid var(--border)",
								overflow: "hidden",
								marginBottom: "20px",
							}}
						>
							{project.image ? (
								<Image
									src={project.image}
									alt={project.title}
									width={680}
									height={383}
									style={{ width: "100%", height: "100%", objectFit: "cover" }}
									loading='lazy'
								/>
							) : (
								<div
									style={{
										width: "100%",
										height: "100%",
										background: "var(--bg-secondary)",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										color: "var(--text-muted)",
										fontSize: "13px",
										fontFamily: "var(--font-mono)",
									}}
								>
									{project.title}
								</div>
							)}
						</div>

						<h2 style={{ marginTop: 0, marginBottom: "4px" }}>
							{project.title}
						</h2>
						<div
							style={{
								color: "var(--text-muted)",
								fontSize: "13px",
								marginBottom: "20px",
							}}
						>
							{project.category}
						</div>

						<div
							style={{ display: "flex", flexDirection: "column", gap: "12px" }}
						>
							<p>
								<span style={{ fontWeight: 600 }}>The problem: </span>
								<span style={{ color: "var(--text-secondary)" }}>
									{project.problem}
								</span>
							</p>
							<p>
								<span style={{ fontWeight: 600 }}>What I built: </span>
								<span style={{ color: "var(--text-secondary)" }}>
									{project.solution}
								</span>
							</p>
							<p style={{ marginBottom: 0 }}>
								<span style={{ fontWeight: 600 }}>Result: </span>
								<span style={{ color: "var(--text-secondary)" }}>
									{project.result}
								</span>
							</p>
						</div>

						{(project.liveUrl || project.repoUrl) && (
							<div
								style={{
									display: "flex",
									gap: "16px",
									marginTop: "16px",
									fontSize: "14px",
								}}
							>
								{project.liveUrl && <Link href={project.liveUrl}>Live ↗</Link>}
								{project.repoUrl && <Link href={project.repoUrl}>Code ↗</Link>}
							</div>
						)}
					</div>
				))}
			</div>

			{hireWork.testimonialsAvailable && (
				<section>
					<h2>{hireWork.testimonialsHeading}</h2>
					{hireWork.testimonials.map((t, i) => (
						<blockquote key={i}>
							<p>{t.quote}</p>
							<footer>
								{t.author} — {t.role}
							</footer>
						</blockquote>
					))}
				</section>
			)}

			<p>
				<Link href='/hire/book'>{hireWork.cta}</Link>
			</p>
		</div>
	);
}

"use client";

import { useEffect } from "react";

export const webMcpTools = [
  {
    name: "get_portfolio_summary",
    description: "Retrieve a structured summary of Tilak Dave's background, expertise, featured projects, and published articles.",
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
    execute: async () => {
      return {
        name: "Tilak Dave",
        role: "Product Engineer",
        company: "Workato",
        location: "Hyderabad, India",
        expertise: ["AI Agents", "MCP (Model Context Protocol)", "Next.js", "Custom Connectors", "TypeScript"],
        projects: [
          { slug: "hound-mcp", title: "Hound MCP", description: "Fast, local, and private search engine for AI agents." },
          { slug: "dinecard", title: "DineCard", description: "AI-native smart dining card companion app." },
          { slug: "prempushp", title: "PremPushp", description: "Flower commerce platform built for local businesses." },
        ],
        notes: [
          { slug: "beliefs", title: "Beliefs", description: "Core technical, engineering, and personal principles." },
        ],
        contact: {
          email: "tiluckdave@gmail.com",
          github: "https://github.com/tiluckdave",
          linkedin: "https://linkedin.com/in/tiluckdave",
          twitter: "https://x.com/tiluckdave",
        },
      };
    },
  },
  {
    name: "get_project_details",
    description: "Get detailed information about a specific project by its slug (e.g., 'hound-mcp', 'dinecard', 'prempushp').",
    inputSchema: {
      type: "object",
      properties: {
        slug: {
          type: "string",
          description: "The unique identifier of the project (hound-mcp, dinecard, prempushp).",
          enum: ["hound-mcp", "dinecard", "prempushp"],
        },
      },
      required: ["slug"],
    },
    execute: async ({ slug }: { slug: string }) => {
      const details: Record<string, any> = {
        "hound-mcp": {
          title: "Hound MCP",
          description: "Fast, local, and private search engine for AI agents using the Model Context Protocol.",
          url: "https://tiluckdave.in/hound-mcp",
          github: "https://github.com/tiluckdave/hound-mcp",
          stack: ["MCP", "Rust / TypeScript", "Local Embeddings", "Vector Search"],
        },
        dinecard: {
          title: "DineCard",
          description: "AI-native smart dining card companion app transforming food discovery.",
          url: "https://tiluckdave.in/dinecard",
          github: "https://github.com/tiluckdave/dinecard",
          stack: ["Next.js", "React Native", "AI Recommendation Engine"],
        },
        prempushp: {
          title: "PremPushp",
          description: "Flower commerce platform built for local florists and consumers.",
          url: "https://tiluckdave.in/prempushp",
          stack: ["Next.js", "PostgreSQL", "Tailored Order Management"],
        },
      };
      return details[slug] || { error: `Project '${slug}' not found.` };
    },
  },
  {
    name: "search_portfolio",
    description: "Search across Tilak Dave's portfolio, articles, notes, and technical stack.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Search keywords (e.g., 'MCP', 'Workato', 'AI', 'Road Rash', 'Pune', 'Beliefs').",
        },
      },
      required: ["query"],
    },
    execute: async ({ query }: { query: string }) => {
      const q = (query || "").toLowerCase();
      const results: Array<{ title: string; url: string; matchReason: string }> = [];

      if (q.includes("mcp") || q.includes("agent") || q.includes("hound") || q.includes("search")) {
        results.push({
          title: "Hound MCP",
          url: "https://tiluckdave.in/hound-mcp",
          matchReason: "Open-source Model Context Protocol search engine for AI agents.",
        });
      }
      if (q.includes("dine") || q.includes("food") || q.includes("card")) {
        results.push({
          title: "DineCard",
          url: "https://tiluckdave.in/dinecard",
          matchReason: "Smart dining companion app.",
        });
      }
      if (q.includes("belief") || q.includes("philosophy") || q.includes("principle")) {
        results.push({
          title: "Beliefs Note",
          url: "https://tiluckdave.in/beliefs",
          matchReason: "Core thoughts on craft, engineering, and personal life.",
        });
      }
      if (q.includes("bio") || q.includes("story") || q.includes("road") || q.includes("pune") || q.includes("workato")) {
        results.push({
          title: "Biography & Career Story",
          url: "https://tiluckdave.in/#work-experience",
          matchReason: "Personal narrative detailing schooling in Pune, hackathons, and Workato.",
        });
      }
      return { query, resultsCount: results.length, results };
    },
  },
];

export default function WebMcpProvider() {
  useEffect(() => {
    try {
      const nav = navigator as any;
      if (nav?.modelContext?.registerTool) {
        for (const tool of webMcpTools) {
          nav.modelContext.registerTool(tool);
        }
      } else if (nav?.modelContext?.provideContext) {
        nav.modelContext.provideContext({
          tools: webMcpTools,
        });
      }
    } catch {
      // Graceful fallback for non-supporting browsers
    }
  }, []);

  const jsonLdManifest = {
    "@context": "https://schema.org",
    "@type": "WebAPI",
    name: "Tilak Dave Portfolio WebMCP API",
    description: "Declarative and Imperative WebMCP tool interface for AI agents.",
    tools: webMcpTools.map((t) => ({
      name: t.name,
      description: t.description,
      parameters: t.inputSchema,
    })),
  };

  return (
    <script
      type="application/json"
      id="webmcp-tools"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdManifest) }}
    />
  );
}

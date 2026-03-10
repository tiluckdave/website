import Link from "next/link";
import CalEmbed from "@/components/cal-embed";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Call",
  description: "Schedule a free 30-minute discovery call with Tilak Dave to discuss your project.",
  alternates: {
    canonical: "https://tiluckdave.in/hire/book",
  },
};

// PRD Section 7.3 — Booking page with Cal.com embed
export default function HireBookPage() {
  return (
    <>
      <h1>Book a free 30-minute discovery call</h1>
      <p>Pick a time that works for you. I&apos;ll come prepared with questions.</p>

      <CalEmbed />

      <p style={{ marginTop: "24px" }}>
        Prefer email?{" "}
        <Link href="/hire/contact">Send project details →</Link>
      </p>
    </>
  );
}

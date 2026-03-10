"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function CalEmbed() {
  const username = process.env.NEXT_PUBLIC_CALCOM_USERNAME ?? "tiluckdave";
  const eventSlug = process.env.NEXT_PUBLIC_CALCOM_EVENT_SLUG ?? "discovery";
  const calLink = `${username}/${eventSlug}`;

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: eventSlug });
      cal("ui", {
        cssVarsPerTheme: {
          light: { "cal-brand": "#2C5F4B" },
          dark: { "cal-brand": "#5B9A7B" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, [eventSlug]);

  return (
    <Cal
      namespace={eventSlug}
      calLink={calLink}
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: "month_view" }}
    />
  );
}

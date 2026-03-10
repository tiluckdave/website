import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0B0F14",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "24px",
        }}
      >
        <div
          style={{
            color: "#C9B06B",
            fontSize: "110px",
            fontWeight: 700,
            display: "flex",
            fontFamily: "serif",
          }}
        >
          T
        </div>
      </div>
    ),
    { ...size }
  );
}

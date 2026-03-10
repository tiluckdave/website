import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: "4px",
        }}
      >
        <div
          style={{
            color: "#5B9A7B",
            fontSize: "20px",
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

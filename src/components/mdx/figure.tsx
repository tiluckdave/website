import Image from "next/image";

interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
}

export default function Figure({ src, alt, caption }: FigureProps) {
  return (
    <figure style={{ margin: "32px 0", padding: 0 }}>
      <Image
        src={src}
        alt={alt}
        width={640}
        height={360}
        style={{ width: "100%", height: "auto", display: "block" }}
      />
      {caption && (
        <figcaption
          style={{
            marginTop: "8px",
            fontSize: "14px",
            color: "var(--text-secondary)",
            fontStyle: "italic",
            textAlign: "center",
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

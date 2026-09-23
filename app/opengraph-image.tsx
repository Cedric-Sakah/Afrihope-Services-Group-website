import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Dynamic OG image for the home page — generated at request/build time, no static asset to keep in sync with copy changes in content/site.ts. */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#084b46",
          padding: "90px",
        }}
      >
        <div style={{ display: "flex", fontSize: 96, fontWeight: 700 }}>
          <span style={{ color: "#f5a623" }}>Afri</span>
          <span style={{ color: "#ffffff" }}>Hope</span>
        </div>
        <div
          style={{
            display: "flex",
            width: 260,
            height: 10,
            backgroundColor: "#f5a623",
            marginTop: 22,
            marginBottom: 40,
          }}
        />
        <div style={{ display: "flex", fontSize: 34, color: "#d6e8e5", maxWidth: 900 }}>
          {site.motto}
        </div>
      </div>
    ),
    size,
  );
}

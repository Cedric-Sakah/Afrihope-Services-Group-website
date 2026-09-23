import { ImageResponse } from "next/og";
import { getBusinessUnitBySlug } from "@/content/business-units";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Dynamic per-unit OG image — name + tagline, generated from content/business-units.ts so it never drifts out of sync with the page copy. */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const unit = getBusinessUnitBySlug(slug);

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
        <div style={{ display: "flex", fontSize: 28, fontWeight: 700, marginBottom: 28 }}>
          <span style={{ color: "#f5a623" }}>Afri</span>
          <span style={{ color: "#ffffff" }}>Hope</span>
        </div>
        <div
          style={{
            display: "flex",
            width: 100,
            height: 8,
            backgroundColor: "#f5a623",
            marginBottom: 36,
          }}
        />
        <div style={{ display: "flex", fontSize: 64, fontWeight: 700, color: "#ffffff", maxWidth: 1000 }}>
          {unit?.name ?? "Afrihope Group"}
        </div>
        {unit && (
          <div style={{ display: "flex", fontSize: 32, color: "#d6e8e5", marginTop: 24, maxWidth: 950 }}>
            {unit.tagline}
          </div>
        )}
      </div>
    ),
    size,
  );
}

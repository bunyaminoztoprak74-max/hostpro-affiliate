import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "WordPress Launch Kit & Hosting Guide";
  const badge = searchParams.get("badge") || "🚀 HostPro Launch Kit";
  const subtitle = searchParams.get("subtitle") || "75% OFF Cloud Hosting • LiteSpeed Speed • Free Domain";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#0b0f19",
          padding: "60px 80px",
          fontFamily: "sans-serif"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              padding: "10px 24px",
              borderRadius: "9999px",
              backgroundColor: "rgba(79, 70, 229, 0.25)",
              border: "1px solid rgba(99, 102, 241, 0.5)",
              color: "#a5b4fc",
              fontSize: "22px",
              fontWeight: 700
            }}
          >
            {badge}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <h1
            style={{
              fontSize: "56px",
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.15,
              maxWidth: "1040px"
            }}
          >
            {title}
          </h1>
          <p style={{ fontSize: "26px", color: "#94a3b8", margin: 0 }}>
            {subtitle}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid #1f2937",
            paddingTop: "24px"
          }}
        >
          <span style={{ fontSize: "28px", fontWeight: 800, color: "#6366f1" }}>
            HostPro Reviews
          </span>
          <span style={{ fontSize: "22px", color: "#64748b" }}>
            hostproreviews.com/quickstart
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630
    }
  );
}

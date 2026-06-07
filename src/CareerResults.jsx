import { useState, useEffect } from "react";
import { generateCareerAnalysis } from "./gemini";

export default function CareerResults() {
  const [hovered, setHovered] = useState(null);
  const [aiData, setAiData] = useState(null);
  const decision = localStorage.getItem("decision");
const goal = localStorage.getItem("goal");
let recommendation = "";

if (goal === "Internship") {
  recommendation =
    "Focus on building projects while maintaining consistent DSA practice. This combination maximizes internship opportunities.";
}
else if (goal === "Placement") {
  recommendation =
    "Prioritize DSA, aptitude preparation, and interview practice to strengthen placement readiness.";
}
else if (goal === "Higher Studies") {
  recommendation =
    "Invest more time in academics, research, and competitive exam preparation.";
}
else if (goal === "Freelancing") {
  recommendation =
    "Build practical skills and a strong portfolio to attract freelance opportunities.";
}
else if (goal === "Startup") {
  recommendation =
    "Focus on product building, networking, and validating ideas through projects.";
}
else {
  recommendation =
    "Choose a balanced path that develops both technical skills and practical experience.";
}
const context = localStorage.getItem("context");
useEffect(() => {
  generateCareerAnalysis(
    decision,
    goal,
    context
  )
    .then((result) => {

      console.log("RAW:", result);

      const parsed = JSON.parse(result);

      console.log("PARSED:", parsed);

      setAiData(parsed);
    })
    .catch((error) => {
      console.log(error);

      setAiData({
        universeA: {
          focus: "AI unavailable",
          pros: ["Please try again later"],
          risk: "Quota reached"
        },
        universeB: {
          focus: "AI unavailable",
          pros: ["Please try again later"],
          risk: "Quota reached"
        },
        suggestedPath: "AI quota reached. Retry later."
      });
    });
}, []);

  const futures = [
    {
      title: "Universe A",
      path: aiData?.universeA?.focus || "Loading...",
      color: "rgba(120,150,255,0.35)",
      points: [
 ...(aiData?.universeA?.pros || []),
 `Risk: ${aiData?.universeA?.risk || ""}`
],
    },
    {
      title: "Universe B",
      path: aiData?.universeB?.focus || "Loading...",
      color: "rgba(180,120,255,0.35)",
      points: [
 ...(aiData?.universeB?.pros || []),
`Risk: ${aiData?.universeB?.risk || ""}`
],
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "black",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "40px",
        fontFamily: "'Segoe UI', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Nebula Glow */}
      <div
        style={{
          position: "absolute",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background: "rgba(120,150,255,0.12)",
          filter: "blur(120px)",
          top: "10%",
          left: "-100px",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "rgba(180,120,255,0.10)",
          filter: "blur(120px)",
          bottom: "10%",
          right: "-80px",
        }}
      />

      <h1
        style={{
          fontSize: "42px",
          fontFamily: "'Georgia', serif",
          fontWeight: "500",
          textShadow:
            "0 0 10px rgba(255,255,255,0.4), 0 0 35px rgba(120,150,255,0.4)",
          zIndex: 1,
        }}
      >
        Your Futures
      </h1>

      <div
        style={{
          fontSize: "20px",
          fontStyle: "italic",
          opacity: 0.85,
          textAlign: "center",
          marginBottom: "50px",
          zIndex: 1,
        }}
      >
        Every choice creates a different path.
        <div
  style={{
    textAlign: "center",
    marginTop: "25px",
    marginBottom: "30px",
    lineHeight: "1.8",
    zIndex: 1,
  }}
>
  <p><strong>Your Decision:</strong> {decision}</p>
  <p><strong>Your Goal:</strong> {goal}</p>
  <p><strong>Your Context:</strong> {context}</p>
</div>
<h2
  style={{
    textAlign: "center",
    marginBottom: "5px",
    marginTop: "10px",
    fontFamily: "'Georgia', serif",
    fontWeight: "500",
    color: "rgba(220,220,255,0.95)",
    textShadow: "0 0 12px rgba(120,150,255,0.25)",
    zIndex: 1,
  }}
>
  Analysis Based On Your Inputs
</h2>
        
      </div>

      <div
        style={{
          display: "flex",
          gap: "30px",
          zIndex: 1,
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "-25px",
        }}
      >
        {futures.map((future, index) => (
          <div
            key={index}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            style={{
              width: "340px",
              padding: "25px",
              borderRadius: "24px",
              border:
                hovered === index
                  ? `1px solid ${future.color}`
                  : "1px solid rgba(255,255,255,0.12)",

              background:
                hovered === index
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(255,255,255,0.03)",

              transform:
                hovered === index
                  ? "translateY(-8px)"
                  : "translateY(0px)",

              boxShadow:
                hovered === index
                  ? `0 0 35px ${future.color}`
                  : "0 0 0px transparent",

              transition: "all 0.35s ease",
            }}
          >
            <h2>{future.title}</h2>

            <h3
              style={{
                color: "rgba(180,200,255,0.95)",
                marginBottom: "20px",
              }}
            >
              {future.path}
            </h3>

            {future.points.map((point, i) => (
              <p key={i}>• {point}</p>
            ))}
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "25px",
          maxWidth: "800px",
          textAlign: "center",
          zIndex: 1,
        }}
      >
        <h2
          style={{
            fontFamily: "'Georgia', serif",
          }}
        >
          Suggested Path
        </h2>

        <p
          style={{
            lineHeight: "1.8",
            opacity: 0.9,
          }}
        >
        {aiData?.suggestedPath || "Generating analysis..."}
        </p>
      </div>
    </div>
  );
}
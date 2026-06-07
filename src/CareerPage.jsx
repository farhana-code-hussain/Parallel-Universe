import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CareerPage() {
  const [goal, setGoal] = useState("");
  const [decision, setDecision] = useState("");
  const [context, setContext] = useState("");
  const [hoverButton, setHoverButton] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "black",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "20px",
        paddingBottom: "0px",
        fontFamily: "'Segoe UI', sans-serif",
        position: "relative",
overflow: "hidden",
      }}
    >
      {/* Left Nebula */}
<div
  style={{
    position: "absolute",
    width: "350px",
    height: "350px",
    borderRadius: "50%",
    background: "rgba(120,150,255,0.12)",
    filter: "blur(120px)",
    top: "15%",
    left: "-100px",
    zIndex: 0,
  }}
/>

{/* Right Nebula */}
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
    zIndex: 0,
  }}
/>
      <h1
        style={{
          fontSize: "40px",
          fontFamily: "'Georgia', serif",
          fontWeight: "500",
          textAlign: "center",
          marginBottom: "20px",
          textShadow:
            "0 0 10px rgba(255,255,255,0.4), 0 0 35px rgba(120,150,255,0.4)",
        }}
      >
        Career Decisions
      </h1>

      <p
        style={{
          marginTop: "0px",
          marginBottom: "10px",
          fontSize: "20px",
          fontStyle: "italic",
          opacity: 0.9,
          textAlign: "center",
          maxWidth: "700px",
        }}
      >
        Your future is shaped by the choices you make today.
        <br />
        Let's explore where each path might lead.
      </p>

      <div
        style={{
          width: "700px",
          marginTop: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          position: "relative",
zIndex: 1,
        }}
      >
        <div>
          <h3>What decision are you facing?</h3>

          <textarea
          value={decision}
onChange={(e) => setDecision(e.target.value)}
            placeholder="Example: Should I focus on DSA or Web Development?"
            style={{
              width: "700px",
              display: "flex",
    flexDirection: "column",
    alignItems: "center",
              height: "60px",
              marginTop: "10px",
              background: "rgba(255,255,255,0.04)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "15px",
              padding: "12px",
              fontSize: "16px",
              resize: "none",
            }}
          />
        </div>

        <div>
          <h3>What is your goal?</h3>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              justifyContent: "center",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            {[
              "Internship",
              "Placement",
              "Higher Studies",
              "Freelancing",
              "Startup",
              "Other",
            ].map((item) => (
              <button
                key={item}
                onClick={() => setGoal(item)}
                style={{
                  padding: "10px 16px",
                  borderRadius: "20px",
                  border:
                    goal === item
                      ? "1px solid rgba(120,150,255,0.8)"
                      : "1px solid rgba(255,255,255,0.15)",
                  background:
                    goal === item
                      ? "rgba(120,150,255,0.15)"
                      : "rgba(255,255,255,0.04)",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3>Additional Context</h3>

          <textarea
          value={context}
onChange={(e) => setContext(e.target.value)}
            placeholder="Example: I am a first-year student and can dedicate 2 hours daily."
            style={{
              width: "700px",
              display: "flex",
    flexDirection: "column",
    alignItems: "center",
              height: "60px",
              marginTop: "10px",
              background: "rgba(255,255,255,0.04)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "15px",
              padding: "12px",
              fontSize: "16px",
              resize: "none",
            }}
          />
        </div>

        <button
        onClick={() => {
  localStorage.setItem("decision", decision);
  localStorage.setItem("goal", goal);
  localStorage.setItem("context", context);

  navigate("/career-results");
}}
        onMouseEnter={() => setHoverButton(true)}
        onMouseLeave={() => setHoverButton(false)}
          style={{
            width: "320px",
            alignSelf: "center",
            position: "relative",
            top: "-5px",
            marginTop: "20px",
            padding: "16px",
            borderRadius: "30px",
            border: "1px solid rgba(120,150,255,0.5)",
            background: "rgba(120,150,255,0.1)",
            color: "white",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            textShadow: "0 0 10px rgba(120,150,255,0.3)",

            transform: hoverButton
  ? "scale(1.05) translateY(-2px)"
  : "scale(1)",

boxShadow: hoverButton
  ? "0 0 30px rgba(120,150,255,0.35)"
  : "0 0 15px rgba(120,150,255,0.15)",

transition: "all 0.3s ease",
          }}
        >
          Generate Futures
        </button>
      </div>
    </div>
  );
}
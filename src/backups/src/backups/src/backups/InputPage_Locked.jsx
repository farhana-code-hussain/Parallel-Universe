import { useState, useEffect, useRef } from "react";

export default function InputPage() {
  const [hovered, setHovered] = useState(null);
  const [shootingStar, setShootingStar] = useState(null);
  const [superComet, setSuperComet] = useState(null);

  const cards = [
    {
      title: "Career",
      desc: "Internships • Placements • Higher Studies",
      color: "rgba(120,150,255,0.35)",
    },
    {
      title: "Learning",
      desc: "Courses • Skills • Certifications",
      color: "rgba(120,255,220,0.35)",
    },
    {
      title: "Projects",
      desc: "Hackathons • Startups • Research",
      color: "rgba(255,190,120,0.35)",
    },
    {
      title: "Custom Decision",
      desc: "Anything else on your mind",
      color: "rgba(220,120,255,0.35)",
    },
  ];

useEffect(() => {
  const interval = setInterval(() => {
    setShootingStar({
      id: Date.now(),
      x: Math.random() * 25,
      y: Math.random() * 25,
      dx: 900 + Math.random() * 400,
      dy: 700 + Math.random() * 400,
    });

    setTimeout(() => setShootingStar(null), 2600);
  }, 10000);

  return () => clearInterval(interval);
}, []);

useEffect(() => {
  const interval = setInterval(() => {
    setSuperComet({
      id: Date.now(),
      x: Math.random() * 20,
      y: Math.random() * 20,
      dx: 1400,
      dy: 900,
    });

    setTimeout(() => setSuperComet(null), 3200);
  }, 45000);

  return () => clearInterval(interval);
}, []);

  return (
    <div
      style={{
        height: "100vh",
        background: "black",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        paddingTop: "65px",
        boxSizing: "border-box",
        overflow: "hidden",
        position: "relative",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      {/* Starfield */}
      <Starfield
        shootingStar={shootingStar}
  superComet={superComet}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <h1
          style={{
            fontSize: "34px",
    fontFamily: "'Georgia', serif",
    fontWeight: "500",
    letterSpacing: "0.3px",
    lineHeight: "1.4",
    marginBottom: "18px",
    maxWidth: "900px",
   textShadow:
  "0 0 10px rgba(255,255,255,0.5),0 0 25px rgba(131, 100, 255, 0.62),0 0 50px rgba(130,100,255,0.45),0 0 90px rgba(130,100,255,0.25)"
          }}
        >
          The future isn't fixed.
          <br />
          It's shaped by what you choose today.
        </h1>

        <p
          style={{
            fontSize: "22px",
            opacity: 0.9,
            fontStyle: "italic",
            marginBottom: "22px",
            lineHeight: "1.5",
            opacity: 0.95,
textShadow:
  "0 0 14px rgba(120, 255, 219, 0.58),0 0 35px rgba(120, 255, 219, 0.36)"
          }}
        >
          Every path leads somewhere.
          <br />
          Where do you want yours to go?
        </p>

        <p
          style={{
            fontSize: "20px",
    opacity: 0.9,
    fontStyle: "italic",
    fontWeight: "700",
    marginBottom: "45px",
    textShadow:
  "0 0 10px rgba(255,190,120,0.28), 0 0 18px rgba(255,190,120,0.12)"
          }}
        >
          Which decision is shaping your future right now?
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 320px)",
            gap: "22px",
          }}
        >
          {cards.map((card, index) => (
            <button
              key={index}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              style={{
                height: "145px",
                borderRadius: "22px",

                border:
                  hovered === index
                    ? `1px solid ${card.color}`
                    : "1px solid rgba(255,255,255,0.12)",

                background:
                  hovered === index
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(255,255,255,0.03)",

                color: "white",
                cursor: "pointer",

                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",

                transform:
                  hovered === index
                    ? "translateY(-8px) scale(1.03)"
                    : "translateY(0px) scale(1)",

                boxShadow:
                  hovered === index
                    ? `0 0 35px ${card.color}`
                    : "0 0 0px rgba(255,255,255,0)",

                transition: "all 0.35s ease",
              }}
            >
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "600",
                  marginBottom: "12px",
                }}
              >
                {card.title}
              </div>

              <div
                style={{
                  fontSize: "14px",
                  opacity: 0.8,
                  maxWidth: "220px",
                  lineHeight: "1.4",
                }}
              >
                {card.desc}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Starfield({ shootingStar, superComet }) {
  const starsRef = useRef(
    Array.from({ length: 130 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() < 0.85 ? 1 : 2,
      bright: Math.random() < 0.12,
      speed: 2 + Math.random() * 3,
    }))
  );

  const stars = starsRef.current;

  return (
    <div style={spaceStyles.starLayer}>
      {stars.map((s, i) => (
        <div
          key={i}
          style={{
            ...spaceStyles.star,
            width: `${s.size}px`,
            height: `${s.size}px`,
            top: `${s.y}%`,
            left: `${s.x}%`,
            opacity: s.bright ? 0.9 : 0.4,
            boxShadow: s.bright
              ? "0 0 6px rgba(255,255,255,0.8)"
              : "0 0 3px rgba(255,255,255,0.25)",
            animationDuration: `${s.speed}s`,
          }}
        />
      ))}

      {shootingStar && (
        <div
          style={{
            ...spaceStyles.shootingStar,
            top: `${shootingStar.y}%`,
            left: `${shootingStar.x}%`,
            "--dx": `${shootingStar.dx}px`,
            "--dy": `${shootingStar.dy}px`,
          }}
        />
      )}

      {superComet && (
        <div
          style={{
            ...spaceStyles.superComet,
            top: `${superComet.y}%`,
            left: `${superComet.x}%`,
            "--dx": `${superComet.dx}px`,
            "--dy": `${superComet.dy}px`,
          }}
        />
      )}
    </div>
  );
}

const spaceStyles = {
  starLayer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },

  star: {
    position: "absolute",
    background: "white",
    borderRadius: "50%",
    animationName: "starLife",
    animationIterationCount: "infinite",
    animationTimingFunction: "ease-in-out",
  },

  shootingStar: {
    position: "absolute",
    width: "3px",
    height: "3px",
    borderRadius: "50%",
    background: "white",
    boxShadow:
      "0 0 14px rgba(255,255,255,1), 0 0 40px rgba(255,255,255,0.6)",
    opacity: 0,
    animationName: "meteor",
    animationDuration: "2.6s",
    animationTimingFunction: "linear",
  },

  superComet: {
    position: "absolute",
    width: "4px",
    height: "4px",
    borderRadius: "50%",
    background: "white",
    boxShadow:
      "0 0 20px rgba(255,255,255,1), 0 0 70px rgba(255,255,255,0.5)",
    animationName: "superMeteor",
    animationDuration: "3.2s",
    animationTimingFunction: "linear",
  },
};

const styleSheet = document.styleSheets[0];

styleSheet.insertRule(`
@keyframes starLife {
  0% { opacity: 0.35; transform: scale(1); }
  50% { opacity: 0.9; transform: scale(1.08); }
  100% { opacity: 0.4; transform: scale(1); }
}
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
@keyframes meteor {
  0% { opacity: 0; transform: translate(0px,0px); }
  10% { opacity: 1; }
  100% { opacity: 0; transform: translate(var(--dx), var(--dy)); }
}
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
@keyframes superMeteor {
  0% { opacity: 0; transform: translate(0px,0px) scale(1); }
  10% { opacity: 1; }
  100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(1.2); }
}
`, styleSheet.cssRules.length);
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ParallelUniverse() {
  const navigate = useNavigate();
  const lines = [
    "What if the future wasn't fixed?",
    "What if every choice created a new path?",
    "What if you could see where they lead?",
    "Some paths change everything.",
  ];

  const finalLine =
    "Every decision creates different futures.";

  const [showTitle, setShowTitle] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [visible, setVisible] = useState(false);
  const [showFinalLine, setShowFinalLine] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [hover, setHover] = useState(false);

  const [shootingStar, setShootingStar] = useState(null);
  const [superComet, setSuperComet] = useState(null);

  useEffect(() => {
    setShowTitle(true);

    const firstLine = setTimeout(() => {
      setVisible(true);
    }, 2500);

    return () => clearTimeout(firstLine);
  }, []);

  useEffect(() => {
    if (!showTitle) return;

    let index = 0;

    const interval = setInterval(() => {
      setVisible(false);

      setTimeout(() => {
        index++;

        if (index < lines.length) {
          setCurrentLine(index);
          setVisible(true);
        } else {
          clearInterval(interval);

          setShowFinalLine(true);

          setTimeout(() => {
            setShowButton(true);
          }, 1800);
        }
      }, 1200);
    }, 4500);

    return () => clearInterval(interval);
  }, [showTitle]);

  /* Shooting Star */
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
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  /* Rare Comet */
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
    <div style={styles.container}>
      <Starfield
        shootingStar={shootingStar}
        superComet={superComet}
      />

      <h1
        style={{
          ...styles.title,
          opacity: showTitle ? 1 : 0,
        }}
      >
        PARALLEL UNIVERSE
      </h1>

      <div style={styles.textArea}>
        {!showFinalLine ? (
          <p
            style={{
              ...styles.line,
              opacity: visible ? 1 : 0,
            }}
          >
            {lines[currentLine]}
          </p>
        ) : (
          <p style={styles.finalLine}>
            {finalLine}
          </p>
        )}
      </div>

      {showButton && (
      <button
    style={{
      ...styles.button,
      transform: hover
        ? "scale(1.06) translateY(-2px)"
        : "scale(1) translateY(0px)",
      boxShadow: hover
        ? "0 0 30px rgba(255,255,255,0.18)"
        : "0 0 20px rgba(255,255,255,0.08)",
    }}
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
    onClick={() => navigate("/input")}
  >
    Explore Your Futures
  </button>
          )}
         </div>
  );
}

/* STARFIELD */

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
    <div style={styles.starLayer}>
      {stars.map((s, i) => (
        <div
          key={i}
          style={{
            ...styles.star,
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
            ...styles.shootingStar,
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
            ...styles.superComet,
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

/* STYLES */

const styles = {
  container: {
    height: "100vh",
    width: "100%",
    background: "black",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "'Segoe UI', sans-serif",
    overflow: "hidden",
    position: "relative",
  },

  title: {
    fontSize: "58px",
    fontWeight: "700",
    letterSpacing: "10px",
    marginBottom: "120px",
    transition: "opacity 3s ease",
    textShadow:
      "0 0 20px rgba(255,255,255,0.25), 0 0 70px rgba(140,100,255,0.35)",
  },

  textArea: {
    height: "90px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  line: {
    maxWidth: "750px",
    lineHeight: "1.8",
    fontSize: "22px",
    fontWeight: "400",
    transition: "opacity 1.2s ease",
  },

  finalLine: {
    maxWidth: "800px",
    lineHeight: "1.8",
    fontSize: "30px",
    fontWeight: "600",
    textShadow:
      "0 0 12px rgba(255,255,255,0.15)",
  },

  button: {
    marginTop: "80px",
  padding: "14px 36px",
  borderRadius: "30px",
  border: "1px solid white",
  background: "transparent",
  color: "white",
  cursor: "pointer",
  fontWeight: "600",
  letterSpacing: "1px",
  transition:
    "transform 0.3s ease, box-shadow 0.3s ease",
  },

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
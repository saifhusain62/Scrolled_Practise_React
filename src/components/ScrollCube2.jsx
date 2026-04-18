import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  {
    index: 0,
    label: "01 / Front Face",
    title: "Begin Here",
    subtitle: "The face the world sees first.",
    desc: "Every surface has a story. This is where yours starts — clean, direct, and facing forward.",
    bg: "#06080f",
    bgGlow: "#1a3a8f",
    accent: "#4f9eff",
    lightColor: "#4f9eff",
  },
  {
    index: 1,
    label: "02 / Side Face",
    title: "Turn & See",
    subtitle: "A new angle changes everything.",
    desc: "Rotate your perspective. The side reveals depth you never could see standing at the front.",
    bg: "#0f060f",
    bgGlow: "#6a1a8f",
    accent: "#c44fff",
    lightColor: "#c44fff",
  },
  {
    index: 2,
    label: "03 / Back Face",
    title: "The Other Side",
    subtitle: "What lies behind defines the whole.",
    desc: "The back is not the end — it's the foundation. The hidden face that holds everything together.",
    bg: "#050f08",
    bgGlow: "#0a5a28",
    accent: "#3dffa0",
    lightColor: "#3dffa0",
  },
];

const TARGET_Y = [0, Math.PI / 2, Math.PI];

export default function ScrollCube() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const stRef = useRef({
    cube: null,
    edges: null,
    dotMats: [],
    lights: [],
    renderer: null,
    animFrame: null,
    currentSection: 0,
    isTransitioning: false,
    lastScrollTime: 0,
    goToSection: null,
    // Whether this component is in the viewport
    isVisible: false,
  });
  const [section, setSection] = useState(0);
  const [textReady, setTextReady] = useState(true);

  useEffect(() => {
    let alive = true;

    const loadLibs = () =>
      new Promise((res) => {
        let n = 2;
        const done = () => --n === 0 && res();
        if (window.THREE) done();
        else {
          const s = document.createElement("script");
          s.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
          s.onload = done;
          document.head.appendChild(s);
        }
        if (window.gsap) done();
        else {
          const s = document.createElement("script");
          s.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
          s.onload = done;
          document.head.appendChild(s);
        }
      });

    const init = async () => {
      await loadLibs();
      if (!alive) return;

      const THREE = window.THREE;
      const gsap = window.gsap;
      const st = stRef.current;
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const W = () => canvas.clientWidth || 480;
      const H = () => canvas.clientHeight || 480;

      // ── Scene ──
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(44, W() / H(), 0.1, 100);
      camera.position.set(0, 0.25, 5.8);

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(W(), H());
      renderer.setClearColor(0x000000, 0);
      st.renderer = renderer;

      // ── Lights ──
      const amb = new THREE.AmbientLight(0xffffff, 0.2);
      scene.add(amb);
      const key = new THREE.DirectionalLight(0x4f9eff, 3.0);
      key.position.set(4, 5, 5);
      scene.add(key);
      const fill = new THREE.DirectionalLight(0x4f9eff, 0.7);
      fill.position.set(-4, -2, 3);
      scene.add(fill);
      const rim = new THREE.PointLight(0x4f9eff, 2.0, 14);
      rim.position.set(0, 4, -4);
      scene.add(rim);
      st.lights = [key, fill, rim];

      // ── Cube ──
      const makeMat = (hex, bright = false) =>
        new THREE.MeshPhongMaterial({
          color: new THREE.Color(hex),
          shininess: bright ? 90 : 55,
          specular: new THREE.Color(0x4f9eff),
          transparent: true,
          opacity: 0.97,
        });

      const faceMats = [
        makeMat(0x0c1025),
        makeMat(0x0c1025),
        makeMat(0x101428),
        makeMat(0x08091a),
        makeMat(0x18253d, true),
        makeMat(0x0c1025),
      ];

      const geo = new THREE.BoxGeometry(2.5, 2.5, 2.5);
      const cube = new THREE.Mesh(geo, faceMats);
      cube.rotation.y = 0;
      cube.rotation.x = 0.08;
      scene.add(cube);
      st.cube = cube;

      const edgesGeo = new THREE.EdgesGeometry(geo);
      const edgesMat = new THREE.LineBasicMaterial({ color: 0x4f9eff });
      const edges = new THREE.LineSegments(edgesGeo, edgesMat);
      cube.add(edges);
      st.edges = edges;

      const corners = [
        [-1.25,-1.25,-1.25],[1.25,-1.25,-1.25],[1.25,1.25,-1.25],[-1.25,1.25,-1.25],
        [-1.25,-1.25,1.25],[1.25,-1.25,1.25],[1.25,1.25,1.25],[-1.25,1.25,1.25],
      ];
      const dotGeo = new THREE.SphereGeometry(0.058, 8, 8);
      const dotMats = corners.map(() => new THREE.MeshBasicMaterial({ color: 0x4f9eff }));
      st.dotMats = dotMats;
      corners.forEach(([x, y, z], i) => {
        const dot = new THREE.Mesh(dotGeo, dotMats[i]);
        dot.position.set(x, y, z);
        cube.add(dot);
      });

      // ── goToSection ──
      const goToSection = (next) => {
        if (st.isTransitioning) return;
        if (next < 0 || next >= SECTIONS.length) return;
        if (next === st.currentSection) return;

        st.isTransitioning = true;
        const sec = SECTIONS[next];

        setTextReady(false);

        edgesMat.color.setStyle(sec.accent);
        dotMats.forEach((m) => m.color.setStyle(sec.accent));
        key.color.setStyle(sec.lightColor);
        fill.color.setStyle(sec.lightColor);
        rim.color.setStyle(sec.lightColor);
        faceMats.forEach((m) => m.specular.setStyle(sec.lightColor));

        gsap.to(cube.rotation, {
          y: TARGET_Y[next],
          duration: 1.25,
          ease: "power3.inOut",
          onComplete: () => {
            st.currentSection = next;
            st.isTransitioning = false;
            setSection(next);
            setTimeout(() => setTextReady(true), 60);
          },
        });

        const tilts = [0.08, 0.14, 0.06];
        gsap.to(cube.rotation, {
          x: tilts[next],
          duration: 1.25,
          ease: "power2.inOut",
        });
      };

      st.goToSection = goToSection;

      // ── Render loop ──
      let t = 0;
      const tick = () => {
        st.animFrame = requestAnimationFrame(tick);
        t += 0.007;
        cube.position.y = Math.sin(t) * 0.07;
        renderer.render(scene, camera);
      };
      tick();

      // ── SMART SCROLL HANDLER ──
      // Logic:
      //   • Not visible in viewport → do nothing (page scrolls freely)
      //   • Scrolling DOWN + already on last face → do nothing (page scrolls to next section)
      //   • Scrolling UP + already on first face → do nothing (page scrolls to prev section)
      //   • Otherwise → intercept and rotate the cube

      const onWheel = (e) => {
        if (!st.isVisible) return; // not in view, ignore

        const dir = e.deltaY > 0 ? 1 : -1;
        const cur = st.currentSection;

        const wouldExit =
          (dir === 1 && cur === SECTIONS.length - 1) || // scrolling down past last face
          (dir === -1 && cur === 0);                     // scrolling up before first face

        if (wouldExit) {
          // Let the page scroll naturally — do NOT preventDefault
          return;
        }

        // We have a face to show — take over the scroll
        e.preventDefault();

        const now = Date.now();
        if (now - st.lastScrollTime < 950) return;
        st.lastScrollTime = now;

        goToSection(cur + dir);
      };

      // Touch: same logic
      let ty = 0;
      const onTouchStart = (e) => { ty = e.touches[0].clientY; };
      const onTouchEnd = (e) => {
        if (!st.isVisible) return;
        const dy = ty - e.changedTouches[0].clientY;
        if (Math.abs(dy) < 40) return;

        const dir = dy > 0 ? 1 : -1;
        const cur = st.currentSection;
        const wouldExit =
          (dir === 1 && cur === SECTIONS.length - 1) ||
          (dir === -1 && cur === 0);
        if (wouldExit) return;

        const now = Date.now();
        if (now - st.lastScrollTime < 950) return;
        st.lastScrollTime = now;
        goToSection(cur + dir);
      };

      const onKey = (e) => {
        if (!st.isVisible) return;
        if (["ArrowDown","PageDown","ArrowRight"].includes(e.key)) {
          const cur = st.currentSection;
          if (cur < SECTIONS.length - 1) {
            e.preventDefault();
            goToSection(cur + 1);
          }
        }
        if (["ArrowUp","PageUp","ArrowLeft"].includes(e.key)) {
          const cur = st.currentSection;
          if (cur > 0) {
            e.preventDefault();
            goToSection(cur - 1);
          }
        }
      };

      const onResize = () => {
        camera.aspect = W() / H();
        camera.updateProjectionMatrix();
        renderer.setSize(W(), H());
      };

      // IMPORTANT: { passive: false } needed so we can call preventDefault when required
      container.addEventListener("wheel", onWheel, { passive: false });
      container.addEventListener("touchstart", onTouchStart, { passive: true });
      container.addEventListener("touchend", onTouchEnd, { passive: true });
      window.addEventListener("keydown", onKey);
      window.addEventListener("resize", onResize);

      // ── IntersectionObserver — track if cube section is in viewport ──
      // threshold: 0.6 means at least 60% of the section must be visible
      // before we consider the user "in" the cube section
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            st.isVisible = entry.isIntersecting;
          });
        },
        { threshold: 0.6 }
      );
      observer.observe(container);

      st._cleanup = () => {
        cancelAnimationFrame(st.animFrame);
        renderer.dispose();
        observer.disconnect();
        container.removeEventListener("wheel", onWheel);
        container.removeEventListener("touchstart", onTouchStart);
        container.removeEventListener("touchend", onTouchEnd);
        window.removeEventListener("keydown", onKey);
        window.removeEventListener("resize", onResize);
      };
    };

    init();
    return () => {
      alive = false;
      stRef.current._cleanup?.();
    };
  }, []);

  const sec = SECTIONS[section];

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background: sec.bg,
        transition: "background 1s cubic-bezier(0.4,0,0.2,1)",
        fontFamily: "'Courier New', monospace",
      }}
    >
      {/* Background radial glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse 70% 70% at 50% 50%, ${sec.bgGlow}22 0%, transparent 68%)`,
        transition: "background 1s ease",
        pointerEvents: "none", zIndex: 0,
      }}/>

      {/* Corner vignette */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 55%, rgba(0,0,0,0.65) 100%)",
        pointerEvents: "none", zIndex: 0,
      }}/>

      {/* Grid */}
      <svg style={{ position:"absolute",inset:0,width:"100%",height:"100%",opacity:0.04,pointerEvents:"none",zIndex:0 }}>
        <defs>
          <pattern id="scrollcube-grid" width="54" height="54" patternUnits="userSpaceOnUse">
            <path d="M54 0H0V54" fill="none" stroke="#fff" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#scrollcube-grid)"/>
      </svg>

      {/* Three.js canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(50vw, 50vh)", height: "min(50vw, 50vh)",
          zIndex: 3, pointerEvents: "none",
        }}
      />

      {/* LEFT — Main Text */}
      <div style={{
        position: "absolute",
        left: "clamp(28px, 6.5vw, 80px)",
        top: "50%",
        transform: `translateY(-50%) translateX(${textReady ? "0px" : "-20px"})`,
        opacity: textReady ? 1 : 0,
        transition: "opacity 0.5s ease, transform 0.5s ease",
        zIndex: 10, maxWidth: 270,
      }}>
        <div style={{
          fontSize: 9, letterSpacing: "0.38em", color: sec.accent,
          marginBottom: 18, textTransform: "uppercase", fontWeight: 700,
          transition: "color 0.7s ease",
        }}>
          {sec.label}
        </div>
        <h2 style={{
          fontSize: "clamp(2.2rem, 4.8vw, 3.6rem)", fontWeight: 800,
          color: "#ffffff", margin: "0 0 10px", lineHeight: 1.0,
          letterSpacing: "-0.03em", fontFamily: "Georgia, serif",
        }}>
          {sec.title}
        </h2>
        <div style={{
          fontSize: 12, fontWeight: 600, color: sec.accent,
          letterSpacing: "0.06em", marginBottom: 16, textTransform: "uppercase",
          transition: "color 0.7s ease",
        }}>
          {sec.subtitle}
        </div>
        <p style={{
          fontSize: 13, color: "rgba(255,255,255,0.38)",
          lineHeight: 1.8, margin: 0, letterSpacing: "0.01em",
        }}>
          {sec.desc}
        </p>
        <div style={{
          width: 32, height: 2, borderRadius: 2,
          background: sec.accent, marginTop: 24,
          boxShadow: `0 0 16px ${sec.accent}`,
          transition: "background 0.7s ease, box-shadow 0.7s ease",
        }}/>
      </div>

      {/* RIGHT — Stats */}
      <div style={{
        position: "absolute",
        right: "clamp(28px, 6.5vw, 80px)",
        top: "50%",
        transform: `translateY(-50%) translateX(${textReady ? "0px" : "20px"})`,
        opacity: textReady ? 1 : 0,
        transition: "opacity 0.5s ease 0.08s, transform 0.5s ease 0.08s",
        zIndex: 10, display: "flex", flexDirection: "column", gap: 28,
      }}>
        {[
          { key: "Viewing",    val: ["Front", "Right Side", "Back"][section] },
          { key: "Y Rotation", val: ["0°", "90°", "180°"][section] },
          { key: "Step",       val: `${section + 1} / ${SECTIONS.length}` },
        ].map(({ key, val }) => (
          <div key={key} style={{ textAlign: "right" }}>
            <div style={{
              fontSize: 9, letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.22)", textTransform: "uppercase", marginBottom: 5,
            }}>
              {key}
            </div>
            <div style={{
              fontSize: 16, fontWeight: 700, color: sec.accent,
              letterSpacing: "0.05em", transition: "color 0.7s ease",
            }}>
              {val}
            </div>
          </div>
        ))}
      </div>

      {/* TOP BAR */}
      <div style={{
        position: "absolute", top: 26, left: 0, right: 0,
        padding: "0 clamp(28px,6.5vw,80px)",
        display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 10,
      }}>
        <div style={{
          fontSize: 11, letterSpacing: "0.22em",
          color: "rgba(255,255,255,0.32)", textTransform: "uppercase", fontWeight: 700,
        }}>
          Cube<span style={{ color: sec.accent, transition: "color 0.7s" }}>.</span>Scroll
        </div>
        <div style={{
          fontSize: 9, letterSpacing: "0.2em",
          color: "rgba(255,255,255,0.15)", textTransform: "uppercase",
        }}>
          scroll / arrow keys
        </div>
      </div>

      {/* PROGRESS DOTS */}
      <div style={{
        position: "absolute", bottom: 36, left: "50%",
        transform: "translateX(-50%)",
        display: "flex", gap: 10, zIndex: 10, alignItems: "center",
      }}>
        {SECTIONS.map((s, i) => (
          <button
            key={i}
            onClick={() => stRef.current.goToSection?.(i)}
            title={s.title}
            style={{
              width: i === section ? 30 : 8, height: 8, borderRadius: 4,
              border: "none",
              background: i === section ? sec.accent : "rgba(255,255,255,0.15)",
              boxShadow: i === section ? `0 0 12px ${sec.accent}99` : "none",
              cursor: "pointer", padding: 0,
              transition: "all 0.42s cubic-bezier(0.4,0,0.2,1)",
            }}
          />
        ))}
      </div>

      {/* SCROLL HINT — only on first face */}
      {section === 0 && (
        <div style={{
          position: "absolute", bottom: 74, left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10, display: "flex", flexDirection: "column",
          alignItems: "center", gap: 7,
        }}>
          <div style={{
            fontSize: 9, letterSpacing: "0.32em",
            color: "rgba(255,255,255,0.25)", textTransform: "uppercase",
          }}>
            Scroll Down
          </div>
          <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
            <rect x="1" y="1" width="12" height="20" rx="6" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2"/>
            <circle cx="7" cy="6" r="2" fill="rgba(255,255,255,0.35)">
              <animate attributeName="cy" values="6;14;6" dur="2s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.8;0.15;0.8" dur="2s" repeatCount="indefinite"/>
            </circle>
          </svg>
        </div>
      )}

      {/* EXIT HINT — on last face, nudge user to keep scrolling */}
      {section === SECTIONS.length - 1 && (
        <div style={{
          position: "absolute", bottom: 74, left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10, display: "flex", flexDirection: "column",
          alignItems: "center", gap: 7,
          animation: "scHintFade 2s ease-in-out infinite",
        }}>
          <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
            <rect x="1" y="1" width="12" height="20" rx="6" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2"/>
            <circle cx="7" cy="6" r="2" fill={sec.accent}>
              <animate attributeName="cy" values="6;14;6" dur="2s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.8;0.15;0.8" dur="2s" repeatCount="indefinite"/>
            </circle>
          </svg>
          <div style={{
            fontSize: 9, letterSpacing: "0.32em",
            color: "rgba(255,255,255,0.25)", textTransform: "uppercase",
          }}>
            Continue scrolling
          </div>
        </div>
      )}

      <style>{`
        @keyframes scHintFade {
          0%,100% { opacity: 0.6; transform: translateX(-50%) translateY(0); }
          50%      { opacity: 0.25; transform: translateX(-50%) translateY(5px); }
        }
      `}</style>
    </div>
  );
}

function ThreeBackground() {
  const { useEffect, useRef } = window.React;
  const canvasRef = useRef(null);
  const isMobile = 'ontouchstart' in window || window.innerWidth < 768;

  useEffect(() => {
    if (isMobile) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const SLICES = 20;
    const SPEED  = 0.008;

    const profile = [
      [ -0.90,  0.01 ],
      [ -0.82,  0.18 ],
      [ -0.68,  0.45 ],
      [ -0.52,  0.65 ],
      [ -0.40,  0.72 ],
      [ -0.33,  0.74 ],
      [ -0.28,  0.74 ],
      [ -0.24,  0.60 ],
      [ -0.20,  0.55 ],
      [ -0.17,  0.78 ],
      [ -0.13,  0.76 ],
      [ -0.10,  0.70 ],
      [ -0.07,  0.72 ],
      [ -0.04,  0.63 ],
      [  0.04,  0.63 ],
      [  0.10,  0.55 ],
      [  0.14,  0.60 ],
      [  0.18,  0.74 ],
      [  0.22,  0.74 ],
      [  0.27,  0.70 ],
      [  0.34,  0.55 ],
      [  0.40,  0.32 ],
      [  0.44,  0.10 ],
      [  0.46,  0.01 ],
    ];

    const seeds = [0.3, 1.1, 2.0, 3.5, 4.8, 5.5];

    function resize() {
      canvas.width  = canvas.offsetWidth  || window.innerWidth;
      canvas.height = canvas.offsetHeight || window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    let angle = 0;
    let raf;

    function project(x, y, z, cx, cy, sc, tilt) {
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const rx   = x * cosA - z * sinA;
      let   rz   = x * sinA + z * cosA;
      let   ry   = y;

      if (tilt !== 0) {
        const cosT = Math.cos(tilt);
        const sinT = Math.sin(tilt);
        const ry2  = ry * cosT - rz * sinT;
        const rz2  = ry * sinT + rz * cosT;
        ry = ry2;
        rz = rz2;
      }

      const p = 4 / (4 + rz);
      return { x: cx + rx * sc * p, y: cy + ry * sc * p, z: rz, p };
    }

    function draw(timestamp) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const bobY         = Math.sin(timestamp * 0.001) * 18;
      const breathe      = 1 + Math.sin(timestamp * 0.0008) * 0.04;
      const tilt         = Math.sin(timestamp * 0.0006) * 0.08;
      const opacityPulse = 0.35 + Math.sin(timestamp * 0.0012) * 0.15;

      const cx = canvas.width  * 0.5;
      const cy = canvas.height * 0.5 + bobY;
      const sc = Math.min(canvas.width, canvas.height) * 0.38 * breathe;

      ctx.shadowColor = 'rgba(180, 40, 30, 0.3)';
      ctx.shadowBlur  = 18;

      // Meridianos
      for (let s = 0; s < SLICES; s++) {
        const a = (s / SLICES) * Math.PI * 2;
        ctx.beginPath();
        profile.forEach(([y, r], i) => {
          const p = project(Math.cos(a) * r, y, Math.sin(a) * r, cx, cy, sc, tilt);
          i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        });
        ctx.strokeStyle = `rgba(180, 40, 30, ${opacityPulse + 0.1})`;
        ctx.lineWidth   = 1.0;
        ctx.stroke();
      }

      // Paralelos
      profile.forEach(([y, r]) => {
        if (r < 0.02) return;
        ctx.beginPath();
        for (let s = 0; s <= SLICES; s++) {
          const a = (s / SLICES) * Math.PI * 2;
          const p = project(Math.cos(a) * r, y, Math.sin(a) * r, cx, cy, sc, tilt);
          s === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = `rgba(180, 40, 30, ${opacityPulse})`;
        ctx.lineWidth   = 0.9;
        ctx.stroke();
      });

      // Sementes orbitando
      ctx.shadowBlur = 8;
      seeds.forEach((baseAngle, i) => {
        const orbitAngle = baseAngle + angle * 0.4;
        const orbitR     = 0.82 + Math.sin(timestamp * 0.001 + i) * 0.04;
        const orbitY     = Math.sin(orbitAngle * 0.7) * 0.15;
        const p = project(
          Math.cos(orbitAngle) * orbitR,
          orbitY,
          Math.sin(orbitAngle) * orbitR,
          cx, cy, sc, tilt
        );
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, 5 * p.p, 2.5 * p.p, orbitAngle, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(180, 40, 30, ${0.5 * opacityPulse})`;
        ctx.lineWidth   = 1.0;
        ctx.stroke();
      });

      ctx.shadowBlur = 0;
      angle += SPEED;
      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position:      'absolute',
        top:           0,
        left:          0,
        width:         '100%',
        height:        '90vh',
        pointerEvents: 'none',
        zIndex:        0,
        opacity:       0.75,
      }}
    />
  );
}
Object.assign(window, { ThreeBackground });

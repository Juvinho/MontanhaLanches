function Hero() {
  const { useEffect, useRef } = window.React;
  const ThreeBackground = window.ThreeBackground;
  const gsap = window.gsap;

  const titleRef = useRef(null);
  const badgeRef = useRef(null);


  const schedule = [
    [[0, 120], [720, 1439]],
    [[1020, 1439]],
    [[1020, 1439]],
    [[1020, 1439]],
    [[1020, 1439]],
    [[0, 120], [1020, 1439]],
    [[0, 120], [720, 1439]],
  ];

  function fmtTime(min) {
    const h = Math.floor(min / 60);
    const m = min % 60;
    return m === 0 ? `${h}h` : `${h}h${String(m).padStart(2, '0')}`;
  }

  function getStatus() {
    const now   = new Date();
    const day   = now.getDay();
    const cur   = now.getHours() * 60 + now.getMinutes();
    const slots = schedule[day];
    const active = slots.find(([o, c]) => cur >= o && cur <= c);
    if (active) return { open: true, label: `Aberto · fecha às ${fmtTime(active[1])}` };
    const nextToday = slots.find(([o]) => cur < o);
    if (nextToday) return { open: false, label: `Abre hoje às ${fmtTime(nextToday[0])}` };
    const nextSlot = schedule[(day + 1) % 7][0];
    if (nextSlot[0] === 0) return { open: false, label: 'Abre amanhã à meia-noite' };
    return { open: false, label: `Abre amanhã às ${fmtTime(nextSlot[0])}` };
  }

  const status = getStatus();

  useEffect(() => {
    if (!titleRef.current || !badgeRef.current) return;
    gsap.fromTo(badgeRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power4.out" }
    );
    gsap.fromTo(titleRef.current.children,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power4.out", delay: 0.2 }
    );
  }, []);

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex flex-col justify-end p-6 md:p-12 border-b-4 border-brand-fg">
      <ThreeBackground />

      {/* Badge horário */}
      <div className="absolute top-6 left-6 md:top-12 md:left-12 z-10" ref={badgeRef}>
        <div
          className="inline-flex items-center gap-2 border-2 px-4 py-2 text-sm md:text-base font-body uppercase tracking-widest shadow-[4px_4px_0_0_var(--brand-fg)]"
          style={{
            borderColor:     status.open ? '#F5F5F5' : '#737373',
            backgroundColor: status.open ? '#1A1A1A' : '#0F0F0F',
            color:           status.open ? '#F5F5F5' : '#737373',
          }}
        >
          <span style={{
            display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
            background: status.open ? '#2ecc71' : '#C0392B',
            boxShadow:  status.open ? '0 0 6px #2ecc71' : 'none',
          }} />
          {status.label}
        </div>
      </div>

      <div className="relative max-w-7xl w-full mx-auto flex flex-col items-start gap-8 z-10">
        <h1
          ref={titleRef}
          className="text-6xl sm:text-6xl md:text-[9vw] leading-[0.85] font-display uppercase text-brand-fg tracking-[-0.03em] max-w-[12ch] flex flex-col"
        >
          <span className="block overflow-hidden"><span className="block">O sabor</span></span>
          <span className="block overflow-hidden"><span className="block">de <span className="text-brand-primary">verdade.</span></span></span>
        </h1>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto mt-4">
          <a
            href="https://pedido.anota.ai/loja/montanhalanchess"
            target="_blank"
            className="group flex items-center justify-between gap-4 border-4 border-brand-fg bg-brand-primary text-brand-fg px-8 py-5 font-display text-3xl uppercase hover:bg-brand-fg hover:text-brand-bg transition-colors w-full sm:w-auto"
          >
            <span>Pedir Agora</span>
            <i data-lucide="arrow-up-right" className="w-8 h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
          </a>
          <a
            href="#cardapio"
            className="flex items-center justify-center border-4 border-brand-fg bg-transparent text-brand-fg px-8 py-5 font-display text-3xl uppercase hover:bg-brand-fg hover:text-brand-bg transition-colors w-full sm:w-auto"
          >
            Ver Cardápio
          </a>
        </div>
      </div>
    </section>
  );
}
Object.assign(window, { Hero });

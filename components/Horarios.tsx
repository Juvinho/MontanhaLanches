function Horarios() {
  const { useEffect, useRef } = window.React;
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(sectionRef.current.querySelectorAll('.reveal'),
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, stagger: 0.06, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
    );
  }, []);

  const hours = [
    { day: 'Domingo',       times: ['00h – 02h', '12h – 23h59'] },
    { day: 'Segunda-feira', times: ['17h – 23h59'] },
    { day: 'Terça-feira',   times: ['17h – 23h59'] },
    { day: 'Quarta-feira',  times: ['17h – 23h59'] },
    { day: 'Quinta-feira',  times: ['17h – 23h59'] },
    { day: 'Sexta-feira',   times: ['00h – 02h', '17h – 23h59'] },
    { day: 'Sábado',        times: ['00h – 02h', '12h – 23h59'] },
  ];

  const payments = [
    { label: 'Pix',                  sub: 'Online',      icon: 'qr-code' },
    { label: 'Google Pay',           sub: 'Online',      icon: 'smartphone' },
    { label: 'Nubank',               sub: 'Online',      icon: 'credit-card' },
    { label: 'Cartão de Crédito',    sub: 'Online e na entrega', icon: 'credit-card' },
    { label: 'Dinheiro',             sub: 'Na entrega',  icon: 'banknote' },
    { label: 'Elo · Visa · Master · Hiper · PIX QR', sub: 'Bandeiras aceitas', icon: 'layers' },
  ];

  return (
    <section ref={sectionRef} id="horarios" className="border-b-4 border-brand-fg bg-brand-surface">

      {/* Header */}
      <div className="p-6 md:p-12 lg:p-24 border-b-4 border-brand-fg">
        <span className="reveal font-body text-brand-muted uppercase tracking-widest text-sm">Informações</span>
        <h2 className="reveal text-6xl md:text-[7vw] font-display uppercase tracking-[-0.03em] leading-none mt-4">
          Horários &amp;<br /><span className="text-brand-primary">Pagamento.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 border-b-4 border-brand-fg divide-y-4 lg:divide-y-0 lg:divide-x-4 divide-brand-fg">

        {/* Hours */}
        <div className="p-6 md:p-12 lg:p-24 flex flex-col gap-0">
          <h3 className="reveal font-display text-3xl uppercase mb-6 flex items-center gap-3">
            <i data-lucide="clock" className="w-7 h-7 text-brand-primary"></i>
            Horário de Atendimento
          </h3>
          {hours.map((h, i) => (
            <div key={i} className="reveal flex justify-between items-center py-4 border-b-2 border-brand-fg/20 last:border-0">
              <span className="font-body text-lg font-medium">{h.day}</span>
              <div className="flex flex-col items-end gap-1">
                {h.times.map((t, j) => (
                  <span key={j} className="font-display text-xl text-brand-primary">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Payment */}
        <div className="p-6 md:p-12 lg:p-24 flex flex-col gap-0">
          <h3 className="reveal font-display text-3xl uppercase mb-6 flex items-center gap-3">
            <i data-lucide="wallet" className="w-7 h-7 text-brand-primary"></i>
            Formas de Pagamento
          </h3>
          {payments.map((p, i) => (
            <div key={i} className="reveal flex items-center gap-4 py-4 border-b-2 border-brand-fg/20 last:border-0">
              <div className="w-10 h-10 border-2 border-brand-fg flex items-center justify-center flex-shrink-0">
                <i data-lucide={p.icon} className="w-5 h-5"></i>
              </div>
              <div className="flex flex-col">
                <span className="font-body text-base md:text-lg font-medium">{p.label}</span>
                <span className="font-body text-sm text-brand-muted">{p.sub}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
Object.assign(window, { Horarios });

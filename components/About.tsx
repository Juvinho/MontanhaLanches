function About() {
  const { useEffect, useRef, useState } = window.React;
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  const sectionRef  = useRef(null);
  const isHovered   = useRef(false);

  const images = [
    'assets/unnamed.webp',
    'assets/unnamed (1).webp',
    'assets/unnamed (2).webp',
    'assets/unnamed (3).webp',
  ];
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHovered.current) setImgIdx(i => (i + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(sectionRef.current.querySelectorAll('.reveal'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );

    // Counter animation
    sectionRef.current.querySelectorAll('.stat-counter').forEach((el) => {
      const from   = parseFloat(el.dataset.from);
      const to     = parseFloat(el.dataset.to);
      const suffix = el.dataset.suffix || '';
      const obj    = { val: from };
      gsap.to(obj, {
        val: to,
        duration: 2,
        ease: 'power2.out',
        onUpdate() { el.textContent = Math.round(obj.val) + suffix; },
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      });
    });
  }, []);

  return (
    <section ref={sectionRef} id="sobre" className="border-b-4 border-brand-fg bg-brand-bg">

      {/* Header */}
      <div className="p-6 md:p-12 lg:p-24 border-b-4 border-brand-fg flex flex-col gap-4">
        <span className="reveal font-body text-brand-muted uppercase tracking-widest text-sm">Nossa História</span>
        <h2 className="reveal text-6xl md:text-[7vw] font-display uppercase tracking-[-0.03em] leading-none">
          Do bairro<br /><span className="text-brand-primary">pra cidade.</span>
        </h2>
      </div>

      {/* Story + Photo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 border-b-4 border-brand-fg">

        {/* Story text */}
        <div className="p-6 md:p-12 lg:p-24 border-b-4 lg:border-b-0 lg:border-r-4 border-brand-fg flex flex-col gap-8 justify-center">
          <p className="reveal font-body text-xl md:text-2xl leading-relaxed">
            Tudo começou em 1997, num ponto pequeno no Centro de Franca. A ideia era simples: servir lanches de verdade, sem economizar no recheio e sem frescura no atendimento.
          </p>

          <blockquote className="reveal border-l-4 border-brand-primary pl-6 py-2">
            <p className="font-display text-3xl md:text-4xl uppercase leading-tight text-brand-accent">
              "Um hambúrguer que valha a fome."
            </p>
          </blockquote>

          <p className="reveal font-body text-xl md:text-2xl leading-relaxed">
            A fila não demorou a crescer. O Montanha virou ponto de encontro — da galera, das famílias, de quem sai do trabalho e de quem só quer uma boa noite com um lanche na mão.
          </p>

          <p className="reveal font-body text-xl md:text-2xl leading-relaxed">
            Hoje são duas unidades em Franca, mais de 50 itens no cardápio e uma certeza: aqui, cada lanche é feito com cuidado, do pão à montagem.
          </p>

          {/* Stats */}
          <div className="reveal grid grid-cols-3 gap-6 border-t-4 border-brand-fg pt-8 mt-2">
            <div className="flex flex-col gap-1">
              <span className="stat-counter font-display text-5xl md:text-6xl text-brand-primary leading-none" data-from="1980" data-to="1997" data-suffix="">1997</span>
              <span className="font-body text-xs uppercase tracking-widest text-brand-muted">Fundação</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="stat-counter font-display text-5xl md:text-6xl text-brand-primary leading-none" data-from="0" data-to="2" data-suffix="">2</span>
              <span className="font-body text-xs uppercase tracking-widest text-brand-muted">Unidades</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="stat-counter font-display text-5xl md:text-6xl text-brand-primary leading-none" data-from="0" data-to="50" data-suffix="+">50+</span>
              <span className="font-body text-xs uppercase tracking-widest text-brand-muted">Itens no cardápio</span>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div
          className="relative min-h-[420px] lg:min-h-full bg-black overflow-hidden"
          onMouseEnter={() => { isHovered.current = true; }}
          onMouseLeave={() => { isHovered.current = false; }}
        >
          {/* key no wrapper força remount completo → animação reinicia */}
          <div key={imgIdx} className="absolute inset-0">
            <img
              src={images[imgIdx]}
              alt={`Interior da Lanchonete ${imgIdx + 1}`}
              className="carousel-img"
            />
          </div>

          {/* Seta esquerda */}
          <button
            onClick={() => setImgIdx(i => (i - 1 + images.length) % images.length)}
            style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', zIndex:20,
              border:'2px solid #F5F5F5', background:'rgba(15,15,15,0.75)',
              width:48, height:48, padding:12, display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:26, color:'#F5F5F5', cursor:'pointer' }}
          >&#8249;</button>

          {/* Seta direita */}
          <button
            onClick={() => setImgIdx(i => (i + 1) % images.length)}
            style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', zIndex:20,
              border:'2px solid #F5F5F5', background:'rgba(15,15,15,0.75)',
              width:48, height:48, padding:12, display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:26, color:'#F5F5F5', cursor:'pointer' }}
          >&#8250;</button>

          {/* Dots */}
          <div style={{ position:'absolute', bottom:56, left:0, right:0, display:'flex', justifyContent:'center', gap:8, zIndex:20 }}>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setImgIdx(i)}
                style={{ width:12, height:12, border:'2px solid #F5F5F5', cursor:'pointer',
                  background: i === imgIdx ? '#C0392B' : 'transparent' }}
              />
            ))}
          </div>

          {/* Caption */}
          <div style={{ position:'absolute', bottom:0, left:0, right:0, zIndex:20,
            padding:'16px 24px', background:'#0F0F0F', borderTop:'4px solid #F5F5F5' }}>
            <span style={{ fontFamily:'DM Sans, sans-serif', fontSize:12, textTransform:'uppercase',
              letterSpacing:'0.15em', color:'#737373' }}>Franca, SP — Desde 1997</span>
          </div>
        </div>

      </div>

      {/* Values strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 divide-y-4 sm:divide-y-0 sm:divide-x-4 divide-brand-fg">
        {[
          { icon: 'flame',    title: 'Feito na hora',   desc: 'Cada pedido sai fresquinho, sem pré-pronto nem atalho.' },
          { icon: 'users',    title: 'Para todo mundo',  desc: 'Área kids, espaço amplo, atendimento sem estresse.' },
          { icon: 'map-pin',  title: '2 endereços',      desc: 'Jardim Aeroporto e Vila São Sebastião. Sempre perto de você em Franca.' },
        ].map((v, i) => (
          <div key={i} className="reveal flex flex-col gap-4 p-6 md:p-10 bg-brand-surface hover:bg-brand-primary hover:text-brand-fg transition-colors group">
            <i data-lucide={v.icon} className="w-10 h-10 group-hover:scale-110 transition-transform"></i>
            <h3 className="font-display text-2xl uppercase">{v.title}</h3>
            <p className="font-body text-base text-brand-muted group-hover:text-brand-fg transition-colors leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>

    </section>
  );
}
Object.assign(window, { About });

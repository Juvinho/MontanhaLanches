function Menu() {
  const { useEffect, useRef, useState } = window.React;
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  const sectionRef = useRef(null);

  const stores = [
    { label: 'Jd. Aeroporto',    url: 'https://pedido.anota.ai/loja/montanhalanchess' },
    { label: 'Vila São Sebastião', url: 'https://pedido.anota.ai/loja/montanha-lanches-vila-sao-sebastiao-1' },
  ];
  const [storeIdx, setStoreIdx] = useState(0);

  const categories = [
    { name: 'Lanches',  icon: 'sandwich',  col: 'col-span-1 md:col-span-2', href: 'https://pedido.anota.ai/category/6a0a45905dfdb688a5f5e858' },
    { name: 'Barcas',   icon: 'package',   col: 'col-span-1',               href: 'https://pedido.anota.ai/category/6a0a45905dfdb688a5f5e828' },
    { name: 'Hot Dog',  icon: 'beef',      col: 'col-span-1',               href: 'https://pedido.anota.ai/category/6a0a45905dfdb688a5f5e86f' },
    { name: 'Comidas',  icon: 'chef-hat',  col: 'col-span-1',               href: 'https://pedido.anota.ai/category/6a0a45905dfdb688a5f5e7f1' },
    { name: 'Porções',  icon: 'utensils',  col: 'col-span-1',               href: 'https://pedido.anota.ai/category/6a0a45905dfdb688a5f5e873' },
    { name: 'Combos',   icon: 'flame',     col: 'col-span-1 md:col-span-2', href: 'https://pedido.anota.ai/category/6a0a45905dfdb688a5f5e809' },
    { name: 'Omeletes', icon: 'egg',       col: 'col-span-1 md:col-span-2', href: 'https://pedido.anota.ai/category/6a0a45905dfdb688a5f5e87b' },
    { name: 'Bebidas',  icon: 'cup-soda',  col: 'col-span-1 md:col-span-2', href: 'https://pedido.anota.ai/category/6a0a45905dfdb688a5f5e881' },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    // Stagger entrance
    const cards = sectionRef.current.querySelectorAll('.menu-card');
    gsap.fromTo(cards,
      { opacity: 0, y: 40, scale: 0.96 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.6,
        stagger: 0.07,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      }
    );

    // 3D tilt on hover
    const cleanups = [];
    cards.forEach((card) => {
      if ('ontouchstart' in window) return;
      const onMove = (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left)  / r.width  - 0.5;
        const y = (e.clientY - r.top)   / r.height - 0.5;
        gsap.to(card, {
          rotateY: x * 10,
          rotateX: y * -10,
          transformPerspective: 700,
          duration: 0.3,
          ease: 'power2.out',
        });
      };
      const onLeave = () => {
        gsap.to(card, {
          rotateX: 0, rotateY: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.4)',
        });
      };
      card.addEventListener('mousemove',  onMove);
      card.addEventListener('mouseleave', onLeave);
      cleanups.push(() => {
        card.removeEventListener('mousemove',  onMove);
        card.removeEventListener('mouseleave', onLeave);
      });
    });

    return () => cleanups.forEach(fn => fn());
  }, []);

  return (
    <section id="cardapio" ref={sectionRef} className="border-b-4 border-brand-fg bg-brand-bg">
      <div className="p-6 md:p-12 lg:p-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b-4 border-brand-fg">
        <div className="flex flex-col sm:flex-row sm:items-end gap-6">
          <h2 className="text-6xl md:text-[8vw] font-display uppercase tracking-[-0.03em] leading-none">
            Cardápio
          </h2>
          {/* Switcher de unidade */}
          <div className="flex border-2 border-brand-fg overflow-hidden mb-1">
            {stores.map((s, i) => (
              <button
                key={i}
                onClick={() => setStoreIdx(i)}
                className="px-4 py-2 font-body text-sm uppercase tracking-widest transition-colors"
                style={{
                  background:  i === storeIdx ? '#F5F5F5' : 'transparent',
                  color:       i === storeIdx ? '#0F0F0F'  : '#F5F5F5',
                  borderRight: i === 0 ? '2px solid #F5F5F5' : 'none',
                  cursor: 'pointer',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
        <a
          href={stores[storeIdx].url}
          target="_blank"
          className="group flex items-center gap-4 font-display text-3xl uppercase hover:text-brand-primary transition-colors border-b-4 border-transparent hover:border-brand-primary pb-2"
        >
          Menu Completo <i data-lucide="arrow-up-right" className="w-8 h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] sm:auto-rows-[250px]">
        {categories.map((cat, i) => (
          <a
            key={i}
            href={storeIdx === 0 ? cat.href : stores[1].url}
            target="_blank"
            className={`menu-card group relative flex flex-col justify-between p-6 border-r-4 border-b-4 border-brand-fg bg-brand-surface hover:bg-brand-primary hover:text-brand-fg transition-colors ${cat.col}`}
          >
            <i data-lucide={cat.icon} className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform"></i>
            <h3 className="font-display text-4xl md:text-5xl uppercase leading-none">{cat.name}</h3>
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <i data-lucide="arrow-up-right" className="w-8 h-8"></i>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
Object.assign(window, { Menu });

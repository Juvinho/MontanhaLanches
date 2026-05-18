const { useEffect, useRef, useState } = window.React;
const gsap = window.gsap;
const { Hero, About, Menu, Horarios, Mapa } = window;

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerRef = useRef(null);
  const linksRef  = useRef(null);

  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  });

  useEffect(() => {
    if (!drawerRef.current) return;
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(drawerRef.current,
        { xPercent: 100, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }
      );
      if (linksRef.current) {
        gsap.fromTo(Array.from(linksRef.current.children),
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out', delay: 0.15 }
        );
      }
    } else {
      document.body.style.overflow = '';
      gsap.to(drawerRef.current,
        { xPercent: 100, opacity: 0, duration: 0.3, ease: 'power3.in' }
      );
    }
  }, [menuOpen]);

  const navLinks = [
    { href: '#sobre',    label: 'Sobre' },
    { href: '#cardapio', label: 'Cardápio' },
    { href: '#horarios', label: 'Horários' },
    { href: '#unidades', label: 'Unidades' },
  ];

  const close = () => setMenuOpen(false);

  return (
    <div className="min-h-screen font-body text-brand-fg selection:bg-brand-primary selection:text-brand-fg">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-2 border-b-4 border-brand-fg bg-brand-bg z-50">
        <a href="#">
          <img src="assets/logo.png" alt="Montanha Lanches" className="h-24 w-auto object-contain" />
        </a>
        <div className="hidden md:flex gap-8 font-display text-2xl uppercase">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} className="hover:text-brand-primary transition-colors">{l.label}</a>
          ))}
        </div>
        <button
          className="md:hidden flex items-center justify-center w-12 h-12 border-2 border-brand-fg"
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menu"
        >
          <i data-lucide="menu" className="w-6 h-6"></i>
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div
        ref={drawerRef}
        className="fixed inset-0 bg-brand-bg z-[100] flex flex-col p-8 md:hidden"
        style={{ transform: 'translateX(100%)' }}
      >
        <div className="flex justify-between items-center mb-12">
          <img src="assets/logo.png" alt="Montanha Lanches" className="h-16 w-auto object-contain" />
          <button
            onClick={close}
            className="flex items-center justify-center w-12 h-12 border-2 border-brand-fg"
            aria-label="Fechar menu"
          >
            <i data-lucide="x" className="w-6 h-6"></i>
          </button>
        </div>
        <nav ref={linksRef} className="flex flex-col">
          {navLinks.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={close}
              className="font-display text-5xl uppercase hover:text-brand-primary transition-colors border-b-4 border-brand-fg/20 py-6 block"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>

      <main className="pt-[88px] relative z-10">
        <Hero />
        <About />
        <Menu />
        <Horarios />
        <Mapa />

        {/* Footer */}
        <footer id="unidades" className="p-6 md:p-12 lg:p-24 flex flex-col md:flex-row justify-between items-start gap-12 bg-brand-surface border-t-4 border-brand-fg">
          <div className="flex flex-col gap-6">
            <img src="assets/logo.png" alt="Montanha Lanches" className="h-36 w-auto max-w-[280px] object-contain self-start" />
            <div className="font-body text-lg uppercase tracking-widest text-brand-muted">
              <p>&copy; 2025 Franca, SP</p>
              <p>Sabor de verdade.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            <div className="flex flex-col gap-4">
              <h3 className="font-display text-3xl uppercase border-b-4 border-brand-fg pb-2">Unidade 1</h3>
              <p className="font-body text-lg leading-relaxed">Av. Carlos Roberto Hadade, 1375<br/>Jardim Aeroporto I<br/>Franca - SP, 14404-047</p>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="font-display text-3xl uppercase border-b-4 border-brand-fg pb-2">Unidade 2</h3>
              <p className="font-body text-lg leading-relaxed">Rua Francisco Marques, 2010<br/>Vila São Sebastião<br/>Franca - SP, 14406-652</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
Object.assign(window, { App });

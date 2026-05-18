function BrandIcon({ name }) {
  if (name === 'instagram') return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
  if (name === 'facebook') return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
  if (name === 'ifood') return (
    <img src="assets/ifood.png" alt="iFood" style={{ width: 18, height: 18, objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
  );
  return <i data-lucide={name} style={{ width:18, height:18 }}></i>;
}

function Mapa() {
  const lojas = [
    {
      nome:     'Unidade 1 — Jardim Aeroporto',
      endereco: 'Av. Carlos Roberto Hadade, 1375',
      bairro:   'Jardim Aeroporto I · Franca, SP · 14404-047',
      src: 'https://maps.google.com/maps?q=Av.+Carlos+Roberto+Hadade,+1375,+Franca,+SP,+Brazil&output=embed&hl=pt-BR&z=16',
      socials: [
        { icon: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/montanha_lanches/' },
        { icon: 'facebook',  label: 'Facebook',  href: 'https://www.facebook.com/Bolotadoserjao/' },
        { icon: 'ifood',     label: 'iFood',     href: 'https://www.ifood.com.br/delivery/franca-sp/montanha-lanches-prolongamento-jardim-aeroporto-i/45354399-7479-4db3-8761-2219096d7eef' },
      ],
    },
    {
      nome:     'Unidade 2 — Vila São Sebastião',
      endereco: 'Rua Francisco Marques, 2010',
      bairro:   'Vila São Sebastião · Franca, SP · 14406-652',
      src: 'https://maps.google.com/maps?q=Rua+Francisco+Marques,+2010,+Franca,+SP,+Brazil&output=embed&hl=pt-BR&z=16',
      socials: [
        { icon: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/montanhalanchesvilatiao/' },
        { icon: 'facebook',  label: 'Facebook',  href: 'https://www.facebook.com/Bolotadoserjao/' },
        { icon: 'ifood',     label: 'iFood',     href: 'https://www.ifood.com.br/delivery/franca-sp/montanha-lanches-prolongamento-jardim-aeroporto-i/45354399-7479-4db3-8761-2219096d7eef' },
      ],
    },
  ];

  return (
    <section id="mapa" className="border-b-4 border-brand-fg bg-brand-bg">

      {/* Header */}
      <div className="p-6 md:p-12 lg:p-24 border-b-4 border-brand-fg">
        <span className="font-body text-brand-muted uppercase tracking-widest text-sm">Localização</span>
        <h2 className="text-6xl md:text-[7vw] font-display uppercase tracking-[-0.03em] leading-none mt-4">
          Onde nos<br /><span className="text-brand-primary">encontrar.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y-4 lg:divide-y-0 lg:divide-x-4 divide-brand-fg">
        {lojas.map((loja, i) => (
          <div key={i} className="flex flex-col border-b-4 lg:border-b-0 border-brand-fg last:border-b-0">

            {/* Info */}
            <div className="p-6 md:p-10 border-b-4 border-brand-fg flex flex-col gap-2">
              <h3 className="font-display text-2xl uppercase">{loja.nome}</h3>
              <p className="font-body text-xl font-medium">{loja.endereco}</p>
              <p className="font-body text-sm text-brand-muted uppercase tracking-wide">{loja.bairro}</p>
              <div className="mt-3 grid grid-cols-2 sm:flex sm:flex-wrap gap-3">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loja.endereco + ', Franca, SP')}`}
                  target="_blank"
                  className="flex items-center gap-2 border-2 border-brand-fg px-4 py-2 font-display text-lg uppercase hover:bg-brand-primary hover:border-brand-primary hover:text-brand-fg transition-colors"
                >
                  <i data-lucide="navigation" className="w-4 h-4"></i>
                  Como chegar
                </a>
                {loja.socials.map((s, j) => (
                  <a
                    key={j}
                    href={s.href}
                    target="_blank"
                    title={s.label}
                    className="flex items-center gap-2 border-2 border-brand-fg px-4 py-2 font-display text-lg uppercase hover:bg-brand-primary hover:border-brand-primary hover:text-brand-fg transition-colors"
                  >
                    <BrandIcon name={s.icon} />
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Map iframe */}
            <div className="w-full" style={{ height: 380 }}>
              <iframe
                src={loja.src}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(0.9) hue-rotate(180deg) saturate(0.8)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
Object.assign(window, { Mapa });

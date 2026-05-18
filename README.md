<img src="https://capsule-render.vercel.app/api?type=waving&color=C0392B&height=160&section=header&text=MONTANHA%20LANCHES&fontColor=F5F5F5&fontSize=48&fontAlignY=55&desc=O%20Sabor%20de%20Verdade.&descAlignY=80&descSize=18&fontAlign=50" width="100%"/>

<div align="center">

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Bebas+Neue&size=28&duration=2800&pause=1200&color=C0392B&center=true&vCenter=true&width=500&lines=Landing+Page+Brutalist;React+%2B+Tailwind+%2B+GSAP;Mobile-First+%F0%9F%93%B1;Animações+Interativas+%E2%9A%A1)](https://git.io/typing-svg)

</div>

---

## ⚡ Stack

<div align="center">

![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP_3-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![JavaScript](https://img.shields.io/badge/Vanilla_JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)

</div>

> **Zero build step.** React 18 + Babel Standalone via CDN. Abre direto no browser.

---

## 🗂 Estrutura

```
Montanha Lanches/
├── index.html                  # Entry point — estilos globais, CDN scripts
├── assets/
│   ├── logo.png                # Logo oficial
│   ├── ifood.png               # Logo iFood
│   └── unnamed*.webp           # Fotos da lanchonete (carrossel)
└── components/
    ├── App.tsx                 # Root — navbar + drawer mobile + footer
    ├── Hero.tsx                # Hero — badge horário dinâmico + CTAs
    ├── About.tsx               # Sobre — história + carrossel Ken Burns + stats
    ├── Menu.tsx                # Cardápio — grid 3D tilt + switcher de unidade
    ├── Horarios.tsx            # Horários + formas de pagamento
    └── Mapa.tsx                # Localização — Google Maps embed + redes sociais
```

---

## 🎨 Design System

| Token | Valor | Uso |
|---|---|---|
| `brand-bg` | `#0F0F0F` | Fundo principal |
| `brand-fg` | `#F5F5F5` | Texto e bordas |
| `brand-primary` | `#C0392B` | Vermelho de destaque |
| `brand-surface` | `#1A1A1A` | Superfícies elevadas |
| `brand-muted` | `#737373` | Texto secundário |
| `font-display` | Bebas Neue | Títulos brutalist |
| `font-body` | DM Sans | Corpo de texto |

---

## 🚀 Funcionalidades

<table>
<tr>
<td>

**🏠 Hero**
- Badge aberto/fechado em tempo real
- Escala de horários por dia da semana
- CTAs full-width em mobile

</td>
<td>

**📖 Sobre**
- Carrossel com efeito Ken Burns
- Auto-advance a cada 5s (pausa no hover)
- Contadores animados com GSAP

</td>
</tr>
<tr>
<td>

**🍔 Cardápio**
- Grid 8 categorias com tilt 3D (mouse)
- Switcher entre 2 unidades
- Links diretos para o anota.ai

</td>
<td>

**🗺 Localização**
- Google Maps embed (dark mode via CSS filter)
- Links Instagram, Facebook, iFood por unidade
- Botão "Como Chegar" com query map

</td>
</tr>
<tr>
<td>

**📱 Mobile**
- Drawer fullscreen com animação GSAP
- Grid adaptativo em todas as seções
- Tilt 3D desativado em touch devices

</td>
<td>

**⏰ Horários**
- Turnos duplos (virada de sábado para domingo)
- Grid de formas de pagamento
- Bandeiras aceitas

</td>
</tr>
</table>

---

## ⚙️ Como rodar

**Opção 1 — Live Server (VS Code)**
```bash
# Instale a extensão Live Server e clique em "Go Live"
# ou clique com botão direito em index.html → Open with Live Server
```

**Opção 2 — Python**
```bash
python -m http.server 3000
# Acesse http://localhost:3000
```

**Opção 3 — Node**
```bash
npx serve .
```

> Não precisa de `npm install`, build ou bundler. Funciona direto.

---

## 🔗 Links das Unidades

| Unidade | Anota.ai | iFood |
|---|---|---|
| Jd. Aeroporto | [montanhalanchess](https://pedido.anota.ai/loja/montanhalanchess) | [iFood](https://www.ifood.com.br/delivery/franca-sp/montanha-lanches-prolongamento-jardim-aeroporto-i/45354399-7479-4db3-8761-2219096d7eef) |
| Vila São Sebastião | [montanha-lanches-vila-sao-sebastiao-1](https://pedido.anota.ai/loja/montanha-lanches-vila-sao-sebastiao-1) | [iFood](https://www.ifood.com.br/delivery/franca-sp/montanha-lanches-prolongamento-jardim-aeroporto-i/45354399-7479-4db3-8761-2219096d7eef) |

---

## 📡 Redes Sociais

<div align="center">

[![Instagram Aeroporto](https://img.shields.io/badge/@montanha__lanches-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/montanha_lanches/)
[![Instagram Vila](https://img.shields.io/badge/@montanhalanchesvilatiao-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/montanhalanchesvilatiao/)
[![Facebook](https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/Bolotadoserjao/)

</div>

---

## 🏗 Arquitetura

```
index.html carrega CDNs na ordem:
  React 18 → ReactDOM → Babel → Tailwind → GSAP → ScrollTrigger → Lucide

Componentes carregam em sequência (window globals):
  ThreeBackground → Hero → About → Menu → Horarios → Mapa → App

ReactDOM.createRoot('#root').render(<App />)
```

Cada componente é um arquivo `.tsx` compilado pelo Babel Standalone em runtime.
Sem TypeScript real — os erros de IDE são falsos positivos (sem tsconfig.json).

---

## 📍 Localização

**Unidade 1 — Jardim Aeroporto**
Av. Carlos Roberto Hadade, 1375 — Franca, SP · 14404-047

**Unidade 2 — Vila São Sebastião**
Rua Francisco Marques, 2010 — Franca, SP · 14406-652

---

<img src="https://capsule-render.vercel.app/api?type=waving&color=C0392B&height=120&section=footer&fontColor=F5F5F5" width="100%"/>

<div align="center">
  <sub>© 2025 Montanha Lanches · Franca, SP · Sabor de verdade.</sub>
    <br>
  <sub>Feito com 💜 por Juvinho</sub>
</div>

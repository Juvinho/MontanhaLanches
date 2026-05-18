# Prompt — Página de Teste: Animação 3D Hambúrguer Wireframe

## Objetivo

Crie um arquivo `burger-animation-test.html` standalone para desenvolver e depurar
a animação 3D de um hambúrguer wireframe girando, usando exclusivamente Canvas 2D nativo.
Esta página é isolada do projeto principal — serve apenas para validar a animação antes
de integrá-la na landing page real.

***

## Contexto

A animação vai para o hero de uma landing page de lanchonete (fundo escuro `#1A1A1A`,
cor da marca `rgba(180, 40, 30, x)`). Ela substitui um icosaedro 3D por um hambúrguer
em wireframe com 7 camadas identificáveis, girando no eixo Y com perspectiva real.

***

## O que criar

### Layout da página

- Fundo `#1A1A1A`, canvas centralizado: `70vw × 80vh` desktop, `100vw × 60vh` mobile
- Painel de debug fixo no canto superior esquerdo (fundo semitransparente, fonte monospace):
  - `FPS: [valor]` — calculado via `performance.now()` entre frames
  - `Ângulo: [graus]°` — `(angle * 180/PI) % 360`, arredondado
  - `Camadas: [n]`
- Barra de controles no rodapé (sem estética, só funcional):
  - Slider **Velocidade** — range `0.001–0.03`, default `0.008`
  - Slider **Escala** — range `0.15–0.45`, default `0.28`
  - Slider **Opacidade** — range `0.1–1.0`, default `0.55`
  - Slider **FOV** — range `2–8`, default `4`
  - Botão **Pausar / Retomar** — não reseta o ângulo ao pausar
  - Botão **Resetar** — volta todos os sliders ao default e ângulo para 0
  - Toggle **Eixos XYZ** — quando ativo, desenha 3 linhas de debug no centro

***

## Implementação da animação

### Função `project(x, y, z, cx, cy, scale, fov, angle)`

```
rx = x * cos(angle) - z * sin(angle)
rz = x * sin(angle) + z * cos(angle)
p  = fov / (fov + rz)

return {
  x: cx + rx * scale * p,
  y: cy + y  * scale * p,
  z: rz,
  p: p
}
```

### Camadas do hambúrguer

```
+-------+-------------+-------+------+----------+-------+--------+
| index | type        |   y   |  r   | segments | wave  | square |
+-------+-------------+-------+------+----------+-------+--------+
|   0   | bun-top     | -1.6  | 0.55 |    24    | false | false  |
|   1   | lettuce     | -0.9  | 0.70 |    18    | true  | false  |
|   2   | cheese      | -0.5  | 0.68 |     4    | false | true   |
|   3   | meat        | -0.1  | 0.65 |    24    | false | false  |
|   4   | onion       |  0.3  | 0.60 |    16    | true  | false  |
|   5   | meat        |  0.7  | 0.65 |    24    | false | false  |
|   6   | bun-bottom  |  1.1  | 0.72 |    24    | false | false  |
+-------+-------------+-------+------+----------+-------+--------+
```

### Função `circlePoints(r, y, segs, wave, square)`

```
para cada i de 0 até segs-1:
  a = (i / segs) * PI * 2
  radius = r

  se wave:
    radius += sin(a * 6) * 0.08

  se square:
    sx = clamp(cos(a) * radius, -(r*0.88), +(r*0.88))
    sz = clamp(sin(a) * radius, -(r*0.88), +(r*0.88))
    push [sx, y, sz]
  senão:
    push [cos(a)*radius, y, sin(a)*radius]
```

### Função `draw()` — o que desenhar por camada

```
para cada camada:
  1. Projetar todos os pontos com project()
  2. Desenhar anel fechado (moveTo primeiro ponto, lineTo demais, closePath)
       cor: rgba(180,40,30, opacidade)   lineWidth: 1.2
  3. Desenhar raios internos: centro → borda, 1 a cada floor(segments/3) vértices
       cor: rgba(180,40,30, 0.18)        lineWidth: 0.8
  4. Conectar com a próxima camada: 1 linha vertical a cada 8 vértices
       cor: rgba(180,40,30, 0.25)        lineWidth: 0.9

se camada.type == "bun-top":
  desenhar 6 meridianos curvos (cúpula):
    para i de 0 a 5:
      a_m = (i/6) * PI * 2
      para j de 0 a 10:
        elev = (j/10) * PI * 0.5
        x = cos(a_m) * r * cos(elev)
        y = layer.y - sin(elev) * 0.55
        z = sin(a_m) * r * cos(elev)
        projetar e conectar com lineTo
      cor: rgba(180,40,30, 0.30)   lineWidth: 1.0

  desenhar 6 sementes (ctx.ellipse):
    ângulos base: [0.3, 1.1, 2.0, 3.5, 4.8, 5.5]
    para cada semente:
      sa = angulo_base + angle * 0.5
      p  = project(cos(sa)*0.3, -1.95, sin(sa)*0.3, ...)
      ctx.ellipse(p.x, p.y, 5*p.p, 2.5*p.p, sa, 0, PI*2)
      cor: rgba(180,40,30, 0.45)   lineWidth: 1.0
```

### Debug de eixos XYZ (quando toggle ativo)

```
+------+--------+------------------------------------------+
| Eixo |  Cor   | Como desenhar                            |
+------+--------+------------------------------------------+
|  X   | #ff4444| project(-1,0,0) → project(1,0,0)        |
|  Y   | #44ff44| (cx, cy-scale*0.8) → (cx, cy+scale*0.8) |
|  Z   | #4444ff| project(0,0,-1) → project(0,0,1)        |
+------+--------+------------------------------------------+
lineWidth: 1.5 para todos
```

### FPS

```js
let lastTime = 0;
let fps = 0;

// No início de cada frame:
function onFrame(timestamp) {
  fps = Math.round(1000 / (timestamp - lastTime));
  lastTime = timestamp;
  // ... resto do draw
  requestAnimationFrame(onFrame);
}
```

### Resize responsivo

```js
function resize() {
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
window.addEventListener('resize', resize);
resize(); // chamar na inicialização
```

***

## Constraints — o que NÃO fazer

```
+---+-------------------------------------------------------------+
| # | Proibido                                                    |
+---+-------------------------------------------------------------+
| 1 | Usar Three.js, PixiJS, Babylon.js ou qualquer lib externa   |
| 2 | Usar ctx.transform() para rotação 3D (fazer via project())  |
| 3 | Hardcodar cx e cy (sempre canvas.width*0.5, height*0.5)     |
| 4 | Usar cores em hex (exclusivamente rgba())                   |
| 5 | Usar setInterval (apenas requestAnimationFrame)             |
| 6 | Usar localStorage ou sessionStorage                         |
| 7 | Criar arquivos externos (.js, .css) — tudo inline no .html  |
| 8 | Resetar o ângulo ao pausar — pausar só congela o frame      |
+---+-------------------------------------------------------------+
```

***

## Critérios de sucesso

```
+---+-----------------------------------------------------------+--------+
| # | Critério                                                  | Testar |
+---+-----------------------------------------------------------+--------+
| 1 | Silhueta reconhecível como hambúrguer a 300px de distância| Visual |
| 2 | FPS no painel mostra 55-60fps desktop                     | Painel |
| 3 | Pausar não reseta o ângulo                                | Botão  |
| 4 | Slider velocidade muda rotação em tempo real              | Slider |
| 5 | Slider escala redimensiona o modelo em tempo real         | Slider |
| 6 | Slider FOV muda distorção perspectiva em tempo real       | Slider |
| 7 | Toggle XYZ mostra 3 linhas coloridas corretas             | Toggle |
| 8 | Resize da janela não quebra a animação                    | Resize |
| 9 | Console limpo — sem undefined, NaN ou erros               | DevTools|
+---+-----------------------------------------------------------+--------+
```

***

## Como usar após gerado

1. Abrir `burger-animation-test.html` direto no browser (`file://`)
2. DevTools → Console → confirmar zero erros
3. DevTools → Performance → gravar 5s → confirmar 60fps
4. Ajustar sliders até a animação estar visualmente correta
5. Quando aprovado: copiar o bloco `(function(){ ... })()` + CSS do `#burger-canvas`
   e colar no `montanha-lanches.html` substituindo o icosaedro atual
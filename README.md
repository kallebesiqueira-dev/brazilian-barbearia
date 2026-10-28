# Brazilian Barbearia — Site Oficial

Landing page premium da **Brazilian Barbearia** — Rua Manoel Novais, 600, Paulo Afonso, Bahia, Brasil. À frente do atendimento está **Carlos**, barbeiro com mais de 3 anos de experiência.

## 1. Objetivos e funcionalidades

- Apresentar a barbearia com identidade visual própria (verde profundo, preto, branco e amarelo de destaque).
- Scroll storytelling cinematográfico: **cada seção fixa na tela e a seguinte sobe de baixo para cima por cima dela** (deck de painéis via CSS `position: sticky` + ajuste JS para seções altas + animações GSAP).
- Galeria de transformações reais: carrossel de fotos **redondas** antes/depois (scroll-snap + botões), vídeo e foto do ambiente em formato quadrado, lightbox acessível.
- **Vitrine de produtos** gerada a partir das fotografias reais da pasta `img/`.
- SEO local para Paulo Afonso e região (metadados, JSON-LD `BarberShop`, sitemap, robots).
- Consentimento de cookies conforme LGPD + páginas de Termos, Privacidade e Cookies.
- Preparação (suspensa) para agendamento via Agenda Easy.

## 2. Tecnologias

| Tecnologia | Uso | Licença |
|---|---|---|
| HTML5 semântico + CSS moderno + JS vanilla | base do site, sem build | — |
| [GSAP 3 + ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) (via CDN jsDelivr) | animações de scroll | Gratuita, uso comercial permitido ([GSAP é 100% free desde a aquisição pela Webflow](https://css-tricks.com/gsap-is-now-completely-free-even-for-commercial-use/)) |
| [Google Fonts](https://fonts.google.com/) — Anton + Archivo | tipografia | SIL Open Font License |

Sem frameworks, sem bundler, sem dependências npm: abra e publique como arquivos estáticos.

## 3. Estrutura de diretórios

```
├── index.html              # página única com todas as seções
├── css/styles.css          # identidade visual completa (design tokens no topo)
├── js/
│   ├── config.js           # TUDO que depende do proprietário (serviços, contatos, Agenda Easy)
│   ├── products.js         # catálogo de produtos (fonte única de dados)
│   ├── main.js             # renderização, menu, lightbox, rodapé
│   ├── cookie-consent.js   # banner e preferências de cookies (LGPD)
│   └── animations.js       # GSAP/ScrollTrigger com fallbacks
├── pages/                  # terms.html, privacy.html, cookies.html
├── img/                    # fotografias reais (produtos, galeria, ambiente)
├── assets/icons/           # favicon.svg
├── robots.txt / sitemap.xml
└── README.md
```

## 4. Requisitos e execução local

Nenhuma instalação é necessária. Duas formas de rodar:

1. **Duplo clique** em `index.html` (tudo funciona via `file://`, inclusive a vitrine).
2. Servidor local (recomendado para testar como em produção):
   ```
   npx serve .
   # ou
   python -m http.server 8080
   ```

## 5. Build e publicação

Não há build — o site é 100% estático. Publique a pasta inteira em qualquer host estático (GitHub Pages, Netlify, Vercel, cPanel…).

**GitHub Pages:** Settings → Pages → Deploy from branch → `main` / root.

## 6. Configuração do domínio

Quando o domínio oficial existir, atualize em 4 lugares:

1. `index.html`: descomente `<link rel="canonical">` e preencha a URL; ajuste `og:image` para URL absoluta.
2. `sitemap.xml`: troque `https://SEU-DOMINIO` pelas URLs reais.
3. `robots.txt`: descomente a linha `Sitemap:`.
4. `js/config.js`: preencha `siteUrl` (referência de documentação).

## 7. Fotografias e vídeos

- As imagens vivem em `img/`. **Não renomeie os arquivos existentes** sem atualizar os caminhos em `index.html` e `js/products.js`.
- Hero usa `img/salao.jpeg`; Sobre usa `img/carlos.jpeg`; Localização/galeria usam `img/entrada.jpeg`; galeria usa os pares `antes*/depois*` e `video trabalho.mp4`.
- Para trocar uma foto, substitua o arquivo mantendo o nome, ou atualize o `src` + atributos `width`/`height` correspondentes (eles evitam layout shift).
- Vídeos: use MP4 curto, `preload="metadata"`, nunca autoplay com áudio.

## 8. Vitrine: como adicionar/atualizar produtos

O catálogo inteiro está em **`js/products.js`** (fonte única — não há segunda lista para manter em sincronia).

1. Coloque a foto do produto em `img/`.
2. Adicione um objeto ao array `window.PRODUCTS`:
   ```js
   {
     id: "identificador-unico",
     name: "Nome legível no rótulo",
     description: "Descrição curta e factual (opcional)",
     category: "Cabelo | Barba",
     image: "img/arquivo.jpeg",
     alt: "Descrição acessível da foto",
     prices: [{ label: "80 g", value: "R$ 25,00" }],
     needsReview: false
   }
   ```
3. Pronto — a vitrine renderiza sozinha.

### Regras de nomes e preços

- Preserve o nome exatamente como aparece no rótulo da foto.
- Use o formato brasileiro `R$ 29,90`.
- **Nunca publique preço presumido.** Se o valor estiver ilegível/não confirmado, marque `needsReview: true` e registre a pendência aqui no README.

### Origem dos preços atuais (importante)

Os rótulos nas fotografias **não exibem preço impresso**. Os valores publicados vieram dos **nomes dos arquivos fornecidos pela barbearia**:

| Arquivo | Produto (rótulo) | Preço publicado |
|---|---|---|
| `oleo 25.jpeg` | Óleo de Barba Fellynos 30 ml | R$ 25,00 |
| `pasta 25.jpeg` | Pasta Modeladora Caramelo Fellynos 80 g | R$ 25,00 |
| `pasta p 25_g 35.jpeg` | Linha Uva Fellynos (pasta 80 g / cera 150 g) | R$ 25,00 / R$ 35,00 |
| `locao 25.jpeg` | Loção Pós-Barba Fellynos 240 ml | R$ 25,00 |
| `ppasta p25 g35.jpeg` | Pasta Fellynos linha verde (P/G) | R$ 25,00 / R$ 35,00 |

**Pendência:** a variante exata da pasta da linha verde (`ppasta p25 g35.jpeg`) está parcialmente ilegível na foto ("fixação extra forte") — marcada com `needsReview: true`. Confirmar nome completo e preços com o proprietário.

## 9. Serviços (editáveis)

A lista de serviços é **intencionalmente vazia** até o proprietário confirmar nomes e valores (nenhum serviço foi inventado). Para publicar, edite `services` em `js/config.js`:

```js
services: [
  { name: "Corte masculino", description: "Máquina e tesoura", price: "R$ 0,00" }
]
```

Enquanto vazia, a seção exibe um aviso honesto com o endereço para consulta.

## 10. Animações GSAP

- Arquivo: `js/animations.js`. O efeito estrutural de empilhamento (cada painel fixa e o próximo sobe por cima) é CSS `position: sticky` + a função `updateStackedPanels()` em `js/main.js`, que dá `top` negativo a seções mais altas que a tela (o conteúdo rola inteiro antes de fixar). O GSAP adiciona reveals e parallax por cima disso.
- `prefers-reduced-motion: reduce` desativa todas as animações (CSS e GSAP).
- Se o CDN falhar, o site permanece completo — os estados iniciais invisíveis só são criados pelo próprio GSAP (`fromTo`).
- Para ajustar intensidade: edite os valores `y`, `duration` e `stagger`; contextos mobile/desktop são separados via `gsap.matchMedia()`.

## 11. SEO local e dados estruturados

- Título/description otimizados para "barbearia em Paulo Afonso" e variações naturais.
- JSON-LD `BarberShop` no `<head>` com endereço e link de mapa (sem horários/telefone inventados — adicione `openingHoursSpecification` e `telephone` quando confirmados).
- `sitemap.xml` + `robots.txt` prontos (dependem do domínio — ver seção 6).
- **Google Search Console:** após publicar com domínio, verifique a propriedade e envie o sitemap.
- **Google Business Profile:** recomenda-se criar/reivindicar o perfil com o mesmo endereço exibido no site (consistência NAP: nome, endereço, telefone).

## 12. Cookies, privacidade e pendências legais

- Banner com Aceitar / Recusar / Personalizar, categorias essencial + estatísticas, escolha guardada em `localStorage` (`bb-cookie-consent-v1`), reabertura pelo rodapé.
- Hoje **nenhuma ferramenta de analytics/publicidade está ativa** — as políticas descrevem exatamente isso.
- Pendências marcadas nas próprias páginas legais: razão social, CNPJ e canal oficial de contato/privacidade.

## 13. Agenda Easy (futuro)

A seção `#agendamento` existe no HTML, **oculta**. Para ativar quando o proprietário fornecer o link oficial:

1. Abra `js/config.js`.
2. Preencha `agendaEasyUrl: "https://link-oficial"`.
3. A seção aparece automaticamente com o botão apontando para o link.

Nenhuma URL foi inventada; não há formulário simulando reservas.

## 14. Checklist de informações a fornecer pelo proprietário

- [ ] Lista de serviços com preços e duração
- [ ] Horários de funcionamento
- [ ] Telefone / WhatsApp
- [ ] Instagram e outros perfis
- [ ] Link oficial do Agenda Easy
- [ ] Nome completo e preço confirmado da pasta "linha verde"
- [ ] Razão social / CNPJ / canal de privacidade (páginas legais)
- [ ] Domínio oficial

## 15. Skills e referências consultadas

- [GSAP ScrollTrigger — documentação oficial](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) — base para `scrub`, triggers e `matchMedia`. Licença gratuita para uso comercial ([anúncio](https://css-tricks.com/gsap-is-now-completely-free-even-for-commercial-use/), [repositório greensock/GSAP](https://github.com/greensock/GSAP)).
- [obra/superpowers](https://github.com/obra/superpowers) — framework open source (MIT) de skills para agentes de código. **Pesquisado, mas não utilizado** neste projeto (não instalado no ambiente).
- Skill de frontend design (plugin oficial do Claude Code) — diretrizes de direção de arte aplicadas na identidade visual.
- Referências visuais: padrões de sites de barbearias premium norte-americanas (tipografia display condensada, fotografia editorial, paleta escura com acento único).

## 16. Testes executados (28/10/2026)

- `node --check` em todos os arquivos JS — sintaxe válida.
- Servidor local (`python -m http.server`) + requisição HTTP de **todos os 29 recursos** referenciados — 200 OK, sem links quebrados (inclusive caminhos com espaços, URL-encodados).
- Verificação automática de 34 referências locais em HTML/JS contra o disco — todas existem.
- **Lighthouse** (Edge headless, servidor local, mobile simulado):
  | Categoria | Nota |
  |---|---|
  | Performance | **97** (LCP 2,0 s · CLS 0,04 · TBT 60 ms) |
  | Acessibilidade | **100** |
  | Best Practices | **100** |
  | SEO | **100** |
  Correções aplicadas durante a auditoria: banner de cookies exibido via `transform`/`opacity` (eliminou CLS de 0,168), preload da imagem do hero (LCP 3,0 s → 2,0 s) e contraste do copyright do rodapé.
- Layout responsivo construído com `clamp()` e grids `auto-fill` para 320–1440 px; recomenda-se conferência visual nas larguras-alvo após alterações de conteúdo.
- Reexecute o Lighthouse na URL pública após a hospedagem (resultados locais são aproximações).

## 17. Limitações conhecidas

- Imagens servidas em JPEG original (sem variantes WebP/AVIF geradas — otimização futura recomendada; tamanhos atuais são moderados, 100–230 KB).
- Páginas legais aguardam dados cadastrais do proprietário.
- Seção de serviços aguarda confirmação de preços.

## 18. Checklist de publicação

- [ ] Definir domínio e aplicar seção 6
- [ ] Preencher serviços e contatos em `js/config.js`
- [ ] Confirmar produto pendente (`needsReview`)
- [ ] Ativar GitHub Pages (ou outro host)
- [ ] Rodar Lighthouse na URL pública e registrar resultados
- [ ] Verificar propriedade no Google Search Console + enviar sitemap
- [ ] Criar Google Business Profile

## 19. Contribuição e commits

- Commits pequenos e com prefixo convencional: `feat:`, `fix:`, `docs:`, `test:`, `chore:`.
- Edite dados do negócio apenas em `js/config.js` e `js/products.js` — nunca direto no HTML.
- Antes de commitar: abra o site localmente e confira console limpo + vitrine renderizada.

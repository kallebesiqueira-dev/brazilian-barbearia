/* ==========================================================================
   BRAZILIAN BARBEARIA — catálogo de produtos (fonte única de dados)

   Origem dos dados:
   - name/description: lidos dos rótulos nas fotografias da pasta img/.
   - prices: extraídos dos NOMES DOS ARQUIVOS fornecidos pela barbearia
     (ex.: "oleo 25.jpeg" = R$ 25; "p 25_g 35" = P R$ 25 / G R$ 35).
     Os rótulos nas fotos não exibem preço impresso.

   Para adicionar um produto: coloque a foto em img/ e acrescente um
   objeto neste array. Nada mais precisa ser alterado — a vitrine é
   renderizada automaticamente por js/main.js.

   needsReview: true  → marque quando nome/preço ainda precisar de
   confirmação do proprietário (documentado no README).
   ========================================================================== */

window.PRODUCTS = [
  {
    id: "oleo-de-barba",
    name: "Óleo de Barba Fellynos",
    description: "Óleo para hidratação e brilho da barba — frasco de 30 ml.",
    category: "Barba",
    image: "img/oleo 25.jpeg",
    alt: "Frasco de Óleo de Barba Fellynos de 30 ml com rótulo preto e dourado, sobre bancada da barbearia.",
    prices: [{ value: "R$ 25,00" }],
    needsReview: false
  },
  {
    id: "pasta-caramelo",
    name: "Pasta Modeladora Caramelo Fellynos",
    description: "Efeito brilho e controle de frizz — pote de 80 g.",
    category: "Cabelo",
    image: "img/pasta 25.jpeg",
    alt: "Pote dourado da Pasta Modeladora Caramelo Fellynos de 80 g, com efeito brilho e controle de frizz.",
    prices: [{ value: "R$ 25,00" }],
    needsReview: false
  },
  {
    id: "pasta-uva",
    name: "Pasta Modeladora Uva Fellynos",
    description: "Linha Uva: pasta modeladora de fixação forte (80 g) e cera de uva de alto brilho (150 g).",
    category: "Cabelo",
    image: "img/pasta p 25_g 35.jpeg",
    alt: "Dois potes roxos da linha Uva Fellynos: pasta modeladora de 80 g e cera de uva de 150 g.",
    prices: [
      { label: "P", value: "R$ 25,00" },
      { label: "G", value: "R$ 35,00" }
    ],
    needsReview: false
  },
  {
    id: "locao-pos-barba",
    name: "Loção Pós-Barba Fellynos",
    description: "After shave com refrescância de mentol, acalma a pele — 240 ml.",
    category: "Barba",
    image: "img/locao 25.jpeg",
    alt: "Frasco azul da Loção Pós-Barba Fellynos de 240 ml, after shave com mentol.",
    prices: [{ value: "R$ 25,00" }],
    needsReview: false
  },
  {
    id: "pasta-verde",
    /* O nome exato da variante no rótulo verde não está totalmente legível
       na fotografia ("fixação extra forte" parcialmente visível).
       Confirmar com o proprietário antes de detalhar mais a descrição. */
    name: "Pasta Modeladora Fellynos — Linha Verde",
    description: "Pasta modeladora de fixação extra forte, nos tamanhos 80 g e maior.",
    category: "Cabelo",
    image: "img/ppasta p25 g35.jpeg",
    alt: "Dois potes verdes de pasta modeladora Fellynos de fixação extra forte, tamanhos pequeno e grande.",
    prices: [
      { label: "P", value: "R$ 25,00" },
      { label: "G", value: "R$ 35,00" }
    ],
    needsReview: true
  }
];

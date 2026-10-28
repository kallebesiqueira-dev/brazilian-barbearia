/* ==========================================================================
   BRAZILIAN BARBEARIA — configuração central do site
   Tudo que depende de confirmação do proprietário fica NESTE arquivo.
   Campos vazios ("" ou []) são automaticamente ocultados pelo site.
   ========================================================================== */

window.SITE_CONFIG = {
  /* Domínio oficial (quando existir). Usado apenas como referência de
     documentação — atualize também <link rel="canonical">, robots.txt
     e sitemap.xml ao definir o domínio. */
  siteUrl: "",

  /* --------------------------------------------------------------------
     AGENDA EASY — integração futura de agendamento.
     A seção #agendamento permanece oculta enquanto esta URL for "".
     Quando o proprietário fornecer o link oficial, basta preenchê-lo:
     agendaEasyUrl: "https://..."
     -------------------------------------------------------------------- */
  agendaEasyUrl: "",

  /* Canais de contato — exibidos somente quando preenchidos.
     whatsapp: use apenas números, com DDI/DDD. Ex.: "5575999990000" */
  whatsapp: "5575987011691",
  instagram: "https://instagram.com/barbeariabrazilian_",
  phone: "",       // Ex.: "(75) 99999-0000"

  /* Horários de funcionamento — exibidos na seção Localização quando
     confirmados. Ex.: ["Seg a Sex — 8h às 19h", "Sáb — 8h às 17h"] */
  hours: [],

  /* --------------------------------------------------------------------
     SERVIÇOS — preencher somente com dados confirmados pelo proprietário.
     Enquanto a lista estiver vazia, a seção mostra um aviso honesto.
     Formato de cada item:
     { name: "Corte masculino", description: "Tesoura e máquina", price: "R$ 0,00" }
     price e description são opcionais.
     -------------------------------------------------------------------- */
  services: [
    { name: "Cabelo Adulto", price: "R$ 30,00" },
    { name: "Cabelo Criança", price: "R$ 30,00" },
    { name: "Barba", price: "R$ 25,00" },
    { name: "Pezinho", price: "R$ 10,00" },
    { name: "Sobrancelha", price: "R$ 10,00" },
    { name: "Combo Cabelo + Barba", price: "R$ 50,00" }
  ]
};

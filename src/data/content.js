export const contentData = [
  // Articles
  {
    id: 1,
    type: 'article',
    date: 'Dec 12, 2024',
    en: {
      title: "The Efficiency Trap",
      summary: "Why trying to do everything faster often means doing the wrong things.",
      content: `
        <p>We are obsessed with speed. But speed in the wrong direction is just a faster way to fail.</p>
        <p>True efficiency isn't about doing more things per hour. It's about deleting the things that don't need to be done at all.</p>
        <h3>The Busy Fool</h3>
        <p>I see founders optimizing their email workflow while their product has no market fit. That's the definition of the efficiency trap.</p>
        <p><strong>Stop optimizing. Start eliminating.</strong></p>
      `
    },
    pt: {
      title: "A Armadilha da Eficiência",
      summary: "Por que tentar fazer tudo mais rápido geralmente significa fazer as coisas erradas.",
      content: `
        <p>Somos obcecados por velocidade. Mas velocidade na direção errada é apenas uma maneira mais rápida de falhar.</p>
        <p>Eficiência real não é sobre fazer mais coisas por hora. É sobre deletar as coisas que não precisam ser feitas de forma alguma.</p>
        <h3>O Tolo Ocupado</h3>
        <p>Eu vejo fundadores otimizando seu fluxo de trabalho de e-mail enquanto seu produto não tem ajuste ao mercado. Essa é a definição da armadilha da eficiência.</p>
        <p><strong>Pare de otimizar. Comece a eliminar.</strong></p>
      `
    }
  },
  {
    id: 2,
    type: 'article',
    date: 'Nov 28, 2024',
    en: {
      title: "Building for Impact",
      summary: "Code is cheap. Change is expensive. How to bridge the gap.",
      content: `
        <p>Anyone can write code. AI can write code. But code itself is not value.</p>
        <p>Value is behavior change. If your software doesn't change how someone works, lives, or thinks, it's just digital clutter.</p>
        <h3>The Impact Equation</h3>
        <p>Impact = (Problem Severity x Solution Quality) / Friction</p>
        <p>Focus on reducing friction, not just adding features.</p>
      `
    },
    pt: {
      title: "Construindo para Impacto",
      summary: "Código é barato. Mudança é cara. Como fechar essa lacuna.",
      content: `
        <p>Qualquer um pode escrever código. IA pode escrever código. Mas o código por si só não é valor.</p>
        <p>Valor é mudança de comportamento. Se o seu software não muda como alguém trabalha, vive ou pensa, é apenas entulho digital.</p>
        <h3>A Equação do Impacto</h3>
        <p>Impacto = (Gravidade do Problema x Qualidade da Solução) / Fricção</p>
        <p>Foque em reduzir a fricção, não apenas em adicionar funcionalidades.</p>
      `
    }
  },

  // Thoughts (Microposts)
  {
    id: 3,
    type: 'thought',
    en: { content: "Most meetings could be emails. Most emails could be nothing." },
    pt: { content: "A maioria das reuniões poderia ser e-mails. A maioria dos e-mails poderia ser nada." }
  },
  {
    id: 4,
    type: 'thought',
    en: { content: "Data without context is just noise with a diploma." },
    pt: { content: "Dados sem contexto são apenas barulho com um diploma." }
  },
  {
    id: 5,
    type: 'thought',
    en: { content: "If you aren't embarrassed by your first version, you launched too late." },
    pt: { content: "Se você não tem vergonha da sua primeira versão, você lançou tarde demais." }
  },

  // Visuals (Images/Videos)
  {
    id: 6,
    type: 'visual',
    subType: 'image',
    en: { label: "Design System Draft v1" },
    pt: { label: "Rascunho do Design System v1" }
  },
  {
    id: 7,
    type: 'visual',
    subType: 'image',
    en: { label: "Office Setup" },
    pt: { label: "Configuração do Escritório" }
  },
  {
    id: 8,
    type: 'visual',
    subType: 'video',
    en: { label: "Keynote at TechConf 2024" },
    pt: { label: "Palestra na TechConf 2024" }
  },
];

export const travelHistory = [
  {
    year: 2013,
    destinations: [
      { en: { name: "France", month: "Feb" }, pt: { name: "França", month: "Fev" }, country: "France" },
      { en: { name: "Belgium" }, pt: { name: "Bélgica" }, country: "Belgium" },
      { en: { name: "Netherlands" }, pt: { name: "Holanda" }, country: "Netherlands" },
      { en: { name: "Austria" }, pt: { name: "Áustria" }, country: "Austria" },
      { en: { name: "Czech Republic" }, pt: { name: "Rep Tcheca" }, country: "Czech Republic" },
      { en: { name: "Hungary" }, pt: { name: "Hungria" }, country: "Hungary" },
      { en: { name: "Slovakia" }, pt: { name: "Eslováquia" }, country: "Slovakia" }
    ]
  },
  {
    year: 2015,
    destinations: [
      { en: { name: "London" }, pt: { name: "Londres" }, country: "United Kingdom" },
      { en: { name: "Amsterdam" }, pt: { name: "Amsterdam" }, country: "Netherlands" }
    ]
  },
  {
    year: 2019,
    destinations: [
      { en: { name: "Paris" }, pt: { name: "Paris" }, country: "France" },
      { en: { name: "London" }, pt: { name: "Londres" }, country: "United Kingdom" },
      { en: { name: "Greece" }, pt: { name: "Grécia" }, country: "Greece" },
      { en: { name: "Turkey" }, pt: { name: "Turquia" }, country: "Turkey" }
    ]
  },
  {
    year: 2025,
    destinations: [
      { en: { name: "China", month: "April" }, pt: { name: "China", month: "Abril" }, country: "China" },
      { en: { name: "Israel", month: "Nov" }, pt: { name: "Israel", month: "Nov" }, country: "Israel" }
    ]
  }
];

export const userProfile = {
  birthYear: 1991,
  currentYear: new Date().getFullYear(),
  targetWorldTour: 195 // Total recognized countries
};


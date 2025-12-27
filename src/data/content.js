export const contentData = [
  // Articles
  {
    id: 1,
    type: 'article',
    date: 'Dec 12, 2024',
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
  {
    id: 2,
    type: 'article',
    date: 'Nov 28, 2024',
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

  // Thoughts (Microposts)
  { id: 3, type: 'thought', content: "Most meetings could be emails. Most emails could be nothing." },
  { id: 4, type: 'thought', content: "Data without context is just noise with a diploma." },
  { id: 5, type: 'thought', content: "If you aren't embarrassed by your first version, you launched too late." },

  // Visuals (Images/Videos)
  { id: 6, type: 'visual', subType: 'image', label: "Design System Draft v1" },
  { id: 7, type: 'visual', subType: 'image', label: "Office Setup" },
  { id: 8, type: 'visual', subType: 'video', label: "Keynote at TechConf 2024" },
];

export const travelHistory = [
  {
    year: 2013,
    destinations: [
      { name: "França", month: "fev", country: "France" },
      { name: "Bélgica", country: "Belgium" },
      { name: "Holanda", country: "Netherlands" },
      { name: "Áustria", country: "Austria" },
      { name: "Rep Tcheca", country: "Czech Republic" },
      { name: "Hungria", country: "Hungary" },
      { name: "Eslováquia", country: "Slovakia" }
    ]
  },
  {
    year: 2015,
    destinations: [
      { name: "Londres", country: "United Kingdom" },
      { name: "Amsterdam", country: "Netherlands" }
    ]
  },
  {
    year: 2019,
    destinations: [
      { name: "Paris", country: "France" },
      { name: "Londres", country: "United Kingdom" },
      { name: "Grécia", country: "Greece" },
      { name: "Turquia", country: "Turkey" }
    ]
  },
  {
    year: 2025,
    destinations: [
      { name: "China", month: "abril", country: "China" },
      { name: "Israel", month: "nov", country: "Israel" }
    ]
  }
];

export const userProfile = {
  birthYear: 1991,
  currentYear: new Date().getFullYear(),
  targetWorldTour: 195 // Total recognized countries
};


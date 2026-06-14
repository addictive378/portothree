// Data structure representing the technologies and expertise areas
// Separated from the presentation component to maintain clean architecture.

export interface Technology {
  name: string
  level: number // percentage (0 - 100) representing proficiency
}

export interface SkillGroup {
  category: string
  description: string
  icon: 'Brain' | 'Layout' | 'Server' | 'Database' // Supported Lucide Icons
  color: string // Pink Floyd rainbow spectrum CSS variable reference
  glowColor: string // RGBA glow color for the card's active/hover shadow state
  technologies: Technology[]
}

export const SKILLS_DATA: SkillGroup[] = [
  {
    category: 'AI',
    description: 'Engineering intelligent agent systems, neural architectures, and semantic pipelines.',
    icon: 'Brain',
    color: 'var(--rainbow-red)',
    glowColor: 'rgba(255, 0, 85, 0.12)',
    technologies: [
      { name: 'LangChain & Agentic Workflows', level: 85 },
      { name: 'PyTorch / Neural Networks', level: 80 },
      { name: 'Hugging Face / Transformers', level: 85 },
      { name: 'Vector DBs (Pinecone/Milvus) & RAG', level: 90 },
    ],
  },
  {
    category: 'Frontend',
    description: 'Crafting pixel-perfect, highly responsive, and immersive web experiences.',
    icon: 'Layout',
    color: 'var(--rainbow-yellow)',
    glowColor: 'rgba(255, 221, 0, 0.12)',
    technologies: [
      { name: 'Next.js 15 (App Router) & React 19', level: 95 },
      { name: 'TypeScript & Modern JavaScript', level: 92 },
      { name: 'Three.js / React Three Fiber', level: 80 },
      { name: 'Tailwind CSS & GSAP Animations', level: 95 },
    ],
  },
  {
    category: 'Backend',
    description: 'Architecting safe, low-latency, and high-concurrency microservices.',
    icon: 'Server',
    color: 'var(--rainbow-green)',
    glowColor: 'rgba(0, 255, 102, 0.12)',
    technologies: [
      { name: 'Rust (Tokio, Axum, Actix-web)', level: 90 },
      { name: 'Node.js & Express / NestJS', level: 85 },
      { name: 'gRPC & Protocol Buffers', level: 82 },
      { name: 'WebSockets & Real-time Pub/Sub', level: 88 },
    ],
  },
  {
    category: 'Database',
    description: 'Structuring transactional schemas, caching layers, and containerized deployments.',
    icon: 'Database',
    color: 'var(--rainbow-blue)',
    glowColor: 'rgba(0, 136, 255, 0.12)',
    technologies: [
      { name: 'PostgreSQL & Prisma / SQLx', level: 90 },
      { name: 'Redis (Caching & Rate Limiting)', level: 85 },
      { name: 'Docker / Linux POSIX Systems', level: 92 },
      { name: 'AWS & CI/CD Pipelines (Github Actions)', level: 80 },
    ],
  },
]

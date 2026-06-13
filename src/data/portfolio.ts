import { Project, SkillCategory, TimelineItem } from '../types'

// Navigation links
export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

// Timeline / Experience items
export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    year: '2024 - Present',
    role: 'Lead Creative Engineer',
    company: 'Eclipse Digital Studio',
    description:
      'Pioneering highly interactive 3D web experiences using React Three Fiber, Next.js, and GSAP. Architected design systems that bridged the gap between immersive 3D space and standard 2D layout.',
  },
  {
    year: '2022 - 2024',
    role: 'Senior Frontend Engineer',
    company: 'Prism Tech',
    description:
      'Led the transition of client portfolios to Next.js App Router, enhancing loading speeds by 40%. Implemented complex scroll animations and visual effects that increased user engagement metrics.',
  },
  {
    year: '2020 - 2022',
    role: 'Creative Developer',
    company: 'Pulse Media',
    description:
      'Developed pixel-perfect marketing landing pages and bespoke user interfaces. Explored physics engines, WebGL, and shaders to deliver memorable online campaigns.',
  },
]

// Skills categories, mapping each skill to a specific color of the rainbow spectrum
export const SKILLS_CATEGORIES: SkillCategory[] = [
  {
    title: 'Core Development',
    skills: [
      { name: 'TypeScript', level: 90, color: '#ff0055', bgClass: 'bg-rainbow-red' },
      { name: 'Next.js 15 (App Router)', level: 95, color: '#ff7f00', bgClass: 'bg-rainbow-orange' },
      { name: 'React', level: 95, color: '#ffdd00', bgClass: 'bg-rainbow-yellow' },
      { name: 'Tailwind CSS', level: 90, color: '#00ff66', bgClass: 'bg-rainbow-green' },
    ],
  },
  {
    title: '3D & Animations',
    skills: [
      { name: 'React Three Fiber', level: 85, color: '#0088ff', bgClass: 'bg-rainbow-blue' },
      { name: 'Three.js / WebGL', level: 80, color: '#7a00ff', bgClass: 'bg-rainbow-violet' },
      { name: 'GSAP', level: 90, color: '#ff0055', bgClass: 'bg-rainbow-red' },
      { name: 'Shaders (GLSL)', level: 70, color: '#ff7f00', bgClass: 'bg-rainbow-orange' },
    ],
  },
]

// Project items, each highlighted by a rainbow color accent
export const PROJECTS_DATA: Project[] = [
  {
    id: 'prism-cloud',
    title: 'Prism Cloud Platform',
    description: 'A futuristic cloud orchestration visualization platform driven by WebGL and React Three Fiber.',
    longDescription:
      'Prism Cloud Platform allows devops engineers to see their server architecture in 3D. Users can fly through clusters, visualize latency spikes as color pulses, and debug bottlenecks in real-time. Built using Next.js 15, React Three Fiber, Custom GLSL shaders, and GSAP timelines for UI transitions.',
    tags: ['Next.js', 'React Three Fiber', 'GLSL', 'Tailwind CSS'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    color: 'rainbow-red',
  },
  {
    id: 'lunar-sound',
    title: 'Lunar Sound Synthesizer',
    description: 'An interactive browser-based synthesizer inspired by classic Pink Floyd synth waveforms.',
    longDescription:
      'An audio-visual experiment modeling the VCS3 synthesizer used on "Time" and "On the Run". Includes custom Web Audio API routing, interactive knobs rendered in 3D Canvas, and GSAP-triggered frequency oscilloscopes. Users can record and share custom audio loops.',
    tags: ['Web Audio API', 'React Three Fiber', 'Tailwind CSS', 'TypeScript'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    color: 'rainbow-orange',
  },
  {
    id: 'eclipse-analytics',
    title: 'Eclipse Analytics Dashboard',
    description: 'A premium glassmorphic dashboard visualizing web traffic with smooth animated charts.',
    longDescription:
      'A dashboard project featuring extensive data visualization, sleek dark mode glassmorphism panels, and highly interactive charts. Every hover, transition, and page load is animated with GSAP ScrollTrigger, providing the feel of a premium desktop application.',
    tags: ['Next.js', 'Tailwind CSS', 'Recharts', 'GSAP'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    color: 'rainbow-green',
  },
]

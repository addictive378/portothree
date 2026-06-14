// Reusable project data structure and content details.
// Separated from the presentation component to maintain clean architecture.

export interface Project {
  id: string
  title: string
  description: string
  longDescription: string // Full description in the Dialog modal
  challenges: string // Challenges faced during development
  solutions: string // Solutions implemented to solve the challenges
  technologies: string[]
  github?: string
  demo?: string
  image: string // Path to the public static asset
  color: string // Theme color variable matching the Pink Floyd spectrum
  glowColor: string // Glow shadow value on card hover
}

export const PROJECTS_DATA: Project[] = [
  {
    id: 'prism-cloud',
    title: 'Prism Cloud Orchestrator',
    description: 'A futuristic cloud architecture visualization platform powered by WebGL and React Three Fiber.',
    longDescription:
      'Prism Cloud Orchestrator allows platform engineers to see their server topologies and network maps in immersive 3D. Users can hover nodes to inspect Kubernetes pods, visualize traffic spikes as color-pulsing waves, and troubleshoot routing bottlenecks in real time. It converts standard flat JSON logs into beautiful, interactive spatial models.',
    challenges:
      'Rendering thousands of active container nodes and live data paths on screen simultaneously led to substantial frame drops and memory leaks under React-based re-rendering loops.',
    solutions:
      'Offloaded the nodes representation to instanced meshes on the GPU and managed position updates inside a custom shader vertex attribute. Implemented a worker thread to parse telemetry data off-main-thread, reducing scripting blocking times to under 3ms.',
    technologies: ['React Three Fiber', 'Next.js 15', 'Three.js / WebGL', 'GLSL Shaders', 'Web Workers'],
    github: 'https://github.com/example/prism-cloud',
    demo: 'https://prism-cloud-demo.example.com',
    image: '/project_prism_cloud.jpg',
    color: 'var(--rainbow-red)',
    glowColor: 'rgba(255, 0, 85, 0.12)',
  },
  {
    id: 'lunar-synth',
    title: 'Lunar Sound Synthesizer',
    description: 'An interactive browser synthesizer inspired by the iconic VCS3 analog sound engines.',
    longDescription:
      'A digital audio-visualizer modeled after the legendary synth used on Pink Floyd tracks like "Time" and "On the Run". It features virtual patch cords, oscillator controls, adjustable LFOs, and filter modules. Keyboard-accessible controls let users patch modular wires, tweak synth knobs, and record custom loops directly in the browser.',
    challenges:
      'Ensuring low-latency audio processing and pixel-perfect oscillator visualizers in high-load render conditions without causing crackling audio or laggy UI feedback.',
    solutions:
      'Employed custom Web Audio API AudioWorklets running in high-priority audio threads. Structured the frequency analyzer oscilloscope to draw onto a 2D canvas using requestAnimationFrame to bypass React render overhead entirely.',
    technologies: ['Web Audio API', 'AudioWorklet', 'TypeScript', 'Tailwind CSS', 'GSAP'],
    github: 'https://github.com/example/lunar-synth',
    demo: 'https://lunar-synth-demo.example.com',
    image: '/project_lunar_synth.jpg',
    color: 'var(--rainbow-yellow)',
    glowColor: 'rgba(255, 221, 0, 0.12)',
  },
  {
    id: 'eclipse-dash',
    title: 'Eclipse Analytics Engine',
    description: 'A premium real-time data visualization suite boasting glassmorphic overlays and charts.',
    longDescription:
      'A dashboard engine built to analyze and display massive volumes of incoming website traffic. It uses streaming WebSockets to deliver second-by-second analytics updates. Every chart transit, modal overlay, and navigation switch is fluidly animated, presenting corporate data like a premium, desktop-grade dashboard application.',
    challenges:
      'Synchronizing high-frequency WebSocket updates with animated charting elements without overwhelming browser frame rates or creating sluggish scroll experiences.',
    solutions:
      'Created a requestAnimationFrame data buffer that throttled chart updates to match the monitor refresh rate. Optimized re-renders by utilizing context-level state splits and memoizing the grid layouts.',
    technologies: ['Next.js 15', 'TypeScript', 'WebSockets', 'Recharts / SVG', 'Tailwind CSS'],
    github: 'https://github.com/example/eclipse-analytics',
    demo: 'https://eclipse-analytics-demo.example.com',
    image: '/project_eclipse_dash.jpg',
    color: 'var(--rainbow-green)',
    glowColor: 'rgba(0, 255, 102, 0.12)',
  },
  {
    id: 'spectra-ai',
    title: 'Spectra AI Agent Platform',
    description: 'An autonomous agent swarm command panel orchestrating multi-agent workflows.',
    longDescription:
      'A command platform that coordinates multiple autonomous AI agents. The user interface charts agent tasks, memory allocations, and tool invocations. It supports semantic searches across agent memory bases using vector indexing and draws live node maps of agent-to-agent collaboration chains.',
    challenges:
      'Visualizing live communication pipelines between autonomous swarms where nodes are created, changed, and destroyed dynamically.',
    solutions:
      'Designed a dynamic SVG connector system linked with GSAP timelines to draw and animate connection arrows in response to state changes, providing clear visual telemetry of AI actions.',
    technologies: ['LangChain / AI Agents', 'Vector Databases', 'Next.js', 'GSAP Timelines', 'SVG Render'],
    github: 'https://github.com/example/spectra-ai',
    demo: 'https://spectra-ai-demo.example.com',
    image: '/project_spectra_ai.jpg',
    color: 'var(--rainbow-blue)',
    glowColor: 'rgba(0, 136, 255, 0.12)',
  },
]

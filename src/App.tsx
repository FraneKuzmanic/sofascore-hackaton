import { useEffect, useState, type ReactNode } from 'react'

const glassHeaderStyle = {
  background: 'rgba(250, 250, 249, 0.85)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
}

const tokenStyles = {
  keyword: { color: '#c678dd' },
  function: { color: '#61afef' },
  string: { color: '#98c379' },
  tag: { color: '#e06c75' },
  attr: { color: '#d19a66' },
  punctuation: { color: '#abb2bf' },
  comment: { color: '#5c6370', fontStyle: 'italic' },
}

type PingDotProps = {
  size?: 'sm' | 'lg'
}

const PingDot = ({ size = 'sm' }: PingDotProps) => {
  const dotSize = size === 'sm' ? 'h-2 w-2' : 'h-2.5 w-2.5'
  const wrapperSize = size === 'sm' ? 8 : 10

  return (
    <span
      className="relative flex"
      style={{ width: wrapperSize, height: wrapperSize }}
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75"></span>
      <span
        className={`relative inline-flex rounded-full ${dotSize} bg-teal-500`}
      ></span>
    </span>
  )
}

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  const navSections = ['about', 'projects', 'experience', 'skills']

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 border-b border-stone-200 transition-all duration-300 ${
        scrolled ? 'shadow-sm' : ''
      }`}
      style={glassHeaderStyle}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12">
        <button
          onClick={() => scrollToSection('hero')}
          className="group flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-900 font-mono text-lg font-bold text-stone-50 transition-colors duration-300 group-hover:bg-teal-600">
            FK
          </div>
          <span className="hidden text-lg font-semibold tracking-tight sm:block">
            Frane Kuzmanic
          </span>
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          {navSections.map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className="text-sm font-medium text-stone-600 capitalize transition-colors hover:text-stone-900"
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}

          <div className="mx-2 h-4 w-px bg-stone-300"></div>

          <div className="flex items-center gap-2 rounded-full border border-stone-200 bg-stone-100 px-3 py-1.5">
            <PingDot size="sm" />
            <span className="text-xs font-medium text-stone-600">
              Available
            </span>
          </div>

          <button
            onClick={() => scrollToSection('contact')}
            className="rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors duration-300 hover:bg-teal-600"
          >
            Contact me
          </button>
        </nav>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-stone-600 transition-colors hover:text-stone-900 md:hidden"
          aria-label="Toggle menu"
        >
          <i
            className={`${
              mobileMenuOpen ? 'ri-close-line' : 'ri-menu-4-line'
            } text-2xl`}
          ></i>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="absolute top-20 right-0 left-0 flex flex-col gap-6 border-b border-stone-200 bg-stone-50 px-6 py-8 shadow-lg md:hidden">
          {navSections.map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className="text-left text-lg font-medium text-stone-900 capitalize"
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
          <div className="flex flex-col gap-4 border-t border-stone-200 pt-4">
            <div className="flex items-center gap-2">
              <PingDot size="lg" />
              <span className="text-sm font-medium text-stone-600">
                Available for opportunities
              </span>
            </div>
            <button
              onClick={() => scrollToSection('contact')}
              className="rounded-full bg-stone-900 px-6 py-3 text-center text-base font-medium text-white"
            >
              Contact me
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

const CodeBlock = () => {
  const p = (content: ReactNode) => (
    <span style={tokenStyles.punctuation}>{content}</span>
  )
  const kw = (content: ReactNode) => (
    <span style={tokenStyles.keyword}>{content}</span>
  )
  const fn = (content: ReactNode) => (
    <span style={tokenStyles.function}>{content}</span>
  )
  const str = (content: ReactNode) => (
    <span style={tokenStyles.string}>{content}</span>
  )
  const tg = (content: ReactNode) => (
    <span style={tokenStyles.tag}>{content}</span>
  )
  const at = (content: ReactNode) => (
    <span style={tokenStyles.attr}>{content}</span>
  )
  const cm = (content: ReactNode) => (
    <span style={tokenStyles.comment}>{content}</span>
  )

  return (
    <div className="flex-1 overflow-x-auto p-6 font-mono text-sm leading-relaxed text-[#abb2bf]">
      <pre>
        <code>
          {kw('import')} {p('{')} useState {p('}')} {kw('from')}{' '}
          {str("'react'")}
          {p(';')}
          {'\n'}
          {kw('import')} {p('{')} Developer {p('}')} {kw('from')}{' '}
          {str("'@/types'")}
          {p(';')}
          {'\n\n'}
          {kw('export')} {kw('default')} {kw('function')} {fn('Profile')}
          {p('()')}
          {p(' {')} {'\n'}
          {'  '}
          {kw('const')} {p('[')}status{p(']')} {kw('=')} {fn('useState')}
          {p('(')}
          {str("'available'")}
          {p(')')}
          {p(';')}
          {'\n\n'}
          {'  '}
          {kw('const')} frane{p(':')} Developer {kw('=')} {p('{')} {'\n'}
          {'    '}role{p(':')} {str("'Frontend Engineer'")}
          {p(',')}
          {'\n'}
          {'    '}focus{p(':')} {p('[')}
          {str("'UI/UX'")}
          {p(',')} {str("'Performance'")}
          {p(',')} {str("'Clean Code'")}
          {p(']')}
          {p(',')}
          {'\n'}
          {'    '}stack{p(':')} {p('[')}
          {str("'React'")}
          {p(',')} {str("'TypeScript'")}
          {p(',')} {str("'Tailwind'")}
          {p(']')}
          {'\n'}
          {'  '}
          {p('}')}
          {p(';')}
          {'\n\n'}
          {'  '}
          {kw('return')} {p('(')}
          {'\n'}
          {'    '}
          {tg('<main')} {at('className')}
          {kw('=')}
          {str('"modern-web"')}
          {tg('>')}
          {'\n'}
          {'      '}
          {tg('<header')} {at('status')}
          {kw('=')}
          {p('{')}
          {p('}')} {tg('/>')}
          {'\n'}
          {'      '}
          {cm('{/* Ready to build something great */}')}
          {'\n'}
          {'      '}
          {tg('<ProjectGrid')} {at('developer')}
          {kw('=')}
          {p('{')}
          {p('}')} {tg('/>')}
          {'\n'}
          {'    '}
          {tg('</main>')}
          {'\n'}
          {'  '}
          {p(')')}
          {p(';')}
          {'\n'}
          {p('}')}
        </code>
      </pre>
    </div>
  )
}

const HeroSection = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="mx-auto flex min-h-[90vh] max-w-7xl flex-col justify-center px-6 pt-32 pb-20 md:px-12 md:pt-48 md:pb-32"
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col items-start lg:col-span-7">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3 py-1.5 text-sm font-medium text-teal-700">
            <PingDot size="sm" />
            Available for opportunities
          </div>

          <h1 className="mb-6 text-4xl leading-[1.1] font-bold tracking-tight text-stone-900 md:text-5xl lg:text-6xl">
            Software developer building reliable, elegant, and user-focused
            web applications.
          </h1>

          <p className="mb-10 max-w-2xl text-lg leading-relaxed text-stone-600 md:text-xl">
            I design and build clean frontend experiences, scalable application
            interfaces, and practical digital products with attention to
            performance, usability, and maintainable code.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollToSection('projects')}
              className="group flex items-center gap-2 rounded-full bg-stone-900 px-7 py-3.5 text-base font-medium text-white shadow-sm transition-colors duration-300 hover:bg-teal-600"
            >
              View projects
              <i className="ri-arrow-right-line transition-transform group-hover:translate-x-1"></i>
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="rounded-full border-2 border-stone-200 bg-transparent px-7 py-3 text-base font-medium text-stone-900 transition-all duration-300 hover:border-stone-300 hover:bg-stone-100"
            >
              Contact me
            </button>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4 text-sm font-medium text-stone-500">
            <div className="flex items-center gap-1.5">
              <i className="ri-map-pin-2-line text-stone-400"></i>
              Zagreb, Croatia
            </div>
            <div className="h-4 w-px bg-stone-300"></div>
            <a
              href="https://github.com/FraneKuzmanic"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-stone-900"
            >
              <i className="ri-github-fill text-stone-400"></i>
              GitHub
            </a>
            <div className="h-4 w-px bg-stone-300"></div>
            <a
              href="https://www.linkedin.com/in/frane-kuzmanic-682872267/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-stone-900"
            >
              <i className="ri-linkedin-fill text-stone-400"></i>
              LinkedIn
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg lg:col-span-5 lg:mx-0">
          <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-tr from-stone-200 to-teal-100 opacity-50 blur-2xl"></div>
          <div className="relative flex h-[400px] w-full flex-col overflow-hidden rounded-2xl border border-stone-800 bg-[#1E1E1E] shadow-2xl">
            <div className="flex h-12 items-center gap-2 border-b border-stone-800 bg-[#2D2D2D] px-4">
              <div className="h-3 w-3 rounded-full bg-[#FF5F56]"></div>
              <div className="h-3 w-3 rounded-full bg-[#FFBD2E]"></div>
              <div className="h-3 w-3 rounded-full bg-[#27C93F]"></div>
              <div className="ml-4 flex items-center gap-2 font-mono text-xs text-[#858585]">
                <i className="ri-reactjs-line text-[#61dafb]"></i> App.tsx
              </div>
            </div>
            <CodeBlock />
          </div>
        </div>
      </div>
    </section>
  )
}

type AboutCardProps = {
  icon: string
  title: string
  description: string
}

const AboutCard = ({ icon, title, description }: AboutCardProps) => (
  <div className="flex flex-col gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-6 transition-shadow duration-300 hover:shadow-md">
    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700">
      <i className={`${icon} text-lg`}></i>
    </div>
    <h3 className="font-semibold text-stone-900">{title}</h3>
    <p className="text-sm text-stone-600">{description}</p>
  </div>
)

const AboutSection = () => (
  <section id="about" className="border-y border-stone-200 bg-white py-24">
    <div className="mx-auto max-w-7xl px-6 md:px-12">
      <div className="mb-16">
        <span className="font-mono text-sm tracking-wider text-stone-500 uppercase">
          01 // About
        </span>
      </div>

      <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
        <div>
          <h2 className="mb-6 text-3xl font-bold text-stone-900">
            Building interfaces that make sense.
          </h2>
          <div className="text-lg text-stone-600">
            <p className="mb-4">
              I am a software developer focused on frontend engineering, UI
              architecture, and creating intuitive user experiences. My goal is
              to build practical applications that solve real problems while
              maintaining high standards for code quality and performance.
            </p>
            <p className="mb-4">
              Whether it is crafting a complex dashboard, an e-commerce
              storefront, or a robust mobile application, I care deeply about
              the details. I believe that good design and solid engineering go
              hand-in-hand, and I strive to bridge the gap between design
              systems and technical implementation.
            </p>
            <p>
              I am constantly learning and refining my craft, currently focused
              on mastering advanced React patterns and expanding my backend
              knowledge to become a more versatile engineer.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <AboutCard
            icon="ri-layout-3-line"
            title="Frontend-focused"
            description="Specializing in modern web interfaces and responsive layouts."
          />
          <AboutCard
            icon="ri-reactjs-line"
            title="React Ecosystem"
            description="Proficient in React, Next.js, and React Native for cross-platform."
          />
          <AboutCard
            icon="ri-code-s-slash-line"
            title="Clean Architecture"
            description="Writing maintainable, scalable, and self-documenting code."
          />
          <AboutCard
            icon="ri-briefcase-line"
            title="Open to Roles"
            description="Seeking internships, junior roles, or freelance opportunities."
          />
        </div>
      </div>
    </div>
  </section>
)

type TagBadgeProps = {
  children: ReactNode
  variant?: 'pill' | 'border'
}

const TagBadge = ({ children, variant = 'pill' }: TagBadgeProps) => {
  if (variant === 'pill') {
    return (
      <span className="rounded-full bg-stone-100 px-3 py-1 font-mono text-xs text-stone-700">
        {children}
      </span>
    )
  }

  return (
    <span className="rounded-md border border-stone-200 bg-stone-50 px-2.5 py-1 font-mono text-xs text-stone-600">
      {children}
    </span>
  )
}

const FeaturedProject = () => (
  <div className="group col-span-1 overflow-hidden rounded-3xl border border-stone-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:col-span-2">
    <div className="grid h-full grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col justify-center p-8 lg:p-12">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100 text-stone-700">
            <i className="ri-kanban-view-2 text-xl"></i>
          </div>
          <h3 className="text-2xl font-bold text-stone-900">
            TaskFlow Workspace
          </h3>
        </div>
        <p className="mb-8 text-lg text-stone-600">
          A comprehensive task management application inspired by modern
          productivity tools. Features include real-time collaboration,
          drag-and-drop kanban boards, customizable workflows, and detailed
          productivity analytics. Built with a focus on keyboard accessibility
          and zero-latency optimistic UI updates.
        </p>

        <div className="mb-8">
          <h4 className="mb-3 font-mono text-xs text-stone-500 uppercase">
            Technologies
          </h4>
          <div className="flex flex-wrap gap-2">
            {['React', 'TypeScript', 'Tailwind CSS', 'Zustand'].map((tech) => (
              <TagBadge key={tech} variant="pill">
                {tech}
              </TagBadge>
            ))}
          </div>
        </div>

        <div className="mt-auto flex items-center gap-4">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-600"
          >
            <i className="ri-external-link-line"></i> Live Demo
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full border border-stone-200 px-5 py-2.5 text-sm font-medium text-stone-600 transition-colors hover:border-stone-300 hover:text-stone-900"
          >
            <i className="ri-github-fill"></i> Source
          </a>
        </div>
      </div>

      <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden border-l border-stone-200 bg-stone-100 p-8 lg:p-12">
        <div className="w-full max-w-sm transform overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition-transform duration-500 group-hover:scale-105">
          <div className="flex h-10 items-center gap-4 border-b border-stone-100 px-4">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-stone-200"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-stone-200"></div>
            </div>
            <div className="h-4 w-32 rounded bg-stone-100"></div>
          </div>
          <div className="grid grid-cols-3 gap-4 p-4">
            <div className="flex h-48 flex-col gap-2 rounded-lg border border-stone-100 bg-stone-50 p-3">
              <div className="mb-2 h-3 w-16 rounded bg-stone-200"></div>
              <div className="h-16 rounded border border-stone-200 bg-white shadow-sm"></div>
              <div className="h-16 rounded border border-stone-200 bg-white shadow-sm"></div>
            </div>
            <div className="flex h-48 flex-col gap-2 rounded-lg border border-stone-100 bg-stone-50 p-3">
              <div className="mb-2 h-3 w-20 rounded bg-stone-200"></div>
              <div className="h-16 rounded border border-stone-200 bg-white shadow-sm"></div>
            </div>
            <div className="flex h-48 flex-col gap-2 rounded-lg border border-stone-100 bg-stone-50 p-3">
              <div className="mb-2 h-3 w-12 rounded bg-stone-200"></div>
              <div className="h-16 rounded border border-stone-200 bg-white opacity-50 shadow-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const EcommerceProject = () => (
  <div className="group col-span-1 flex flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
    <div className="relative flex h-64 items-center justify-center overflow-hidden border-b border-stone-200 bg-stone-100 p-8">
      <div className="flex w-full max-w-xs transform flex-col gap-4 rounded-xl border border-stone-200 bg-white p-4 shadow-sm transition-transform duration-500 group-hover:scale-105">
        <div className="h-32 w-full rounded-lg bg-stone-100"></div>
        <div className="flex items-center justify-between">
          <div className="h-4 w-24 rounded bg-stone-200"></div>
          <div className="h-6 w-12 rounded-full bg-teal-100"></div>
        </div>
      </div>
    </div>
    <div className="flex flex-1 flex-col p-8">
      <h3 className="mb-3 text-xl font-bold text-stone-900">
        Lumina E-commerce
      </h3>
      <p className="mb-6 flex-1 text-stone-600">
        A headless e-commerce storefront with a custom design system. Features
        complex cart state management, simulated checkout flows, and dynamic
        product filtering.
      </p>

      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {['Next.js', 'Framer Motion', 'Stripe API'].map((tech) => (
            <TagBadge key={tech} variant="border">
              {tech}
            </TagBadge>
          ))}
        </div>
      </div>

      <div className="mt-auto flex items-center gap-4 border-t border-stone-100 pt-6">
        <a
          href="#"
          className="flex items-center gap-1 text-sm font-medium text-stone-900 transition-colors hover:text-teal-600"
        >
          <i className="ri-external-link-line"></i> View Demo
        </a>
        <div className="h-1 w-1 rounded-full bg-stone-300"></div>
        <a
          href="#"
          className="flex items-center gap-1 text-sm text-stone-500 transition-colors hover:text-stone-900"
        >
          <i className="ri-github-fill"></i> Source Code
        </a>
      </div>
    </div>
  </div>
)

const DashboardProject = () => (
  <div className="group col-span-1 flex flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
    <div className="relative flex h-64 items-center justify-center overflow-hidden border-b border-stone-800 bg-stone-900 p-8">
      <div className="flex w-full max-w-xs transform flex-col gap-3 rounded-xl border border-stone-700 bg-stone-800 p-4 shadow-lg transition-transform duration-500 group-hover:scale-105">
        <div className="flex gap-2">
          <div className="h-16 flex-1 rounded-lg bg-stone-700"></div>
          <div
            className="h-16 flex-1 rounded-lg"
            style={{
              background: 'rgba(20, 184, 166, 0.1)',
              border: '1px solid rgba(20, 184, 166, 0.2)',
            }}
          ></div>
        </div>
        <div className="relative h-24 w-full overflow-hidden rounded-lg bg-stone-700">
          <div className="absolute right-0 bottom-0 left-0 h-1/2 bg-gradient-to-t from-stone-800 to-transparent"></div>
        </div>
      </div>
    </div>
    <div className="flex flex-1 flex-col p-8">
      <h3 className="mb-3 text-xl font-bold text-stone-900">
        DevMetrics Dashboard
      </h3>
      <p className="mb-6 flex-1 text-stone-600">
        An analytics dashboard tracking developer productivity metrics.
        Implements complex data visualization charts, dark mode support, and
        RESTful API integration.
      </p>

      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {['React', 'Chart.js', 'Node.js'].map((tech) => (
            <TagBadge key={tech} variant="border">
              {tech}
            </TagBadge>
          ))}
        </div>
      </div>

      <div className="mt-auto flex items-center gap-4 border-t border-stone-100 pt-6">
        <a
          href="#"
          className="flex items-center gap-1 text-sm font-medium text-stone-900 transition-colors hover:text-teal-600"
        >
          <i className="ri-external-link-line"></i> View Demo
        </a>
        <div className="h-1 w-1 rounded-full bg-stone-300"></div>
        <a
          href="#"
          className="flex items-center gap-1 text-sm text-stone-500 transition-colors hover:text-stone-900"
        >
          <i className="ri-github-fill"></i> Source Code
        </a>
      </div>
    </div>
  </div>
)

const ProjectsSection = () => (
  <section id="projects" className="bg-stone-50 py-24">
    <div className="mx-auto max-w-7xl px-6 md:px-12">
      <div className="mb-16 flex items-end justify-between">
        <div>
          <span className="mb-4 block font-mono text-sm tracking-wider text-stone-500 uppercase">
            02 // Work
          </span>
          <h2 className="text-3xl font-bold text-stone-900 md:text-4xl">
            Featured Projects
          </h2>
        </div>
        <a
          href="https://github.com/FraneKuzmanic"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 font-medium text-stone-600 transition-colors hover:text-stone-900 md:flex"
        >
          View GitHub <i className="ri-arrow-right-line"></i>
        </a>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <FeaturedProject />
        <EcommerceProject />
        <DashboardProject />
      </div>

      <div className="mt-12 text-center md:hidden">
        <a
          href="https://github.com/FraneKuzmanic"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-medium text-stone-600 transition-colors hover:text-stone-900"
        >
          View all projects on GitHub <i className="ri-arrow-right-line"></i>
        </a>
      </div>
    </div>
  </section>
)

type SkillCardProps = {
  icon: string
  title: string
  skills: string[]
}

const SkillCard = ({ icon, title, skills }: SkillCardProps) => (
  <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6 transition-colors hover:border-stone-300">
    <div className="mb-6 flex items-center gap-3">
      <i className={`${icon} text-xl text-teal-600`}></i>
      <h3 className="font-bold text-stone-900">{title}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span
          key={skill}
          className="rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-sm font-medium text-stone-700 shadow-sm"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
)

const SkillsSection = () => {
  const skillGroups = [
    {
      icon: 'ri-window-line',
      title: 'Frontend',
      skills: ['React', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3'],
    },
    {
      icon: 'ri-palette-line',
      title: 'Styling & UI',
      skills: [
        'Tailwind CSS',
        'Responsive Design',
        'Accessibility (a11y)',
        'Design Systems',
        'CSS Modules',
      ],
    },
    {
      icon: 'ri-smartphone-line',
      title: 'Mobile',
      skills: ['React Native', 'Expo', 'Mobile UI/UX'],
    },
    {
      icon: 'ri-server-line',
      title: 'Backend Basics',
      skills: ['Node.js', 'REST APIs', 'Express', 'SQL Basics'],
    },
    {
      icon: 'ri-tools-line',
      title: 'Tools',
      skills: ['Git & GitHub', 'VS Code', 'Figma', 'Webpack/Vite'],
    },
    {
      icon: 'ri-rocket-line',
      title: 'Other',
      skills: ['C#', 'Python', 'OpenCL', 'Performance Optimization'],
    },
  ]

  return (
    <section id="skills" className="border-y border-stone-200 bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 block font-mono text-sm tracking-wider text-stone-500 uppercase">
            03 // Expertise
          </span>
          <h2 className="mb-4 text-3xl font-bold text-stone-900 md:text-4xl">
            Skills &amp; Technologies
          </h2>
          <p className="text-stone-600">
            The tools and technologies I use to build scalable, accessible, and
            performant applications.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <SkillCard key={group.title} {...group} />
          ))}
        </div>
      </div>
    </section>
  )
}

type TimelineItemProps = {
  title: string
  period: string
  organization: string
  description: string
  tags?: string[]
  isActive: boolean
}

const TimelineItem = ({
  title,
  period,
  organization,
  description,
  tags,
  isActive,
}: TimelineItemProps) => (
  <div className="relative pl-8 md:pl-10">
    <div
      className={`absolute top-1 -left-[13px] h-6 w-6 rounded-full ${
        isActive
          ? 'border-[3px] border-teal-500 bg-white'
          : 'border-2 border-stone-300 bg-stone-100'
      }`}
    ></div>
    <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4">
      <h3 className="text-xl font-bold text-stone-900">{title}</h3>
      <span className="font-mono text-sm text-stone-500">{period}</span>
    </div>
    <h4 className="mb-4 font-medium text-stone-600">{organization}</h4>
    <p className="mb-4 leading-relaxed text-stone-600">{description}</p>
    {tags && (
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded bg-stone-100 px-2 py-1 font-mono text-xs text-stone-600"
          >
            {tag}
          </span>
        ))}
      </div>
    )}
  </div>
)

const ExperienceSection = () => (
  <section id="experience" className="bg-stone-50 py-24">
    <div className="mx-auto max-w-3xl px-6 md:px-12">
      <div className="mb-16">
        <span className="mb-4 block font-mono text-sm tracking-wider text-stone-500 uppercase">
          04 // Background
        </span>
        <h2 className="text-3xl font-bold text-stone-900 md:text-4xl">
          Experience &amp; Education
        </h2>
      </div>

      <div className="relative ml-3 space-y-12 border-l border-stone-200 pb-4 md:ml-4">
        <TimelineItem
          title="Frontend Developer Freelancer"
          period="2023 - Present"
          organization="Self-Employed"
          description="Developing responsive and performant websites for local businesses. Handling full project lifecycle from requirement gathering to design, implementation, and deployment."
          tags={['React', 'Tailwind', 'Figma']}
          isActive={true}
        />
        <TimelineItem
          title="BSc in Computer Science"
          period="2020 - 2024"
          organization="University of Zagreb (Example)"
          description="Focused on software engineering principles, algorithms, and web technologies. Completed major coursework in distributed systems and user interface design. Final project involved building a cross-platform mobile application."
          tags={['C#', 'Python', 'Software Architecture']}
          isActive={false}
        />
        <TimelineItem
          title="Open Source Contributor"
          period="2022 - 2023"
          organization="Various Projects"
          description="Contributed bug fixes and feature enhancements to several React-based open-source UI libraries. Improved documentation and created code examples to help community onboarding."
          isActive={false}
        />
      </div>
    </div>
  </section>
)

const ContactSection = () => (
  <section id="contact" className="relative overflow-hidden bg-stone-900 py-32">
    <div
      className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full opacity-50 blur-3xl"
      style={{ background: 'rgba(19, 78, 74, 0.3)' }}
    ></div>
    <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-80 w-80 rounded-full bg-stone-800 opacity-50 blur-3xl"></div>

    <div className="relative z-10 mx-auto max-w-4xl px-6 text-center md:px-12">
      <h2 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
        Let's build something useful.
      </h2>
      <p className="mx-auto mb-12 max-w-2xl text-xl text-stone-400">
        I am currently available for freelance opportunities, internships, and
        junior developer roles. If you have a project that needs some help or a
        team looking for a frontend developer, I would love to hear from you.
      </p>

      <div className="mb-16 flex flex-col items-center justify-center gap-6 sm:flex-row">
        <a
          href="mailto:frane.kuzmanic9@gmail.com"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-teal-600 px-8 py-4 text-lg font-medium text-white shadow-lg transition-colors hover:bg-teal-500 sm:w-auto"
          style={{ boxShadow: '0 10px 15px -3px rgba(13, 148, 136, 0.2)' }}
        >
          <i className="ri-mail-send-line text-xl"></i> Email me
        </a>
        <a
          href="#"
          className="flex w-full items-center justify-center gap-2 rounded-full border border-stone-700 bg-stone-800 px-8 py-4 text-lg font-medium text-white transition-colors hover:bg-stone-700 sm:w-auto"
        >
          <i className="ri-file-download-line text-xl"></i> Resume
        </a>
      </div>

      <div className="flex items-center justify-center gap-8">
        <a
          href="https://github.com/FraneKuzmanic"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center gap-2"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-stone-700 bg-stone-800 text-stone-300 transition-all group-hover:border-stone-500 group-hover:text-white">
            <i className="ri-github-fill text-2xl"></i>
          </div>
          <span className="text-sm text-stone-400 transition-colors group-hover:text-stone-300">
            GitHub
          </span>
        </a>

        <a
          href="https://www.linkedin.com/in/frane-kuzmanic-682872267/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center gap-2"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-stone-700 bg-stone-800 text-stone-300 transition-all group-hover:border-blue-600 group-hover:text-white">
            <i className="ri-linkedin-fill text-2xl"></i>
          </div>
          <span className="text-sm text-stone-400 transition-colors group-hover:text-stone-300">
            LinkedIn
          </span>
        </a>
      </div>
    </div>
  </section>
)

const Footer = () => (
  <footer className="border-t border-stone-900 bg-stone-950 py-8">
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row md:px-12">
      <div className="flex flex-col items-center gap-2 text-sm text-stone-500 md:flex-row md:gap-6">
        <span className="font-medium text-stone-400">
          Copyright 2024 Frane Kuzmanic
        </span>
        <span className="hidden h-1 w-1 rounded-full bg-stone-700 md:inline"></span>
        <span>Software Developer</span>
      </div>
      <div className="flex items-center gap-2 font-mono text-sm text-stone-600">
        <i className="ri-reactjs-line"></i> Built with React semantics
      </div>
    </div>
  </footer>
)

const App = () => (
  <div className="relative">
    <Header />
    <main>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <ContactSection />
    </main>
    <Footer />
  </div>
)

export default App

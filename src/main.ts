import "./style.css"

type Theme = "light" | "dark"

type Project = {
  title: string
  subtitle: string
  description: string
  stack: string[]
  features: string[]
  liveUrl?: string
  image?: string
}

const THEME_KEY = "theme"

function getSystemTheme(): Theme {
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function getStoredTheme(): Theme | null {
  const t = localStorage.getItem(THEME_KEY)
  return t === "light" || t === "dark" ? t : null
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark")
  document.documentElement.style.colorScheme = theme
}

function initTheme() {
  const stored = getStoredTheme()
  applyTheme(stored ?? getSystemTheme())
}

function toggleTheme() {
  const isDark = document.documentElement.classList.contains("dark")
  const next: Theme = isDark ? "light" : "dark"
  localStorage.setItem(THEME_KEY, next)
  applyTheme(next)
  updateThemeToggleUI()
}

function updateThemeToggleUI() {
  const btn = document.querySelector<HTMLButtonElement>("#theme-toggle")
  if (!btn) return

  const isDark = document.documentElement.classList.contains("dark")
  btn.setAttribute("aria-pressed", String(isDark))
  btn.setAttribute("aria-label", isDark ? "Light Mode aktivieren" : "Dark Mode aktivieren")

  const sun = btn.querySelector<SVGElement>("[data-icon='sun']")
  const moon = btn.querySelector<SVGElement>("[data-icon='moon']")
  if (sun && moon) {
    sun.classList.toggle("hidden", !isDark)
    moon.classList.toggle("hidden", isDark)
  }
}

// Init theme BEFORE render so there is no flash
initTheme()

const projects: Project[] = [
  {
    title: "MTF Academy",
    subtitle: "Moderne E-Learning-Plattform",
    description:
      "Entwicklung einer webbasierten E-Learning-Plattform mit Fokus auf Kursverwaltung, Nutzerbereiche und Zertifikatsgenerierung. Das Projekt kombiniert ein performantes Laravel-Backend mit einem modernen, responsiven Frontend sowie einer klar strukturierten Admin-Oberfläche.",
    stack: ["Laravel", "Blade", "Tailwind CSS", "Alpine.js", "Filament", "MySQL", "Vite", "Nginx"],
    features: ["Kurs- & Fortschrittssystem", "Admin-Panel", "PDF-Zertifikate", "Rollen & Berechtigungen"],
    liveUrl: "https://mtf.academy",
    image: "/projects/mtf-academy.png",
  },
  {
    title: "Elektriker One-Pager",
    subtitle: "Business-Website für Handwerksbetrieb",
    description:
      "Konzeption und Umsetzung einer schnellen, mobil-optimierten One-Page Website mit Leistungsübersicht, Galerie und Kontaktmöglichkeit.",
    stack: ["Vite", "Tailwind CSS", "TypeScript", "Static Hosting"],
    features: ["Leistungen-Section", "Galerie/Referenzen", "Kontakt-CTA", "Mobile-first Layout"],
    image: "/projects/elektriker.png",
  },
]

const App = () => `
  <div class="min-h-screen app-bg">
    ${Navbar()}
    <main class="mx-auto w-full max-w-6xl px-5 pb-20">
      ${Hero()}
      ${Projects()}
      ${Footer()}
    </main>
  </div>
`

const Navbar = () => `
  <header class="sticky top-0 z-50 border-b border-subtle bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur">
    <div class="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4">
      <a href="#top" class="font-semibold tracking-tight">
        mheinen<span class="text-muted">.dev</span>
      </a>

      <nav class="hidden items-center gap-6 text-sm text-muted md:flex">
        <a class="hover:text-zinc-950 dark:hover:text-white" href="#projects">Projekte</a>
        <a class="hover:text-zinc-950 dark:hover:text-white" href="#about">Über mich</a>
        <a class="hover:text-zinc-950 dark:hover:text-white" href="#contact">Kontakt</a>
      </nav>

      <div class="flex items-center gap-2">
        <button
          id="theme-toggle"
          type="button"
          class="btn-ghost"
          aria-label="Dark Mode aktivieren"
          aria-pressed="false"
        >
          <!-- Moon (light -> switch to dark) -->
          <svg data-icon="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-4 w-4">
            <path fill="currentColor" d="M21 14.2A8.1 8.1 0 0 1 9.8 3a7 7 0 1 0 11.2 11.2Z"/>
          </svg>

          <!-- Sun (dark -> switch to light) -->
          <svg data-icon="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="hidden h-4 w-4">
            <path fill="currentColor" d="M12 18a6 6 0 1 1 0-12a6 6 0 0 1 0 12Zm0-16h1v3h-1V2Zm0 17h1v3h-1v-3ZM2 11h3v1H2v-1Zm17 0h3v1h-3v-1ZM4.2 4.2l2.1 2.1-.7.7-2.1-2.1.7-.7Zm14.2 14.2l2.1 2.1-.7.7-2.1-2.1.7-.7ZM19.8 4.2l.7.7-2.1 2.1-.7-.7 2.1-2.1ZM5.6 17.9l.7.7-2.1 2.1-.7-.7 2.1-2.1Z"/>
          </svg>
        </button>

        <a href="#contact" class="btn-ghost">Kontakt</a>
      </div>
    </div>
  </header>
`

const Hero = () => `
  <section id="top" class="pt-14 md:pt-20">
    <div class="grid gap-10 md:grid-cols-12 md:items-center">
      <div class="md:col-span-7">
        <p class="text-sm text-muted">Fachinformatiker AE (i.A.) · Abschluss in ~6 Monaten</p>

        <h1 class="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">
          Hi, ich bin Maik — ich baue moderne Webanwendungen.
        </h1>

        <p class="mt-5 max-w-2xl text-base leading-relaxed text-subtle">
          Fokus auf Laravel, saubere Datenmodelle, performante Frontends und pragmatische Lösungen.
          Hier zeige ich Projekte, an denen ich aktuell arbeite.
        </p>

        <div class="mt-7 flex flex-wrap gap-3">
          <a
            href="#projects"
            class="inline-flex items-center rounded-xl bg-zinc-950 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-900 transition
                   dark:bg-white dark:text-zinc-950 dark:hover:bg-white/90"
          >
            Projekte ansehen
          </a>

          <a href="#contact" class="btn-ghost rounded-xl px-4 py-2 font-medium">Kontakt</a>
        </div>

        <div class="mt-8 flex flex-wrap gap-2 text-xs">
          ${Tag("Laravel")}
          ${Tag("Tailwind")}
          ${Tag("Vite")}
          ${Tag("MySQL")}
          ${Tag("Linux / Nginx")}
        </div>
      </div>

      <div class="md:col-span-5">
        <div class="card shadow-sm">
          <p class="text-sm text-muted">Aktuell</p>
          <p class="mt-2 text-lg font-medium">MTF Academy weiter ausbauen</p>
          <p class="mt-2 text-sm text-subtle">
            Plattform für Kurse, Fortschritt & Zertifikate — mit Admin-Panel und sauberem Deployment.
          </p>
          <a
            class="mt-4 inline-flex items-center text-sm underline underline-offset-4 hover:opacity-80 transition"
            href="https://mtf.academy"
            target="_blank"
            rel="noreferrer"
          >
            mtf.academy öffnen →
          </a>
        </div>
      </div>
    </div>
  </section>
`

const Projects = () => `
  <section id="projects" class="mt-16 md:mt-24">
    <div class="flex items-end justify-between gap-6">
      <div>
        <h2 class="text-2xl font-semibold tracking-tight">Projekte</h2>
        <p class="mt-2 text-sm text-muted">Auswahl aktueller Arbeiten — Fokus auf Praxis & Umsetzung.</p>
      </div>
    </div>

    <div class="mt-8 grid gap-6 md:grid-cols-2">
      ${projects.map(ProjectCard).join("")}
    </div>
  </section>
`

const ProjectCard = (p: Project) => `
  <article class="card group">
  ${p.image ? ProjectImage(p) : ""}
    <div class="flex items-start justify-between gap-4">
      <div>
        <h3 class="text-xl font-semibold tracking-tight">${p.title}</h3>
        <p class="mt-1 text-sm text-muted">${p.subtitle}</p>
      </div>

      ${p.liveUrl && p.liveUrl !== "#"
    ? `<a
              href="${p.liveUrl}"
              target="_blank"
              rel="noreferrer"
              class="btn-ghost shrink-0"
              aria-label="Live öffnen"
            >
              Live →
            </a>`
    : `<span class="shrink-0 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-500 dark:border-white/10 dark:bg-white/5 dark:text-white/50">
              Demo folgt
            </span>`
  }
    </div>

    <p class="mt-4 text-sm leading-relaxed text-subtle">${p.description}</p>

    <div class="mt-5">
      <p class="text-xs font-medium text-muted">Tech-Stack</p>
      <div class="mt-2 flex flex-wrap gap-2">
        ${p.stack.map(Tag).join("")}
      </div>
    </div>

    <div class="mt-5">
      <p class="text-xs font-medium text-muted">Features</p>
      <ul class="mt-2 grid gap-2 text-sm text-subtle">
        ${p.features
    .map(
      (f) =>
        `<li class="flex gap-2"><span class="mt-[2px] text-zinc-400 dark:text-white/40">•</span><span>${f}</span></li>`
    )
    .join("")}
      </ul>
    </div>
  </article>
`

const ProjectImage = (p: Project) => `
  <div class="mb-4 overflow-hidden rounded-xl border border-subtle bg-zinc-100 dark:bg-zinc-900">
    <div class="relative aspect-[16/9]">
      <img
        src="${p.image}"
        alt="${p.title} Preview"
        loading="lazy"
        class="absolute inset-0 h-full w-full object-cover"
        onerror="this.style.display='none'; this.nextElementSibling.style.display='grid';"
      />
      <div
        class="absolute inset-0 hidden place-items-center bg-zinc-100 text-zinc-500 dark:bg-zinc-900 dark:text-white/50"
      >
        <span class="text-sm">Preview folgt</span>
      </div>
    </div>
  </div>
`


const Footer = () => `
  <footer class="mt-20 border-t border-subtle pt-10 text-sm text-muted">
    <section id="about" class="grid gap-8 md:grid-cols-12">
      <div class="md:col-span-6">
        <h2 class="text-lg font-semibold text-zinc-950 dark:text-white">Über mich</h2>
        <p class="mt-3 leading-relaxed text-subtle">
          Ich bin (bald) ausgebildeter Fachinformatiker für Anwendungsentwicklung und entwickle moderne Webanwendungen
          mit Fokus auf saubere Architektur, gute UX und stabile Deployments.
        </p>
      </div>

      <div id="contact" class="md:col-span-6">
        <h2 class="text-lg font-semibold text-zinc-950 dark:text-white">Kontakt</h2>
        <p class="mt-3 text-subtle">
          Schreib mir gerne:
          <a class="underline underline-offset-4 hover:opacity-80 transition" href="mailto:maik@mheinen.dev">
            maik@mheinen.dev
          </a>
        </p>
        <p class="mt-2 text-subtle">
          <a
            class="underline underline-offset-4 hover:opacity-80 transition"
            href="https://github.com/maikjhe"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          ·
          <a
            class="underline underline-offset-4 hover:opacity-80 transition"
            href="https://www.linkedin.com/in/maik-heinen/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </p>
      </div>
    </section>
    <p class="mt-6 text-xs text-muted">
      <a href="/impressum.html" class="underline underline-offset-4">Impressum</a>
      ·
      <a href="/datenschutz.html" class="underline underline-offset-4">Datenschutz</a>
    </p>
    <p class="mt-10 text-xs text-zinc-500 dark:text-white/40">© ${new Date().getFullYear()} mheinen.dev</p>
  </footer>
`

const Tag = (label: string) => `<span class="tag">${label}</span>`

document.querySelector<HTMLDivElement>("#app")!.innerHTML = App()

updateThemeToggleUI()
document.querySelector("#theme-toggle")?.addEventListener("click", toggleTheme)

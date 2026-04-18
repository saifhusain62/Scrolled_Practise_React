import ScrollRotateSection from './components/ScrollCube'
import ScrollRotateSection2 from './components/ScrollCube2'

function App() {
  return (
    <div className="min-h-dvh bg-zinc-950 text-zinc-100">
      <header className="border-b border-white/10">
      <ScrollRotateSection2/>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <a href="#top" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white text-zinc-950 font-semibold">
              A
            </span>
            <span className="text-sm font-semibold tracking-wide">ARVIO</span>
          </a>

          <nav className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
            <a className="hover:text-white" href="#services">
              Services
            </a>
            <a className="hover:text-white" href="#work">
              Work
            </a>
            <a className="hover:text-white" href="#testimonials">
              Testimonials
            </a>
            <a className="hover:text-white" href="#contact">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              className="rounded-xl border border-white/15 px-4 py-2 text-sm text-zinc-100 hover:border-white/30"
              href="#contact"
            >
              Let’s talk
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_circle_at_20%_10%,rgba(99,102,241,0.35),transparent_55%),radial-gradient(800px_circle_at_80%_0%,rgba(236,72,153,0.28),transparent_55%)]" />
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:items-center md:py-24">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                We build brands that convert
              </div>

              <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight md:text-6xl">
                Creative agency for modern digital products.
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-zinc-300 md:text-lg">
                ARVIO helps startups and teams ship beautiful, fast, and
                conversion-focused websites with design, motion, and clean
                engineering.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#work"
                  className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-zinc-100"
                >
                  View projects
                </a>
                <a
                  href="#services"
                  className="rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white hover:border-white/30"
                >
                  Our services
                </a>
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                <div className="rounded-xl bg-black/20 p-3">
                  <div className="text-2xl font-semibold">120+</div>
                  <div className="mt-1 text-xs text-zinc-400">Projects</div>
                </div>
                <div className="rounded-xl bg-black/20 p-3">
                  <div className="text-2xl font-semibold">8y</div>
                  <div className="mt-1 text-xs text-zinc-400">Experience</div>
                </div>
                <div className="rounded-xl bg-black/20 p-3">
                  <div className="text-2xl font-semibold">24/7</div>
                  <div className="mt-1 text-xs text-zinc-400">Support</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6">
                <div className="flex h-full flex-col justify-between rounded-2xl bg-zinc-950/40 p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-medium text-zinc-300">
                      Featured case study
                    </div>
                    <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
                      2026
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold">
                      Minimal ecommerce redesign
                    </div>
                    <p className="mt-2 text-sm text-zinc-300">
                      A premium storefront with frictionless checkout,
                      lightning-fast performance, and polished motion.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2 text-xs text-zinc-300">
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                        UI/UX
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                        Webflow/React
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                        Branding
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 hidden w-52 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur md:block">
                <div className="text-xs text-zinc-400">Avg. lift</div>
                <div className="mt-1 text-3xl font-semibold">+32%</div>
                <div className="mt-1 text-xs text-zinc-400">
                  conversion rate
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  Services
                </h2>
                <p className="mt-3 max-w-2xl text-zinc-300">
                  Everything you need to launch and scale your digital presence.
                </p>
              </div>
              <a
                href="#contact"
                className="w-fit rounded-xl border border-white/15 px-4 py-2 text-sm font-semibold hover:border-white/30"
              >
                Get a quote
              </a>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                {
                  t: 'Brand identity',
                  d: 'Naming, visual identity, and design systems that feel premium and consistent.',
                },
                {
                  t: 'UI/UX design',
                  d: 'Wireframes to polished UI with a focus on clarity, speed, and conversion.',
                },
                {
                  t: 'Development',
                  d: 'High-performance React builds with clean code, accessibility, and SEO.',
                },
              ].map((c) => (
                <div
                  key={c.t}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <div className="text-lg font-semibold">{c.t}</div>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                    {c.d}
                  </p>
                  <div className="mt-6 h-px w-full bg-white/10" />
                  <div className="mt-4 text-xs text-zinc-400">
                    Strategy • Design • Delivery
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ScrollRotateSection />

        <section id="work" className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Selected work
            </h2>
            <p className="mt-3 max-w-2xl text-zinc-300">
              A few recent projects across ecommerce, SaaS, and creative brands.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {[
                {
                  k: 'Aurora Store',
                  s: 'Ecommerce',
                  d: 'Modern product pages with storytelling and fast checkout.',
                },
                {
                  k: 'Pulse Analytics',
                  s: 'SaaS',
                  d: 'A crisp marketing site with clear value props and onboarding flow.',
                },
                {
                  k: 'Studio Nine',
                  s: 'Portfolio',
                  d: 'Bold typography + motion for a creative studio relaunch.',
                },
                {
                  k: 'FinEdge',
                  s: 'Fintech',
                  d: 'Trust-first design system and responsive landing experience.',
                },
              ].map((p) => (
                <article
                  key={p.k}
                  className="group rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm text-zinc-300">{p.s}</div>
                      <div className="mt-1 text-xl font-semibold">{p.k}</div>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
                      Case study
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                    {p.d}
                  </p>
                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-xs text-zinc-400">
                      Web • UI • Motion
                    </div>
                    <div className="text-sm font-semibold text-white/90 group-hover:text-white">
                      View →
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Testimonials
            </h2>
            <p className="mt-3 max-w-2xl text-zinc-300">
              Teams choose ARVIO for speed, polish, and reliable delivery.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                {
                  q: '“They nailed the look-and-feel and shipped ahead of schedule.”',
                  n: 'A. Rahman',
                  r: 'Founder, Aurora',
                },
                {
                  q: '“Design system quality was top-tier. Our site finally feels premium.”',
                  n: 'S. Kim',
                  r: 'Marketing Lead, Pulse',
                },
                {
                  q: '“Performance and accessibility were flawless—big win for SEO.”',
                  n: 'J. Patel',
                  r: 'PM, FinEdge',
                },
              ].map((t) => (
                <figure
                  key={t.n}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <blockquote className="text-sm leading-relaxed text-zinc-200">
                    {t.q}
                  </blockquote>
                  <figcaption className="mt-5 text-xs text-zinc-400">
                    <div className="font-semibold text-zinc-200">{t.n}</div>
                    <div>{t.r}</div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 md:p-12">
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div>
                  <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                    Let’s build your next project
                  </h2>
                  <p className="mt-3 text-zinc-300">
                    Share a few details and we’ll reply with timeline + estimate.
                  </p>
                </div>

                <form
                  className="grid gap-3"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    className="h-11 rounded-xl border border-white/10 bg-black/30 px-4 text-sm outline-none placeholder:text-zinc-500 focus:border-white/25"
                    placeholder="Your name"
                    required
                  />
                  <input
                    className="h-11 rounded-xl border border-white/10 bg-black/30 px-4 text-sm outline-none placeholder:text-zinc-500 focus:border-white/25"
                    placeholder="Email address"
                    type="email"
                    required
                  />
                  <textarea
                    className="min-h-28 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none placeholder:text-zinc-500 focus:border-white/25"
                    placeholder="Tell us about your project…"
                    required
                  />
                  <button className="h-11 rounded-xl bg-white text-sm font-semibold text-zinc-950 hover:bg-zinc-100">
                    Send message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-zinc-400 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} ARVIO Agency</div>
          <div className="flex gap-5">
            <a className="hover:text-zinc-200" href="#top">
              Back to top
            </a>
            <a className="hover:text-zinc-200" href="#services">
              Services
            </a>
            <a className="hover:text-zinc-200" href="#work">
              Work
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

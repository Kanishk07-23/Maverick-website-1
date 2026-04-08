'use client';

const differentiators = [
  {
    id: 'performance',
    icon: '📊',
    title: 'Performance-Driven',
    desc: 'We focus on measurable outcomes, not vanity metrics. Every strategy is designed to deliver real business results.',
    stat: '200%+',
    statLabel: 'avg ROI',
  },
  {
    id: 'data',
    icon: '🧠',
    title: 'Data-Informed Creativity',
    desc: 'We blend creative storytelling with data insights to create campaigns that resonate and convert simultaneously.',
    stat: '15M+',
    statLabel: 'organic views',
  },
  {
    id: 'founder',
    icon: '🤝',
    title: 'Founder-Led Approach',
    desc: 'Our founders are directly involved in every project, ensuring quality and accountability at every step.',
    stat: '100%',
    statLabel: 'founder involvement',
  },
  {
    id: 'e2e',
    icon: '⚡',
    title: 'End-to-End Capability',
    desc: 'From strategy to execution, we handle everything in-house with our lean, high-output team.',
    stat: '40+',
    statLabel: 'brands served',
  },
];

export default function WhyUsSection() {
  return (
    <section className="section-padding relative overflow-hidden" id="why-us"
      style={{ background: 'rgba(15,15,35,0.6)' }}>
      {/* Decorative */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left copy */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-purple-400 glass-card border border-purple-500/20 mb-6">
              Why Maverick
            </span>
            <h2 className="font-grotesk font-bold text-white mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              Lean Team.{' '}
              <span className="gradient-text">Outsized Results.</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              We&apos;re not a bloated agency with account managers who&apos;ve never run a campaign.
              Maverick Digitals is a founder-led, high-output team where every person is a specialist
              with skin in the game.
            </p>

            {/* Mini proof points */}
            <div className="flex flex-col gap-4">
              {[
                'Direct access to founders on every project',
                'No long-term lock-in contracts',
                'Weekly performance reports with real data',
                'Strategies built for your specific industry',
              ].map((point) => (
                <div key={point} className="flex items-start gap-3 text-white/70 text-sm">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(124,58,237,0.2)' }}>
                    <span className="text-purple-400 text-xs">✓</span>
                  </span>
                  {point}
                </div>
              ))}
            </div>
          </div>

          {/* Right grid */}
          <div className="grid grid-cols-2 gap-4">
            {differentiators.map((d) => (
              <div
                key={d.id}
                id={`why-${d.id}`}
                className="glass-card rounded-2xl p-6 border border-white/8 hover:border-purple-500/30 transition-all duration-300 hover:scale-[1.03] group"
              >
                <div className="text-3xl mb-4">{d.icon}</div>
                <div className="font-grotesk font-bold gradient-text text-2xl mb-0.5">{d.stat}</div>
                <div className="text-white/40 text-xs mb-3">{d.statLabel}</div>
                <h3 className="text-white font-semibold text-base mb-2">{d.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

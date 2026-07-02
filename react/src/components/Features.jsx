const features = [
  { icon: '⚡', title: 'Instant onboarding', body: 'Go live in a day with drop-in components and clear docs — no lengthy integration cycles.' },
  { icon: '🔒', title: 'Secure by default', body: 'PCI-ready flows, granular access controls, and audit logs built into every transaction.' },
  { icon: '📊', title: 'Real-time insight', body: 'Track settlements, fees, and payouts live from a single, exportable dashboard.' },
];

export default function Features() {
  return (
    <section id="features" className="py-s5">
      <div className="max-w-[1120px] mx-auto px-s3">
        <div className="text-center mb-s4">
          <h2 className="text-4xl font-bold mb-s1">Built for speed and trust</h2>
          <p className="text-3xl font-normal text-text-secondary">
            Everything decision-makers and teams need to ship payments.
          </p>
        </div>
        <div className="grid gap-s3 md:grid-cols-3">
          {features.map((f) => (
            <article
              key={f.title}
              className="bg-surface-raised border border-border rounded-[10px] p-s3
                         transition-all duration-instant hover:border-surface-muted hover:-translate-y-1"
            >
              <div className="w-11 h-11 rounded-xs bg-surface-muted text-on-accent grid place-items-center text-[22px] mb-s2" aria-hidden="true">
                {f.icon}
              </div>
              <h3 className="text-3xl mb-2">{f.title}</h3>
              <p className="text-lg font-normal text-text-secondary">{f.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
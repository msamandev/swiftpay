const testimonials = [
  { initials: 'MA', quote: 'We went live in a single afternoon. The docs and drop-in components saved us weeks of work.', name: 'Maya Adebayo', role: 'CTO, Ledgerly' },
  { initials: 'JT', quote: 'Reconciliation used to take a full day. Now it’s real-time and I trust every number.', name: 'Jonas Thorne', role: 'Head of Finance, Brightcart' },
  { initials: 'RK', quote: 'Support is fast and the platform just works. SwiftPay is core infrastructure for us now.', name: 'Rina Kapoor', role: 'COO, Northwind' },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-s5">
      <div className="max-w-[1120px] mx-auto px-s3">
        <div className="text-center mb-s4">
          <h2 className="text-4xl font-bold mb-s1">Trusted by teams that ship</h2>
          <p className="text-3xl font-normal text-text-secondary">What decision-makers say about SwiftPay.</p>
        </div>
        <div className="grid gap-s3 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="flex flex-col gap-s2 bg-surface-raised border border-border rounded-xl p-s3">
              <div className="text-surface-muted text-lg tracking-[2px]" aria-label="Rated 5 out of 5">★★★★★</div>
              <blockquote className="text-xl font-normal leading-relaxed text-text-primary m-0">
                “{t.quote}”
              </blockquote>
              <figcaption className="flex items-center gap-s1 mt-auto">
                <span aria-hidden="true" className="w-10 h-10 rounded-full bg-surface-muted text-on-accent grid place-items-center font-bold text-lg shrink-0">
                  {t.initials}
                </span>
                <span className="text-md font-semibold">
                  {t.name}
                  <span className="block text-sm font-normal text-text-secondary">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
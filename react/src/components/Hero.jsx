import Button from './Button';

export default function Hero() {
  return (
    <section className="py-s5">
      <div className="max-w-[1120px] mx-auto px-s3 grid gap-s4 items-center md:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="text-accent text-md tracking-widest uppercase mb-s1">Payments infrastructure</p>
          <h1 className="font-bold leading-[1.05] mb-s3 text-[clamp(32px,6vw,56px)]">
            Payments, done <em className="not-italic text-surface-muted">Swiftly</em>.
          </h1>
          <p className="text-3xl font-normal text-text-secondary mb-s3 max-w-[44ch]">
            Accept, send, and reconcile payments in minutes. One API, one dashboard, zero friction for your team.
          </p>
          <div className="flex gap-s1 flex-wrap">
            <Button as="a" href="#get-started" variant="primary">Start free</Button>
            <Button as="a" href="#demo" variant="secondary">Book a demo</Button>
          </div>
        </div>

        <div
          role="img"
          aria-label="SwiftPay dashboard preview showing a payment summary"
          className="bg-surface-raised border border-border rounded-xl p-s3 aspect-[4/3]"
        >
          <div className="h-2.5 w-2/5 rounded-pill bg-surface-muted mb-s2" />
          <div className="h-2.5 w-[70%] rounded-pill bg-border mb-s2" />
          <div className="text-4xl text-surface-muted my-s3">$48,209.00</div>
          {[['Incoming', '+ $12,400'], ['Payouts', '- $3,120'], ['Settled', '98.4%']].map(([k, v]) => (
            <div key={k} className="flex justify-between py-s1 border-t border-border text-md font-normal text-text-secondary">
              <span>{k}</span><span>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
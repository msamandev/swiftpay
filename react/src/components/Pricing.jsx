import { useState } from 'react';
import Button from './Button';

const plans = [
  {
    name: 'Starter',
    desc: 'For small teams testing the waters.',
    price: { monthly: 0, yearly: 0 },          // numeric for math
    display: { monthly: '$0', yearly: '$0' },
    period: '/mo',
    cta: { label: 'Start free', href: '#signup', variant: 'secondary' },
    features: [
      { text: 'Up to $10k processed / mo', on: true },
      { text: 'Standard payouts', on: true },
      { text: 'Email support', on: true },
      { text: 'Custom reporting', on: false },
      { text: 'Dedicated manager', on: false },
    ],
  },
  {
    name: 'Growth',
    featured: true,
    desc: 'For scaling businesses that need more.',
    price: { monthly: 49, yearly: 39 },
    display: { monthly: '$49', yearly: '$39' },
    period: '/mo',
    cta: { label: 'Choose Growth', href: '#signup', variant: 'primary' },
    features: [
      { text: 'Up to $250k processed / mo', on: true },
      { text: 'Instant payouts', on: true },
      { text: 'Priority support', on: true },
      { text: 'Custom reporting', on: true },
      { text: 'Dedicated manager', on: false },
    ],
  },
  {
    name: 'Enterprise',
    desc: 'For high-volume, custom requirements.',
    price: { monthly: null, yearly: null },     // null = custom
    display: { monthly: 'Custom', yearly: 'Custom' },
    period: '',
    cta: { label: 'Contact sales', href: '#contact', variant: 'secondary' },
    features: [
      { text: 'Unlimited volume', on: true },
      { text: 'Instant payouts', on: true },
      { text: '24/7 phone support', on: true },
      { text: 'Custom reporting', on: true },
      { text: 'Dedicated manager', on: true },
    ],
  },
];

/** Returns the dynamic sub-line under the price, or null if none applies. */
function billingNote(plan, billing) {
  if (plan.price.monthly == null) return 'Tailored to your volume'; // Enterprise
  if (plan.price.monthly === 0) return 'Free forever — no card required'; // Starter
  if (billing === 'yearly') {
    const yearlyTotal = plan.price.yearly * 12;
    const saved = (plan.price.monthly - plan.price.yearly) * 12;
    return `Billed $${yearlyTotal}/yr — save $${saved}`;
  }
  return 'Billed monthly — switch to yearly to save 20%';
}

export default function Pricing() {
  const [billing, setBilling] = useState('monthly');

  return (
    <section id="pricing" className="py-s5">
      <div className="max-w-[1120px] mx-auto px-s3">
        <div className="text-center mb-s4">
          <h2 className="text-4xl font-bold mb-s1">Simple, transparent pricing</h2>
          <p className="text-3xl font-normal text-text-secondary">Choose a plan that scales with your volume.</p>
        </div>

        {/* Billing toggle */}
        <div className="flex justify-center mb-s4">
          <div role="group" aria-label="Billing period" className="inline-flex gap-1 p-1 bg-surface-raised border border-border rounded-pill">
            {[['monthly', 'Monthly'], ['yearly', 'Yearly · Save 20%']].map(([key, label]) => (
              <button
                key={key}
                type="button"
                aria-pressed={billing === key}
                onClick={() => setBilling(key)}
                className={`min-h-[40px] px-s3 py-2 rounded-pill text-md font-semibold transition-all duration-instant
                  ${billing === key ? 'bg-surface-muted text-on-accent' : 'bg-transparent text-text-secondary'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div className="grid gap-s3 items-stretch md:grid-cols-3">
          {plans.map((p) => (
            <article
              key={p.name}
              aria-label={p.featured ? `${p.name} plan, most popular` : `${p.name} plan`}
              className={`relative flex flex-col bg-surface-raised border rounded-xl p-s3
                transition-all duration-instant hover:-translate-y-1 hover:border-surface-muted
                ${p.featured ? 'border-surface-muted' : 'border-border'}`}
            >
              {p.featured && (
                <span className="absolute -top-s3 left-1/2 -translate-x-1/2 bg-surface-muted text-on-accent
                                 text-xs font-bold tracking-widest uppercase px-s1 py-1.5 rounded-pill">
                  Most popular
                </span>
              )}
              <h3 className="text-3xl mb-1">{p.name}</h3>
              <p className="text-md font-normal text-text-secondary mb-s3 min-h-[2.6em]">{p.desc}</p>

              <p className="flex items-baseline gap-1.5 mb-1">
                <span className="text-[40px] font-bold text-surface-muted">{p.display[billing]}</span>
                {p.period && <span className="text-md font-normal text-text-secondary">{p.period}</span>}
              </p>

              {/* Dynamic billing note — aria-live so screen readers hear the change */}
              <p aria-live="polite" className="text-sm font-normal text-text-secondary mb-s3 min-h-[1.4em]">
                {billingNote(p, billing)}
              </p>

              <ul className="list-none flex-1 mb-s3">
                {p.features.map((f) => (
                  <li
                    key={f.text}
                    className={`flex gap-2.5 items-start py-2 text-lg font-normal border-t border-border
                      ${f.on ? 'text-text-primary' : 'text-text-secondary'}`}
                  >
                    <span aria-hidden="true" className={f.on ? 'text-surface-muted font-bold' : 'text-text-secondary'}>
                      {f.on ? '✓' : '–'}
                    </span>
                    {f.text}
                  </li>
                ))}
              </ul>

              <Button as="a" href={p.cta.href} variant={p.cta.variant} className="w-full">
                {p.cta.label}
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
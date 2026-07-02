export default function Footer() {
  const cols = [
    { h: 'Product', links: [['#features', 'Features'], ['#pricing', 'Pricing']] },
    { h: 'Company', links: [['#about', 'About'], ['#contact', 'Contact']] },
  ];
  return (
    <footer className="border-t border-border py-s4 mt-s5">
      <div className="max-w-[1120px] mx-auto px-s3 flex justify-between flex-wrap gap-s3">
        <div>
          <a href="/" className="text-4xl font-bold no-underline text-text-primary">
            Swift<span className="text-surface-muted">Pay</span>
          </a>
          <p className="font-normal text-md text-text-secondary mt-s1 max-w-[28ch]">
            Fast, reliable payments for modern teams.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.h}>
            <h4 className="text-md uppercase tracking-widest text-text-secondary mb-s1">{c.h}</h4>
            {c.links.map(([href, label]) => (
              <a key={href} href={href} className="block py-1.5 text-lg font-normal text-text-secondary no-underline hover:text-surface-muted">
                {label}
              </a>
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
}
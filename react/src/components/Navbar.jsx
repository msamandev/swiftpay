import { useState, useRef, useEffect } from 'react';
import Button from './Button';

const links = [
  { href: '#features', label: 'Product' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#docs', label: 'Docs' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape' && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-black/85 border-b border-border">
      <div className="max-w-[1120px] mx-auto px-s3 h-16 flex items-center justify-between">
        <a href="/" className="text-4xl font-bold no-underline text-text-primary">
          Swift<span className="text-surface-muted">Pay</span>
        </a>

        <nav aria-label="Primary">
          <button
            ref={toggleRef}
            className="md:hidden border border-border text-white rounded-xs px-3 py-2"
            aria-expanded={open}
            aria-controls="navmenu"
            onClick={() => setOpen((o) => !o)}
          >
            Menu
          </button>

          <ul
            id="navmenu"
            className={`items-center gap-s3 list-none ${
              open
                ? 'flex flex-col absolute top-16 left-0 right-0 bg-surface-base p-s3 border-b border-border'
                : 'hidden md:flex'
            }`}
          >
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-lg text-text-primary no-underline py-2 px-1 border-b-2 border-transparent
                             hover:text-surface-muted hover:border-surface-muted transition-colors duration-instant"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <Button as="a" href="#get-started" variant="primary">Get Started</Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
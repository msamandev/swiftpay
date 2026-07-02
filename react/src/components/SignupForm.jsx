import { useState, useRef } from 'react';
import Button from './Button';

const initial = { name: '', email: '', company: '', message: '' };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Enter your full name.';
  if (!values.email.trim()) errors.email = 'Enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Enter a valid email address.';
  if (!values.message.trim()) errors.message = 'Tell us how we can help.';
  return errors;
}

export default function SignupForm() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [formError, setFormError] = useState('');
  const firstErrorRef = useRef(null);

  const update = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError('');
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      // Move focus to the first invalid field (testable a11y behavior)
      const firstField = Object.keys(nextErrors)[0];
      document.getElementById(`field-${firstField}`)?.focus();
      return;
    }

    try {
      setStatus('loading');
      // Simulated request — replace with real API call
      await new Promise((res, rej) => setTimeout(() => (Math.random() > 0.15 ? res() : rej()), 1200));
      setStatus('success');
      setValues(initial);
    } catch {
      setStatus('error');
      setFormError('Something went wrong. Please try again in a moment.');
    }
  }

  const isLoading = status === 'loading';

  const fieldBase =
    'w-full min-h-[44px] bg-surface-base border rounded-xs px-s1 py-s1 text-lg font-normal ' +
    'text-text-primary placeholder:text-text-secondary transition-colors duration-instant ' +
    'focus:outline-none focus:border-surface-muted disabled:opacity-45 disabled:cursor-not-allowed';

  const fieldCls = (field) =>
    `${fieldBase} ${errors[field] ? 'border-error' : 'border-border'}`;

  return (
    <section id="signup" className="py-s5">
      <div className="max-w-[560px] mx-auto px-s3">
        <div className="text-center mb-s4">
          <h2 className="text-4xl font-bold mb-s1">Talk to our team</h2>
          <p className="text-3xl font-normal text-text-secondary">
            Tell us about your volume and we’ll get you set up.
          </p>
        </div>

        {/* Success state */}
        {status === 'success' ? (
          <div
            role="status"
            className="bg-surface-raised border border-surface-muted rounded-xl p-s4 text-center"
          >
            <div className="text-4xl text-surface-muted mb-s1" aria-hidden="true">✓</div>
            <h3 className="text-3xl mb-s1">Thanks — we got it.</h3>
            <p className="font-normal text-text-secondary mb-s3">
              A SwiftPay specialist will reach out within one business day.
            </p>
            <Button variant="secondary" onClick={() => setStatus('idle')}>Send another</Button>
          </div>
        ) : (
          <form
            noValidate
            onSubmit={handleSubmit}
            className="bg-surface-raised border border-border rounded-xl p-s3 flex flex-col gap-s3"
          >
            {/* Form-level error (live region) */}
            {formError && (
              <div
                role="alert"
                className="border border-error text-error rounded-xs px-s1 py-s1 text-lg font-normal"
              >
                {formError}
              </div>
            )}

            <Field id="name" label="Full name" value={values.name} onChange={update('name')}
                   error={errors.name} disabled={isLoading} className={fieldCls('name')} autoComplete="name" />

            <Field id="email" label="Work email" type="email" value={values.email} onChange={update('email')}
                   error={errors.email} disabled={isLoading} className={fieldCls('email')} autoComplete="email" />

            <Field id="company" label="Company (optional)" value={values.company} onChange={update('company')}
                   disabled={isLoading} className={fieldCls('company')} autoComplete="organization" optional />

            {/* Textarea */}
            <div className="flex flex-col gap-2">
              <label htmlFor="field-message" className="text-md font-semibold">How can we help?</label>
              <textarea
                id="field-message"
                rows={4}
                value={values.message}
                onChange={update('message')}
                disabled={isLoading}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'err-message' : undefined}
                className={`${fieldCls('message')} resize-y`}
                placeholder="Tell us about your monthly volume and use case…"
              />
              {errors.message && (
                <p id="err-message" className="text-sm font-normal text-error">{errors.message}</p>
              )}
            </div>

            <Button type="submit" variant="primary" loading={isLoading} disabled={isLoading} className="w-full">
              {isLoading ? 'Sending…' : 'Request access'}
            </Button>

            <p className="text-sm font-normal text-text-secondary text-center">
              By submitting you agree to our terms. No spam — ever.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

/* Reusable text field */
function Field({ id, label, error, className, optional, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={`field-${id}`} className="text-md font-semibold">{label}</label>
      <input
        id={`field-${id}`}
        aria-invalid={!!error}
        aria-describedby={error ? `err-${id}` : undefined}
        aria-required={!optional || undefined}
        className={className}
        {...props}
      />
      {error && <p id={`err-${id}`} className="text-sm font-normal text-error">{error}</p>}
    </div>
  );
}
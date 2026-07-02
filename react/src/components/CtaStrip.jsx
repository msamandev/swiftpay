import Button from './Button';

export default function CtaStrip() {
  return (
    <section id="get-started" className="py-s5">
      <div className="max-w-[1120px] mx-auto px-s3">
        <div className="bg-surface-raised border border-border rounded-2xl p-s4 text-center">
          <h2 className="text-4xl mb-s1">Start accepting payments today</h2>
          <p className="font-normal text-text-secondary mb-s3">
            No setup fees. Cancel anytime. Talk to our team about volume pricing.
          </p>
          <div className="flex gap-s1 flex-wrap justify-center">
            <Button as="a" href="#signup" variant="primary">Create account</Button>
            <Button as="a" href="#pricing" variant="secondary">See pricing</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
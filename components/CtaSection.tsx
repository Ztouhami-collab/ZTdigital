import ContactForm from "./ContactForm";

export default function CtaSection() {
  return (
    <section id="contact" className="relative bg-white px-6 py-28">
      <div className="hero-glow pointer-events-none absolute inset-0" />
      <div className="relative">
        <ContactForm />
        <p className="mx-auto mt-5 max-w-[460px] text-center text-[13.5px] text-ink-faint">
          Geen verplichtingen · Gratis adviesgesprek · Reactie binnen 24 uur
        </p>
      </div>
    </section>
  );
}

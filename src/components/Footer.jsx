function ExternalIcon() {
  return (
    <svg
      className="h-3.5 w-3.5 shrink-0 opacity-45"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 17L17 7M7 7h10v10"
      />
    </svg>
  );
}

function FooterLink({ href, children, external = false }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-1.5 text-sm text-neutral-600 transition-colors hover:text-neutral-900"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span>{children}</span>
      {external && <ExternalIcon />}
    </a>
  );
}

function LinkColumn({ title, links }) {
  return (
    <div>
      {title && (
        <p className="mb-4 text-sm font-semibold text-neutral-900">{title}</p>
      )}
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <FooterLink href={link.href} external={link.external}>
              {link.label}
            </FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

const companyLinks = [
  { label: "Book a Call", href: "#content", external: true },
  { label: "Client Results", href: "#content" },
  { label: "About Constellation", href: "#content" },
];

const practiceLinks = [
  { label: "Personal Injury", href: "#content" },
  { label: "Immigration", href: "#content" },
  { label: "Family Law", href: "#content" },
  { label: "Criminal Defense", href: "#content" },
];

const serviceLinks = [
  { label: "SEO for Law Firms", href: "#content" },
  { label: "Google Ads (PPC)", href: "#content" },
  { label: "Website Design", href: "#content" },
  { label: "Content Marketing", href: "#content" },
];

const resourceLinks = [
  { label: "Blog", href: "#content" },
  { label: "Case Studies", href: "#content" },
  { label: "Marketing Guides", href: "#content" },
  { label: "LinkedIn", href: "https://linkedin.com", external: true },
];

export default function Footer() {
  return (
    <footer className="bg-white text-neutral-900">
      <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-14">
        {/* Link columns */}
        <div className="grid grid-cols-2 gap-10 border-b border-neutral-200 py-14 sm:grid-cols-4 sm:gap-8 md:py-16">
          <LinkColumn title="Company" links={companyLinks} />
          <LinkColumn links={practiceLinks} />
          <LinkColumn links={serviceLinks} />
          <LinkColumn links={resourceLinks} />
        </div>

        {/* Disclaimer */}
        <div className="grid gap-8 border-b border-neutral-200 py-10 md:grid-cols-2 md:gap-12 md:py-12">
          <p className="text-xs leading-relaxed text-neutral-500">
            Constellation Marketing provides digital marketing services tailored
            for law firms. Past performance and case results referenced on this
            site belong to our clients and do not guarantee similar outcomes for
            your practice.
          </p>
          <p className="text-xs leading-relaxed text-neutral-500">
            Nothing on this website constitutes legal advice. Attorney advertising
            rules vary by jurisdiction—consult your state bar before publishing
            campaign claims. All trademarks belong to their respective owners.
          </p>
        </div>
      </div>

      {/* Text logo — full viewport width for centered alignment */}
      <div className="py-10 md:py-14">
        <div className="flex w-full justify-center overflow-hidden px-4">
          <p
            className="w-full max-w-[100vw] text-center text-[clamp(2.5rem,11.5vw,9.5rem)] font-bold leading-[0.9] tracking-tight text-neutral-950"
            aria-hidden
          >
            CONSTELLATION
          </p>
        </div>
        <span className="sr-only">Constellation Marketing</span>
      </div>

      <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-14">
        {/* Copyright bar */}
        <div className="flex flex-col gap-4 border-t border-neutral-200 py-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between sm:py-8">
          <p>Constellation Marketing © {new Date().getFullYear()}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:justify-center">
            <a href="#content" className="transition-colors hover:text-neutral-800">
              Privacy Policy
            </a>
            <a href="#content" className="transition-colors hover:text-neutral-800">
              Terms of Service
            </a>
          </div>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-neutral-800 sm:justify-end"
          >
            LinkedIn
            <ExternalIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}

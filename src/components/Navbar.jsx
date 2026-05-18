import { useEffect, useRef, useState } from "react";
import { ctaLink, navLinks } from "../data/site-content.js";

const barRadius = "rounded-xl";

const glassBar =
  "border border-white/50 bg-white/65 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur-2xl backdrop-saturate-150";

function Logo() {
  return (
    <a href="/" className="flex shrink-0 items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100/90 ring-1 ring-neutral-200/80">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 text-neutral-800"
          fill="currentColor"
          aria-hidden
        >
          <path d="M12 2l1.4 4.3H18l-3.6 2.6 1.4 4.3L12 10.6 8.2 13.2l1.4-4.3L6 6.3h4.6L12 2zm-6.5 14.2l1.1 3.4 3.4-2.5 3.4 2.5 1.1-3.4 3.4 2.5-1.3-4h-4.2l-3.4-2.5-3.4 2.5H4.8l-1.3 4 3.4-2.5z" />
        </svg>
      </span>
      <span className="text-xs font-bold tracking-wide text-neutral-900">
        CONSTELLATION MARKETING
      </span>
    </a>
  );
}

function ChevronDown({ open = false, className = "" }) {
  return (
    <svg
      className={`h-3.5 w-3.5 opacity-50 transition-transform duration-200 ${open ? "rotate-180" : ""} ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function DesktopNavTrigger({ link, isOpen, onOpen }) {
  const baseClass =
    "inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-white/80 hover:text-neutral-900";

  if (!link.children) {
    return (
      <a href={link.href} className={baseClass}>
        {link.label}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={`${baseClass} gap-1`}
      aria-expanded={isOpen}
      aria-haspopup="true"
      onMouseEnter={() => onOpen(link.label)}
      onFocus={() => onOpen(link.label)}
    >
      {link.label}
      <ChevronDown open={isOpen} />
    </button>
  );
}

function MobileNavItem({ link, isOpen, onToggle, onNavigate }) {
  if (!link.children) {
    return (
      <a
        href={link.href}
        onClick={onNavigate}
        className="flex w-full rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-700 hover:bg-white/80"
      >
        {link.label}
      </a>
    );
  }

  return (
    <div className="overflow-hidden">
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium text-neutral-700 hover:bg-white/80"
        aria-expanded={isOpen}
        onClick={() => onToggle(link.label)}
      >
        {link.label}
        <ChevronDown open={isOpen} />
      </button>
      {isOpen && (
        <div className="mt-0.5 mb-1 ml-3 space-y-0.5 border-l-2 border-brand/20 pl-3">
          {link.children.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={onNavigate}
              className="block rounded-lg px-3 py-2 text-sm text-neutral-600 hover:bg-white/80 hover:text-neutral-900"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function CtaButton({ onClick, className = "" }) {
  return (
    <a
      href={ctaLink.href}
      onClick={onClick}
      target={ctaLink.external ? "_blank" : undefined}
      rel={ctaLink.external ? "noopener noreferrer" : undefined}
      className={`inline-flex shrink-0 items-center justify-center rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition-colors hover:bg-brand-dark ${className}`}
    >
      {ctaLink.label}
    </a>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [visible, setVisible] = useState(true);
  const navRef = useRef(null);
  const closeTimerRef = useRef(null);

  const activeDropdown = navLinks.find((link) => link.label === openDropdown);

  const closeDropdowns = () => {
    setOpenDropdown(null);
    setMobileExpanded(null);
  };

  const closeAll = () => {
    closeDropdowns();
    setMobileOpen(false);
  };

  const openDesktopDropdown = (label) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpenDropdown(label);
  };

  const scheduleCloseDropdown = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setOpenDropdown(null), 120);
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") closeAll();
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const atBottom = entry.isIntersecting;
        setVisible(!atBottom);
        if (atBottom) {
          setOpenDropdown(null);
          setMobileExpanded(null);
          setMobileOpen(false);
        }
      },
      { root: null, threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const toggleMobileSection = (label) => {
    setMobileExpanded((current) => (current === label ? null : label));
  };

  const dropdownOpen = Boolean(activeDropdown?.children);

  return (
    <header
      ref={navRef}
      className={`fixed inset-x-0 top-0 z-50 px-4 pt-4 transition-[transform,opacity] duration-300 ease-out sm:px-6 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-4 opacity-0"
      }`}
    >
      {/* Tablet & desktop — hover dropdown, full nav width */}
      <div
        className="relative mx-auto hidden w-full max-w-5xl md:block"
        onMouseLeave={scheduleCloseDropdown}
        onMouseEnter={() => {
          if (closeTimerRef.current) {
            clearTimeout(closeTimerRef.current);
            closeTimerRef.current = null;
          }
        }}
      >
        <nav
          className={`flex h-14 w-full items-center gap-6 px-4 sm:px-5 ${barRadius} ${glassBar}`}
          aria-label="Main"
        >
          <Logo />
          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <ul className="flex items-center">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <DesktopNavTrigger
                    link={link}
                    isOpen={openDropdown === link.label}
                    onOpen={openDesktopDropdown}
                  />
                </li>
              ))}
            </ul>
            <CtaButton className="ml-2 sm:ml-3" />
          </div>
        </nav>

        {dropdownOpen && (
          <div
            className={`absolute top-full right-0 left-0 z-50 mt-2.5 w-full px-4 py-3 sm:mt-3 sm:px-5 ${barRadius} ${glassBar}`}
            role="menu"
            aria-label={activeDropdown.label}
            onMouseEnter={() => openDesktopDropdown(activeDropdown.label)}
          >
            <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
              {activeDropdown.children.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm text-neutral-700 transition-colors hover:bg-white/80 hover:text-neutral-900"
                  role="menuitem"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Phone */}
      <div className="md:hidden">
        <nav
          className={`flex h-12 w-full items-center justify-between gap-2 px-3 sm:h-14 sm:px-4 ${barRadius} ${glassBar}`}
          aria-label="Main mobile"
        >
          <Logo />
          <button
            type="button"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/80 text-neutral-800 shadow-sm ring-1 ring-black/5"
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {mobileOpen && (
          <div className={`mt-2 p-2 sm:p-3 ${barRadius} ${glassBar}`}>
            <ul className="flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <MobileNavItem
                    link={link}
                    isOpen={mobileExpanded === link.label}
                    onToggle={toggleMobileSection}
                    onNavigate={closeAll}
                  />
                </li>
              ))}
              <li className="pt-2">
                <CtaButton onClick={closeAll} className="w-full justify-center" />
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

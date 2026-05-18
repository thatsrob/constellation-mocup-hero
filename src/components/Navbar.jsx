import { useEffect, useRef, useState } from "react";
import { ctaLink, navLinks } from "../data/site-content.js";

const barRadius = "rounded-2xl";

const glassBar =
  "border border-white/50 bg-white/65 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur-2xl backdrop-saturate-150";

const glassMega =
  "border border-white/55 bg-white/70 shadow-[0_20px_60px_rgba(15,23,42,0.1)] backdrop-blur-2xl backdrop-saturate-150";

function NavIcon({ name, active = false }) {
  const className = `h-4 w-4 ${active ? "text-brand-dark" : "text-neutral-600"}`;
  const icons = {
    document: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    shield: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    estate: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    users: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    globe: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    scale: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m0 0l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    search: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    chart: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    layout: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    info: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    layers: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    pen: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    mic: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
    help: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  return icons[name] ?? icons.info;
}

function Logo() {
  return (
    <a href="/" className="flex shrink-0 items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100/90 ring-1 ring-neutral-200/80">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-neutral-800" fill="currentColor" aria-hidden>
          <path d="M12 2l1.4 4.3H18l-3.6 2.6 1.4 4.3L12 10.6 8.2 13.2l1.4-4.3L6 6.3h4.6L12 2zm-6.5 14.2l1.1 3.4 3.4-2.5 3.4 2.5 1.1-3.4 3.4 2.5-1.3-4h-4.2l-3.4-2.5-3.4 2.5H4.8l-1.3 4 3.4-2.5z" />
        </svg>
      </span>
      <span className="text-xs font-bold tracking-wide text-neutral-900">CONSTELLATION MARKETING</span>
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

function GlassPanelVisual() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute -right-4 top-4 h-28 w-44 rotate-6 rounded-2xl border border-white/70 bg-gradient-to-br from-white/90 to-brand-light/60 shadow-lg backdrop-blur-md" />
      <div className="absolute bottom-6 left-4 h-20 w-32 -rotate-3 rounded-xl border border-white/60 bg-white/50 shadow-md backdrop-blur-md" />
      <div className="absolute right-8 bottom-4 h-16 w-24 rotate-12 rounded-lg border border-brand/20 bg-brand/10 shadow-sm backdrop-blur-sm" />
    </div>
  );
}

function MegaMenuPanel({ item, menu }) {
  const title = item?.panelTitle ?? menu?.title ?? item?.label ?? "";
  const description =
    item?.panelDescription ?? menu?.description ?? item?.description ?? "";

  return (
    <div className="relative flex h-full min-h-[240px] flex-col justify-end overflow-hidden rounded-xl border border-white/50 bg-gradient-to-br from-brand-light/50 via-white/60 to-white/30 p-6">
      <GlassPanelVisual />
      <div className="relative z-10">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-dark/80">
          Constellation
        </p>
        <h3 className="mt-1 text-xl font-bold tracking-tight text-neutral-950">{title}</h3>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-neutral-600">{description}</p>
      </div>
    </div>
  );
}

function MegaMenuDropdown({ link, hoveredIndex, onHoverItem }) {
  const hoveredItem = link.children[hoveredIndex] ?? link.children[0];

  return (
    <div
      className={`absolute top-full right-0 left-0 z-50 mt-2.5 overflow-hidden ${barRadius} ${glassMega}`}
      role="menu"
      aria-label={link.label}
    >
      <div className="grid md:grid-cols-[1fr_minmax(220px,0.9fr)]">
        <div className="p-2">
          {link.children.map((item, index) => {
            const isActive = hoveredIndex === index;

            return (
              <a
                key={item.label}
                href={item.href}
                role="menuitem"
                onMouseEnter={() => onHoverItem(index)}
                onFocus={() => onHoverItem(index)}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className={`flex gap-3 rounded-xl px-3 py-3 transition-colors ${
                  isActive
                    ? "bg-white/90 shadow-sm ring-1 ring-white/80"
                    : "hover:bg-white/60"
                }`}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                    isActive
                      ? "border-brand/25 bg-brand-light/80"
                      : "border-neutral-200/80 bg-neutral-100/70"
                  }`}
                >
                  <NavIcon name={item.icon} active={isActive} />
                </span>
                <span className="min-w-0">
                  <span
                    className={`block text-sm font-semibold ${
                      isActive ? "text-neutral-950" : "text-neutral-800"
                    }`}
                  >
                    {item.label}
                  </span>
                  <span className="mt-0.5 block text-xs leading-snug text-neutral-500">
                    {item.description}
                  </span>
                </span>
              </a>
            );
          })}
        </div>
        <div className="hidden border-l border-white/50 bg-white/30 p-2 md:block">
          <MegaMenuPanel item={hoveredItem} menu={link.menu} />
        </div>
      </div>
    </div>
  );
}

function DesktopNavTrigger({ link, isOpen, onOpen }) {
  const baseClass =
    "inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors";
  const idleClass = "text-neutral-700 hover:bg-white/80 hover:text-neutral-900";
  const openClass = "bg-white/90 text-neutral-950 shadow-sm ring-1 ring-white/70";

  if (!link.children) {
    return (
      <a href={link.href} className={`${baseClass} ${idleClass}`}>
        {link.label}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={`${baseClass} gap-1 ${isOpen ? openClass : idleClass}`}
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
        <div className="mt-1 space-y-0.5 px-1 pb-1">
          {link.children.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={onNavigate}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="flex gap-3 rounded-xl px-3 py-2.5 hover:bg-white/80"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-neutral-200/80 bg-neutral-100/70">
                <NavIcon name={item.icon} />
              </span>
              <span>
                <span className="block text-sm font-medium text-neutral-800">{item.label}</span>
                <span className="block text-xs text-neutral-500">{item.description}</span>
              </span>
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
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [visible, setVisible] = useState(true);
  const navRef = useRef(null);
  const closeTimerRef = useRef(null);

  const activeDropdown = navLinks.find((link) => link.label === openDropdown);

  const closeDropdowns = () => {
    setOpenDropdown(null);
    setMobileExpanded(null);
    setHoveredIndex(0);
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
    setHoveredIndex(0);
  };

  const scheduleCloseDropdown = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setOpenDropdown(null);
      setHoveredIndex(0);
    }, 120);
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
        if (atBottom) closeAll();
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
        visible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0"
      }`}
    >
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
        <nav className={`flex h-14 w-full items-center gap-6 px-4 sm:px-5 ${barRadius} ${glassBar}`} aria-label="Main">
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
          <div onMouseEnter={() => openDesktopDropdown(activeDropdown.label)}>
            <MegaMenuDropdown
              link={activeDropdown}
              hoveredIndex={hoveredIndex}
              onHoverItem={setHoveredIndex}
            />
          </div>
        )}
      </div>

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

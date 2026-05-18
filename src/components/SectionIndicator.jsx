import { useEffect, useRef, useState } from "react";
import { pageSections } from "../data/site-content.js";

export default function SectionIndicator() {
  const [activeId, setActiveId] = useState(pageSections[0].id);
  const [pastHero, setPastHero] = useState(false);
  const [footerInView, setFooterInView] = useState(false);
  const ratiosRef = useRef(new Map());

  const visible = pastHero && !footerInView;

  useEffect(() => {
    const sectionEls = pageSections
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    if (!sectionEls.length) return;

    const hero = document.getElementById("hero");
    let heroObserver;

    if (hero) {
      heroObserver = new IntersectionObserver(
        ([entry]) => {
          // Hidden while hero fills the top of the viewport
          setPastHero(entry.intersectionRatio < 0.45);
        },
        { threshold: [0, 0.25, 0.45, 0.6, 0.85, 1] }
      );
      heroObserver.observe(hero);
    }

    const pickActive = () => {
      let bestId = pageSections[0].id;
      let bestRatio = -1;

      for (const { id } of pageSections) {
        const ratio = ratiosRef.current.get(id) ?? 0;
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      }

      setActiveId(bestId);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratiosRef.current.set(entry.target.id, entry.intersectionRatio);
        });
        pickActive();
      },
      {
        root: null,
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        rootMargin: "-35% 0px -45% 0px",
      }
    );

    sectionEls.forEach((el) => observer.observe(el));

    const footer = document.querySelector("footer");
    let footerObserver;

    if (footer) {
      footerObserver = new IntersectionObserver(
        ([entry]) => setFooterInView(entry.isIntersecting),
        { root: null, threshold: 0, rootMargin: "0px 0px -8% 0px" }
      );
      footerObserver.observe(footer);
    }

    return () => {
      observer.disconnect();
      heroObserver?.disconnect();
      footerObserver?.disconnect();
    };
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Page sections"
      className={`fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 transition-[opacity,transform] duration-300 ease-out xl:block ${
        visible
          ? "translate-x-0 opacity-100"
          : "pointer-events-none -translate-x-3 opacity-0"
      }`}
    >
      <div className="rounded-2xl border border-white/55 bg-white/60 px-2.5 py-4 shadow-[0_12px_40px_rgba(15,23,42,0.1)] backdrop-blur-2xl backdrop-saturate-150">
        <ol className="relative flex flex-col gap-0.5 pl-0.5">
          <span
            className="pointer-events-none absolute bottom-2 left-[0.72rem] top-2 w-px bg-neutral-200/90"
            aria-hidden
          />
          {pageSections.map(({ id, label }) => {
            const isActive = activeId === id;

            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => scrollTo(id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`group relative flex items-center gap-2.5 rounded-xl px-2 py-1.5 text-left transition-colors ${
                    isActive ? "bg-brand-light/80" : "hover:bg-white/70"
                  }`}
                >
                  <span
                    className={`relative z-10 flex h-2.5 w-2.5 shrink-0 rounded-full border-2 border-white transition-all duration-300 ${
                      isActive
                        ? "scale-110 border-brand-light bg-brand shadow-[0_0_0_3px_rgba(79,188,133,0.4)]"
                        : "bg-neutral-300 group-hover:bg-neutral-400"
                    }`}
                    aria-hidden
                  />
                  <span
                    className={`max-w-[5.5rem] truncate text-[11px] font-semibold leading-tight transition-colors ${
                      isActive
                        ? "text-brand-dark"
                        : "text-neutral-500 group-hover:text-neutral-700"
                    }`}
                  >
                    {label}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

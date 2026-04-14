"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function GlobalMotion() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    document.documentElement.classList.add("motion-ready");

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = Array.from(document.querySelectorAll(".reveal"));

    if (reduceMotion) {
      elements.forEach((element) => element.classList.add("in-view"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    requestAnimationFrame(() => {
      elements.forEach((element) => {
        element.classList.remove("in-view");
        observer.observe(element);
      });
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

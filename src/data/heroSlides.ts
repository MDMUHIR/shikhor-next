import { HeroSlide } from "../types";

/**
 * Hero / homepage slider data source.
 *
 * This file is the single source of truth for the homepage banner slides.
 * In the future, this array can be replaced by a fetch call to the admin
 * panel API (e.g. `fetch('/api/hero-slides')`) without changing HomeHero.tsx.
 *
 * Place uploaded banner images in /public/images and reference them below
 * with a root-relative path such as `/images/your-file.jpg`.
 */
export const heroSlides: HeroSlide[] = [
  {
    id: "hero-slide-1",
    image: "/images/heroslider/shikhor academy poster 1.png",
    alt: "Homepage promotional banner",
    link: "/courses",
    isActive: true,
    order: 1,
  },
  {
    id: "hero-slide-2",
    image: "/images/heroslider/shikhor academy poster 2.png",
    alt: "FRPB27 Web All Teachers Science banner",
    courseId: "pcmb-1st-paper-combo-hsc28",
    isActive: true,
    order: 2,
  },
  {
    id: "hero-slide-3",
    image: "/images/heroslider/shikhor academy poster 3.png",
    alt: "Physics 1st Paper Full Course HSC 28 banner",
    courseId: "pcmb-1st-paper-combo-hsc28",
    isActive: true,
    order: 3,
  },
];

export function getActiveHeroSlides(): HeroSlide[] {
  return heroSlides
    .filter((slide) => slide.isActive !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

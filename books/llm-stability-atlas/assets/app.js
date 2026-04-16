document.addEventListener("DOMContentLoaded", () => {
  const current = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll("[data-page]").forEach((link) => {
    if (link.dataset.page === current) {
      link.classList.add("active");
    }
  });

  const tocLinks = Array.from(document.querySelectorAll(".chapter-toc-card a[href^='#']"));
  const sections = tocLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = `#${entry.target.id}`;
        const link = document.querySelector(`.chapter-toc-card a[href='${id}']`);
        if (!link) return;
        if (entry.isIntersecting) {
          document
            .querySelectorAll(".chapter-toc-card a")
            .forEach((item) => item.classList.remove("active"));
          link.classList.add("active");
        }
      });
    },
    { rootMargin: "-18% 0px -62% 0px", threshold: 0.15 }
  );

  sections.forEach((section) => observer.observe(section));
});

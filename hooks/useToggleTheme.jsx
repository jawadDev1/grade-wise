import { useEffect } from "react";

const useToggleTheme = () => {
  useEffect(() => {
    // Theme switch functionality
    const switchTheme = document.querySelector("[data-switch-theme]");
    if (
      localStorage.getItem("appTheme") === "dark" ||
      (!("appTheme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    if (switchTheme) {
      switchTheme.addEventListener("click", (e) => {
        e.preventDefault();
        const doc = document.documentElement;
        if (doc) {
          const currentTheme = localStorage.getItem("appTheme");
          if (currentTheme === "light") {
            doc.classList.add("dark");
            localStorage.setItem("appTheme", "dark");
          } else {
            doc.classList.remove("dark");
            localStorage.setItem("appTheme", "light");
          }
        }
      });
    }

    // Mobile menu toggle functionality
    const toggleMenu = document.querySelector("[data-toggle-nav]");
    const navbar = document.querySelector("[data-navbar]");
    const overlayNav = document.querySelector("[data-nav-overlay]");

    if (toggleMenu) {
      toggleMenu.addEventListener("click", (e) => {
        e.preventDefault();
        if (toggleMenu.getAttribute("data-open-nav") === "false") {
          toggleMenu.setAttribute("data-open-nav", "true");
          overlayNav.setAttribute("data-is-visible", "true");
          document.body.classList.add("!overflow-y-hidden");
          navbar.style.height = `${navbar.scrollHeight}px`;
        } else {
          toggleMenu.setAttribute("data-open-nav", "false");
          overlayNav.setAttribute("data-is-visible", "false");
          document.body.classList.remove("!overflow-y-hidden");
          navbar.style.height = "0px";
        }
      });

      navbar.addEventListener("click", () => {
        toggleMenu.setAttribute("data-open-nav", "false");
        overlayNav.setAttribute("data-is-visible", "false");
        document.body.classList.remove("!overflow-y-hidden");
        navbar.style.height = "0px";
      });

      overlayNav.addEventListener("click", () => {
        toggleMenu.setAttribute("data-open-nav", "false");
        overlayNav.setAttribute("data-is-visible", "false");
        document.body.classList.remove("!overflow-y-hidden");
        navbar.style.height = "0px";
      });
    }
  }, []);

  return {};
};

export default useToggleTheme;

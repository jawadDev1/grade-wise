import ActionBtn from "../shared/ActionBtn.jsx";

import Container from "../shared/Container.jsx";
import Navitem from "../shared/Navitem.jsx";

import ToggleTheme from "../shared/ToggleTheme.jsx";

const navItems = [
  {
    href: "#",
    text: "Home",
  },
  {
    href: "#services",
    text: "Services",
  },
  {
    href: "#about-us",
    text: "About us",
  },
  {
    href: "#features",
    text: "Features",
  },
];

export default function Navbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-50 py-6">
      <Container>
        <nav className="w-full flex justify-between gap-6 relative">
          <div className="min-w-max inline-flex relative">
            <a href="/" className="relative flex items-center gap-3">
              <div className="relative w-7 h-7 overflow-hidden flex rounded-xl">
                <span className="absolute w-4 h-4 -top-1 -right-1 bg-green-500 rounded-md rotate-45"></span>
                <span className="absolute w-4 h-4 -bottom-1 -right-1 bg-[#FCDC58] rounded-md rotate-45"></span>
                <span className="absolute w-4 h-4 -bottom-1 -left-1 bg-primary rounded-md rotate-45"></span>
                <span className="absolute w-2 h-2 rounded-full bg-heading-1 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
              </div>
              <div className="inline-flex text-lg font-semibold text-heading-1">
                GradeWise
              </div>
            </a>
          </div>

          <div
            data-nav-overlay
            aria-hidden="true"
            className="fixed hidden inset-0 lg:!hidden bg-box-bg bg-opacity-50 backdrop-filter backdrop-blur-xl"
          ></div>
          <div
            data-navbar
            className="flex h-0 overflow-hidden lg:!h-auto lg:scale-y-100 duration-300 ease-linear flex-col gap-y-6 gap-x-4 lg:flex-row w-full lg:justify-between lg:items-center absolute lg:relative top-full lg:top-0 bg-body lg:bg-transparent border-x border-x-box-border lg:border-x-0"
          >
            <ul className="border-t border-box-border lg:border-t-0 px-6 lg:px-0 pt-6 lg:pt-0 flex flex-col lg:flex-row gap-y-4 gap-x-3 text-lg text-heading-2 w-full lg:justify-center lg:items-center">
              {navItems.map((item, i) => {
                return <Navitem key={i} {...item} />;
              })}
            </ul>

            <div className="lg:min-w-max flex items-center sm:w-max w-full pb-6 lg:pb-0 border-b border-box-bg lg:border-0 px-6 lg:px-0">
              <ActionBtn />
            </div>
          </div>

          <div className="min-w-max flex items-center gap-x-3">
            <ToggleTheme />
          </div>
        </nav>
      </Container>
    </header>
  );
}

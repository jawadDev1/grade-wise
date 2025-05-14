import React from "react";

const FooterNav = ({ title, navItems }) => {
  return (
    <nav className="space-y-6">
      <h2 className="capitalize font-semibold text-heading-1 text-xl">
        {title}
      </h2>
      <ul className="space-y-3 font-medium md:text-lg text-heading-3">
        {navItems.map((navItem, index) => (
          <li key={index}>
            <a
              href={navItem.itemLink}
              className="transition hover:text-primary"
            >
              {navItem.itemText}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default FooterNav;

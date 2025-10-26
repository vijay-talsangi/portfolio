import { FloatingDockClient } from "./FloatingDockClient";

export async function FloatingDock() {
  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: "IconHome",
    },
    {
      label: "About",
      href: "/about",
      icon: "IconUser",
    },
    {
      label: "Projects",
      href: "/projects",
      icon: "IconBriefcase",
    },
    {
      label: "Contact",
      href: "/contact",
      icon: "IconMail",
    },
  ];

  if (!navItems || navItems.length === 0) {
    return null;
  }

  return <FloatingDockClient navItems={navItems} />;
}

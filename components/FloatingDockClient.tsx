"use client";

import { FloatingDock as FloatingDockComponent } from "@/components/ui/floating-dock";
import { DynamicIcon } from "./DynamicIcon";

interface NavItem {
  title?: string | null;
  href?: string | null;
  icon?: string | null;
  isExternal?: boolean | null;
}

interface FloatingDockClientProps {
  navItems: NavItem[];
}

export function FloatingDockClient({ navItems }: FloatingDockClientProps) {
  const links = navItems.map((item) => ({
    title: item.title || "",
    href: item.href || "#",
    icon: <DynamicIcon iconName={item.icon || "IconHome"} />,
  }));

  return (
    <div className="fixed bottom-4 md:left-1/2 md:-translate-x-1/2 right-4 md:right-auto z-50">
      <FloatingDockComponent items={links} />
    </div>
  );
}

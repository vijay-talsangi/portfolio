"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { IconLogout, IconMessageCircle } from "@tabler/icons-react";
import { DynamicIcon } from "./DynamicIcon";
import { useSidebar } from "./ui/sidebar";

interface NavItem {
  title?: string | null;
  href?: string | null;
  icon?: string | null;
  isExternal?: boolean | null;
}

interface FloatingDockClientProps {
  navItems: NavItem[];
}

interface DockLink {
  title: string;
  href?: string;
  icon: React.ReactNode;
  isExternal?: boolean | null;
  onClick?: () => void;
  showTextOnDesktop?: boolean;
}

export function FloatingDockClient({ navItems }: FloatingDockClientProps) {
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();
  const { toggleSidebar, open, isMobile, openMobile } = useSidebar();

  const isSidebarOpen = isMobile ? openMobile : open;

  const links: DockLink[] = navItems.map((item) => ({
    title: item.title || "",
    href: item.href || "#",
    icon: <DynamicIcon iconName={item.icon || "IconHome"} />,
    isExternal: item.isExternal,
  }));

  // Add additional links when user is signed in
  if (isSignedIn) {
    const signedInLinks: DockLink[] = [
      {
        title: "Chat to AI Twin",
        href: "/chat",
        icon: <IconMessageCircle className="h-full w-full" />,
        isExternal: false,
        onClick: () => toggleSidebar(),
        showTextOnDesktop: true,
      },
      {
        title: "Sign Out",
        icon: <IconLogout className="h-full w-full" />,
        onClick: () => signOut(),
      },
    ];

    links.push(...signedInLinks);
  }

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ${
        isSidebarOpen
          ? "bottom-0 left-[calc(50%-var(--sidebar-width)/2)] -translate-x-1/2 pb-3"
          : "bottom-4 left-1/2 -translate-x-1/2"
      }`}
    >
      <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl md:rounded-2xl bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]">
        {links.map((item) => (
          <DockIcon key={`${item.title}-${item.href}`} item={item} />
        ))}
      </div>
    </div>
  );
}

function DockIcon({ item }: { item: DockLink }) {
  const iconClasses =
    "relative flex items-center justify-center w-full h-full rounded-full bg-white/25 dark:bg-white/10 backdrop-blur-md border border-white/40 dark:border-white/20 transition-all duration-500 ease-out hover:scale-125 hover:-translate-y-2 md:hover:-translate-y-3 hover:bg-gray-500/10 dark:hover:bg-white/20 hover:border-white/60 dark:hover:border-white/30 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]";

  const tooltipContent = (
    <div className="absolute -top-9 md:-top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-white/40 dark:border-white/20 text-xs md:text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-y-2 transition-all duration-300 pointer-events-none shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]">
      {item.title}
      {/* Tooltip arrow */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-white/90 dark:bg-black/90 border-r border-b border-white/40 dark:border-white/20" />
    </div>
  );

  const iconContent = (
    <div className="w-6 h-6 md:w-6 md:h-6 text-gray-800 dark:text-gray-100">
      {item.icon}
    </div>
  );

  // Special handling for items with text on desktop
  if (item.showTextOnDesktop) {
    const buttonClasses =
      "group relative flex items-center justify-center gap-2 h-12 md:h-12 px-4 rounded-full bg-white/25 dark:bg-white/10 backdrop-blur-md border border-white/40 dark:border-white/20 transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-2 md:hover:-translate-y-3 hover:bg-gray-500/10 dark:hover:bg-white/20 hover:border-white/60 dark:hover:border-white/30 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]";

    if (item.onClick) {
      return (
        <button type="button" onClick={item.onClick} className={buttonClasses}>
          <div className="w-5 h-5 text-gray-800 dark:text-gray-100">
            {item.icon}
          </div>
          <span className="hidden md:inline text-sm font-medium text-gray-800 dark:text-gray-100">
            {item.title}
          </span>
        </button>
      );
    }

    return (
      <a
        href={item.href || "#"}
        target={item.isExternal ? "_blank" : undefined}
        rel={item.isExternal ? "noopener noreferrer" : undefined}
        className={buttonClasses}
      >
        <div className="w-5 h-5 text-gray-800 dark:text-gray-100">
          {item.icon}
        </div>
        <span className="hidden md:inline text-sm font-medium text-gray-800 dark:text-gray-100">
          {item.title}
        </span>
      </a>
    );
  }

  // Priority 1: Handle onClick if present
  if (item.onClick) {
    return (
      <button
        type="button"
        onClick={item.onClick}
        className="group relative flex items-center justify-center w-12 h-12 md:w-12 md:h-12"
      >
        <div className={iconClasses}>{iconContent}</div>
        {tooltipContent}
      </button>
    );
  }

  // Priority 2: Default to link behavior with href
  return (
    <a
      href={item.href || "#"}
      target={item.isExternal ? "_blank" : undefined}
      rel={item.isExternal ? "noopener noreferrer" : undefined}
      className="group relative flex items-center justify-center w-12 h-12 md:w-12 md:h-12"
    >
      <div className={iconClasses}>{iconContent}</div>
      {tooltipContent}
    </a>
  );
}

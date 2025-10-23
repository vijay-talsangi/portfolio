"use client";

import { useState } from "react";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  IconLogout,
  IconMenu2,
  IconMessageCircle,
  IconX,
} from "@tabler/icons-react";
import Link from "next/link";
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
}

export function FloatingDockClient({ navItems }: FloatingDockClientProps) {
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();
  const { toggleSidebar, open, isMobile, openMobile } = useSidebar();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isSidebarOpen = isMobile ? openMobile : open;

  const links: DockLink[] = navItems.map((item) => ({
    title: item.title || "",
    href: item.href || "#",
    icon: <DynamicIcon iconName={item.icon || "IconHome"} />,
    isExternal: item.isExternal,
  }));

  // Add additional links when user is signed in AND sidebar is closed
  if (isSignedIn && !isSidebarOpen) {
    const signedInLinks: DockLink[] = [
      {
        title: "Chat to AI Twin",
        href: "/chat",
        icon: <IconMessageCircle className="h-full w-full" />,
        isExternal: false,
        onClick: () => toggleSidebar(),
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
    <>
      {/* Desktop: Horizontal dock - bottom left on md, bottom center on lg+ */}
      <div
        className={`hidden md:block fixed z-50 transition-all duration-300 ${
          isSidebarOpen
            ? "bottom-0 left-[calc(50%-var(--sidebar-width)/2)] -translate-x-1/2 pb-3"
            : "bottom-4 md:left-4 md:translate-x-0 lg:left-1/2 lg:-translate-x-1/2"
        }`}
      >
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl md:rounded-2xl bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]">
          {links.map((item) => (
            <DockIcon
              key={`${item.title}-${item.href}`}
              item={item}
              isVertical={false}
            />
          ))}
        </div>
      </div>

      {/* Mobile: Hamburger menu button at top right */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-12 h-12 rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] flex items-center justify-center text-neutral-500 dark:text-neutral-300"
        >
          {mobileMenuOpen ? (
            <IconX className="w-6 h-6" />
          ) : (
            <IconMenu2 className="w-6 h-6" />
          )}
        </button>

        {/* Vertical menu */}
        {mobileMenuOpen && (
          <div className="absolute top-14 right-0 flex flex-col gap-2 p-2 rounded-xl bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] animate-in slide-in-from-top-2 duration-200">
            {links.map((item) => (
              <DockIcon
                key={`${item.title}-${item.href}`}
                item={item}
                isVertical={true}
                onItemClick={() => setMobileMenuOpen(false)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function DockIcon({
  item,
  isVertical,
  onItemClick,
}: {
  item: DockLink;
  isVertical: boolean;
  onItemClick?: () => void;
}) {
  const iconClasses = isVertical
    ? "relative flex items-center justify-center w-full h-full rounded-full bg-white/25 dark:bg-white/10 backdrop-blur-md border border-white/40 dark:border-white/20 transition-all duration-300 hover:scale-110 hover:bg-gray-500/10 dark:hover:bg-white/20 hover:border-white/60 dark:hover:border-white/30"
    : "relative flex items-center justify-center w-full h-full rounded-full bg-white/25 dark:bg-white/10 backdrop-blur-md border border-white/40 dark:border-white/20 transition-all duration-500 ease-out hover:scale-125 hover:-translate-y-2 md:hover:-translate-y-3 hover:bg-gray-500/10 dark:hover:bg-white/20 hover:border-white/60 dark:hover:border-white/30 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]";

  // Tooltip for desktop horizontal layout
  const horizontalTooltip = (
    <div className="absolute -top-9 md:-top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-white/40 dark:border-white/20 text-xs md:text-sm font-medium text-neutral-800 dark:text-neutral-200 whitespace-nowrap opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-y-2 transition-all duration-300 pointer-events-none shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]">
      {item.title}
      {/* Tooltip arrow */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-white/90 dark:bg-black/90 border-r border-b border-white/40 dark:border-white/20" />
    </div>
  );

  // Tooltip for mobile vertical layout (shows on left)
  const verticalTooltip = (
    <div className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-white/40 dark:border-white/20 text-sm font-medium text-neutral-800 dark:text-neutral-200 whitespace-nowrap opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-x-1 transition-all duration-300 pointer-events-none shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]">
      {item.title}
      {/* Tooltip arrow */}
      <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-white/90 dark:bg-black/90 border-r border-t border-white/40 dark:border-white/20" />
    </div>
  );

  const tooltipContent = isVertical ? verticalTooltip : horizontalTooltip;

  const iconContent = (
    <div className="w-6 h-6 md:w-6 md:h-6 text-neutral-500 dark:text-neutral-300">
      {item.icon}
    </div>
  );

  const handleClick = (e?: React.MouseEvent) => {
    if (item.onClick) {
      e?.preventDefault();
      item.onClick();
    }
    onItemClick?.();
  };

  // Priority 1: Handle onClick if present
  if (item.onClick) {
    return (
      <button
        type="button"
        onClick={handleClick}
        className="group relative flex items-center justify-center w-12 h-12 md:w-12 md:h-12"
      >
        <div className={iconClasses}>{iconContent}</div>
        {tooltipContent}
      </button>
    );
  }

  // Priority 2: Default to link behavior with href
  return (
    <Link
      href={item.href || "#"}
      target={item.isExternal ? "_blank" : undefined}
      rel={item.isExternal ? "noopener noreferrer" : undefined}
      className="group relative flex items-center justify-center w-12 h-12 md:w-12 md:h-12"
      scroll={!item.isExternal}
      onClick={onItemClick}
    >
      <div className={iconClasses}>{iconContent}</div>
      {tooltipContent}
    </Link>
  );
}

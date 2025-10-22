"use client";

import { MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import { useSidebar } from "./ui/sidebar";
import { cn } from "@/lib/utils";
import { SignInButton, useUser } from "@clerk/nextjs";
import { ChevronRightIcon } from "@sanity/icons";

function SidebarToggle({ className }: { className?: string }) {
  const { toggleSidebar, open, isMobile, openMobile } = useSidebar();
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return (
      <SignInButton mode="modal">
        <Button variant="outline" className={cn(className)}>
          Sign in to chat to my AI Twin
        </Button>
      </SignInButton>
    );
  }

  if (isMobile && openMobile) {
    return (
      <Button
        variant="outline"
        onClick={toggleSidebar}
        className={cn("w-full", className)}
      >
        Close Chat
      </Button>
    );
  }

  const isSidebarOpen = isMobile ? openMobile : open;

  return (
    <Button
      variant={isSidebarOpen ? "default" : "outline"}
      onClick={toggleSidebar}
      className={cn(
        "transition-all duration-200",
        isSidebarOpen && "bg-primary text-primary-foreground shadow-md",
        className
      )}
    >
      {isSidebarOpen ? (
        <ChevronRightIcon className="h-4 w-4 transition-transform duration-200" />
      ) : (
        <MessageSquare className="h-4 w-4 transition-transform duration-200" />
      )}

      {!isSidebarOpen && "Chat to my AI Twin"}
    </Button>
  );
}

export default SidebarToggle;

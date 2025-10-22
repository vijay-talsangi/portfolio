"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MessageCircle } from "lucide-react";

interface ProfileImageProps {
  imageUrl: string;
  firstName: string;
  lastName: string;
}

export function ProfileImage({
  imageUrl,
  firstName,
  lastName,
}: ProfileImageProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href="/chat"
      className="relative aspect-square rounded-2xl overflow-hidden border-4 border-primary/20 block group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={imageUrl}
        alt={`${firstName} ${lastName}`}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        priority
      />

      {/* Online Badge */}
      <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
        <div className="relative">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
          <div className="absolute inset-0 w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
        </div>
        <span className="text-xs font-medium text-white">Online</span>
      </div>

      {/* Hover Overlay */}
      <div
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="text-center space-y-3">
          <MessageCircle className="w-12 h-12 text-white mx-auto" />
          <div className="text-white text-xl font-semibold">
            💬 Chat with AI Twin
          </div>
          <div className="text-white/80 text-sm">
            Click to start conversation
          </div>
        </div>
      </div>
    </Link>
  );
}

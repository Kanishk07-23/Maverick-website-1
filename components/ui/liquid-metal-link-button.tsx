"use client";

import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { useRouter } from "next/navigation";

interface LiquidMetalLinkButtonProps {
  label?: string;
  href?: string;
  viewMode?: "text" | "icon";
}

export function LiquidMetalLinkButton({
  label = "Get Started",
  href,
  viewMode = "text",
}: LiquidMetalLinkButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    }
  };

  return (
    <LiquidMetalButton
      label={label}
      onClick={handleClick}
      viewMode={viewMode}
    />
  );
}

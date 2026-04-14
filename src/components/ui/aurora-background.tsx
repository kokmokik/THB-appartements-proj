"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center bg-background text-foreground transition-bg",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className={cn(
            "[--dark-gradient:repeating-linear-gradient(100deg,#1c2a1f_0%,#1c2a1f_7%,transparent_10%,transparent_12%,#1c2a1f_16%)]",
            "[--aurora:repeating-linear-gradient(100deg,#d4af37_10%,#fffcf0_15%,#c9950a_20%,white_25%,#f0c040_30%)]",
            "[background-image:var(--dark-gradient),var(--aurora)]",
            "[background-size:300%,_200%]",
            "[background-position:50%_50%,50%_50%]",
            "animate-aurora blur-[10px]",
            "pointer-events-none",
            "absolute -inset-[10px] opacity-50 will-change-transform",
            showRadialGradient &&
              "[mask-image:radial-gradient(ellipse_at_50%_0%,black_10%,transparent_70%)]"
          )}
        />
      </div>
      {children}
    </div>
  );
};

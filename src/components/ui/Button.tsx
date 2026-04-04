import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
          {
            "bg-primary text-white hover:bg-primary-dark": variant === "primary",
            "bg-secondary text-white hover:bg-secondary-dark": variant === "secondary",
            "border-2 border-primary text-primary hover:bg-primary hover:text-white": variant === "outline",
            "text-foreground hover:bg-accent": variant === "ghost",
            "bg-destructive text-white hover:bg-red-700": variant === "destructive",
          },
          {
            "px-3 py-1.5 text-sm": size === "sm",
            "px-5 py-2.5 text-base": size === "md",
            "px-8 py-3.5 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
export default Button;

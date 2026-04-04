import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export default function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-card border border-border shadow-sm overflow-hidden",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-6 py-4 border-b border-border", className)} {...props} />;
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-6 py-4", className)} {...props} />;
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-6 py-4 border-t border-border", className)} {...props} />;
}

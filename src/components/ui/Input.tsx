import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-foreground mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full rounded-lg border border-white/[0.08] bg-white/[0.05] px-4 py-2.5 text-foreground placeholder:text-muted focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/10 transition-colors",
            error && "border-destructive focus:border-destructive focus:ring-destructive/20",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;

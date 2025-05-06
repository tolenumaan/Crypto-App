import { cn } from "@/lib/utils";

export const SecureButton = ({ 
  label,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) => (
  <button
    aria-label={label}
    className={cn(
      "security-button",
      props.className
    )}
    {...props}
  >
    {props.children}
  </button>
);
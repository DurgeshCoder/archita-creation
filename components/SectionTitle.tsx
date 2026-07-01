import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  description,
  align = "center",
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "flex flex-col space-y-3 mb-12 md:mb-16",
        align === "center" && "items-center text-center mx-auto max-w-2xl",
        align === "left" && "items-start text-left",
        align === "right" && "items-end text-right",
        className
      )}
    >
      {subtitle && (
        <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
          {subtitle}
        </span>
      )}
      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary dark:text-secondary-light leading-tight">
        {title}
      </h2>
      {description && (
        <p className="font-sans text-sm md:text-base text-luxury-dark/60 dark:text-luxury-light/60 font-light leading-relaxed max-w-xl">
          {description}
        </p>
      )}
      <div className="w-12 h-0.5 bg-secondary mt-4 rounded-full" />
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
  bgImage?: string;
}

export default function PageHeader({
  title,
  breadcrumbs,
  bgImage = "/images/hero_bedroom.jpg",
}: PageHeaderProps) {
  return (
    <div className="relative h-[250px] md:h-[300px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Dark Mask */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-102"
        />
        <div className="absolute inset-0 bg-luxury-dark/85" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full text-center text-white flex flex-col items-center space-y-4">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-[10px] sm:text-xs tracking-wider uppercase text-white/50">
          <Link href="/" className="hover:text-secondary transition-colors">
            Home
          </Link>
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center space-x-2">
              <ChevronRight className="w-3.5 h-3.5 text-white/20" />
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-secondary transition-colors">
                  {crumb.name}
                </Link>
              ) : (
                <span className="text-secondary font-medium">{crumb.name}</span>
              )}
            </div>
          ))}
        </nav>

        {/* Page Title */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mt-2">
          {title}
        </h1>

        <div className="w-10 h-0.5 bg-secondary rounded-full mt-2" />
      </div>
    </div>
  );
}

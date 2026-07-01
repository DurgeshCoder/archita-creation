import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CornerUpLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
      {/* Dark mask background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_bedroom.jpg"
          alt="Luxury Bedroom Bedding Set"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-102"
        />
        <div className="absolute inset-0 bg-luxury-dark/90" />
      </div>

      <div className="max-w-md mx-auto px-6 relative z-10 text-center text-white flex flex-col items-center space-y-6">
        <div className="inline-flex items-center space-x-2 bg-secondary/20 border border-secondary/30 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-secondary">
          <span>Error 404</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
          Page Not Found
        </h1>

        <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed font-light">
          The luxury bedding page or collection you are looking for has been relocated or is temporarily archived.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
          <Link
            href="/"
            className="bg-secondary hover:bg-secondary-dark text-white px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-md flex items-center justify-center shrink-0"
          >
            <CornerUpLeft className="w-4 h-4 mr-2" />
            Return Home
          </Link>
          <Link
            href="/collections"
            className="border border-white/20 hover:border-white hover:bg-white/5 text-white px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 flex items-center justify-center shrink-0"
          >
            Browse Collections
            <ArrowRight className="w-3.5 h-3.5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}

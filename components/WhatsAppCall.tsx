"use client";

import { MessageSquare, Phone } from "lucide-react";
import Link from "next/link";

export default function WhatsAppCall() {
  const whatsappNumber = "919795872419";
  const whatsappMessage = encodeURIComponent(
    "Hello Archita Creation, I am interested in your luxury bedding collections. I would like to request your latest catalogue and enquire about pricing."
  );
  
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  const callUrl = "tel:+919795872419";

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col space-y-3 md:bottom-8 md:left-8">
      {/* WhatsApp Button */}
      <Link
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 relative group"
        aria-label="Enquire on WhatsApp"
      >
        <MessageSquare className="w-5 h-5 md:w-6 md:h-6 fill-current" />
        <span className="absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-luxury-dark/95 text-white text-[10px] md:text-xs font-semibold tracking-wider uppercase opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 shadow-md whitespace-nowrap">
          WhatsApp Enquiry
        </span>
      </Link>

      {/* Call Button */}
      <Link
        href={callUrl}
        className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-secondary hover:bg-secondary-dark text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 relative group"
        aria-label="Call Bedding Specialist"
      >
        <Phone className="w-5 h-5 md:w-6 md:h-6 fill-current" />
        <span className="absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-luxury-dark/95 text-white text-[10px] md:text-xs font-semibold tracking-wider uppercase opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 shadow-md whitespace-nowrap">
          Call Expert
        </span>
      </Link>
    </div>
  );
}

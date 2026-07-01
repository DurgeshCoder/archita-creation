"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, MapPin, Phone, Clock, Send, Check } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-luxury-dark text-white pt-20 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand Information */}
        <div className="flex flex-col space-y-6">
          <Link href="/" className="flex flex-col items-start leading-none group">
            <span className="font-serif text-3xl font-bold tracking-widest uppercase text-secondary">
              Achtia
            </span>
            <span className="font-sans text-xs tracking-[0.25em] text-white/50 uppercase mt-0.5 pl-0.5">
              Creation
            </span>
          </Link>
          <p className="text-sm text-white/60 leading-relaxed font-sans font-light">
            Manufacturers and exporters of premium bedding collections, Giza cotton bedsheets, comforters, AC blankets, and traditional dohars. Designed for timeless elegance and luxury comfort.
          </p>
          <div className="flex space-x-4 pt-1">
            <Link
              href="https://www.instagram.com/archita_creation_offical"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-secondary hover:bg-white/10 hover:border-secondary transition-all"
              aria-label="Instagram Profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </Link>
          </div>
          <div className="flex flex-col space-y-3 pt-2 text-sm text-white/70">
            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-secondary mr-3 shrink-0 mt-0.5" />
              <span>Achtia House, Indra Nagar, Lucknow, Uttar Pradesh - 226016, India</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 text-secondary mr-4 shrink-0" />
              <Link href="tel:+919795872419" className="hover:text-secondary transition-colors">
                +91 97958 72419
              </Link>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 text-secondary mr-4 shrink-0" />
              <Link href="mailto:info@achtiacreation.com" className="hover:text-secondary transition-colors">
                info@achtiacreation.com
              </Link>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-secondary mr-4 shrink-0" />
              <span>Mon - Sat: 9:00 AM - 7:00 PM</span>
            </div>
          </div>
        </div>

        {/* Directory Links */}
        <div className="grid grid-cols-2 gap-8 lg:pl-8 lg:col-span-2">
          {/* Product Categories */}
          <div>
            <h3 className="font-serif text-lg font-semibold tracking-wider text-secondary mb-6">
              Our Products
            </h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <Link href="/bedsheets" className="hover:text-secondary hover:translate-x-1 inline-block transition-all">
                  Bedsheets
                </Link>
              </li>
              <li>
                <Link href="/comforters" className="hover:text-secondary hover:translate-x-1 inline-block transition-all">
                  Comforters
                </Link>
              </li>
              <li>
                <Link href="/blankets" className="hover:text-secondary hover:translate-x-1 inline-block transition-all">
                  AC Blankets
                </Link>
              </li>
              <li>
                <Link href="/dohars" className="hover:text-secondary hover:translate-x-1 inline-block transition-all">
                  Dohars
                </Link>
              </li>
              <li>
                <Link href="/bedding-sets" className="hover:text-secondary hover:translate-x-1 inline-block transition-all">
                  Bedding Sets
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links & Info */}
          <div>
            <h3 className="font-serif text-lg font-semibold tracking-wider text-secondary mb-6">
              Company
            </h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <Link href="/about" className="hover:text-secondary hover:translate-x-1 inline-block transition-all">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-secondary hover:translate-x-1 inline-block transition-all">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-secondary hover:translate-x-1 inline-block transition-all">
                  Design Gallery
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-secondary hover:translate-x-1 inline-block transition-all">
                  Insights & Blog
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-secondary hover:translate-x-1 inline-block transition-all">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-secondary hover:translate-x-1 inline-block transition-all">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter & Map */}
        <div className="flex flex-col space-y-6">
          <div>
            <h3 className="font-serif text-lg font-semibold tracking-wider text-secondary mb-4">
              Join Our Club
            </h3>
            <p className="text-xs text-white/50 leading-relaxed mb-4">
              Subscribe to receive exclusive insights on bedroom styling, fabric care guides, and catalog collections launches.
            </p>
            <form onSubmit={handleSubscribe} className="flex relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your luxury email"
                className="w-full bg-white/5 border border-white/10 rounded-full px-5 py-3 text-xs focus:outline-none focus:border-secondary transition-all pr-12 text-white font-sans placeholder:text-white/30"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 aspect-square bg-secondary hover:bg-secondary-dark text-white rounded-full flex items-center justify-center transition-colors"
                aria-label="Subscribe"
              >
                {subscribed ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-green-400 mt-2 animate-fade-in font-medium">
                Thank you! Welcome to Achtia Luxury.
              </p>
            )}
          </div>

          {/* Styled Google Maps Iframe */}
          <div className="rounded-xl overflow-hidden h-32 w-full border border-white/10 relative group">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14234.619086395383!2d80.98565158652342!3d26.882705096538965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be2a6ab06d7ef%3A0xc38ddf7e268a86a6!2sIndira%20Nagar%2C%20Lucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(100%) invert(90%) contrast(95%)" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Achtia Creation Location Map"
            />
            <div className="absolute inset-0 bg-primary/10 pointer-events-none transition-opacity duration-300 group-hover:opacity-0" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-white/40 gap-4">
        <span>© {currentYear} Achtia Creation. All Rights Reserved. Co-crafted with Luxury.</span>
        <div className="flex space-x-6">
          <Link href="/privacy" className="hover:text-secondary transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-secondary transition-colors">
            Terms of Use
          </Link>
          <Link href="/sitemap.xml" className="hover:text-secondary transition-colors">
            Sitemap
          </Link>
        </div>
      </div>
    </footer>
  );
}

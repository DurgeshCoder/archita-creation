"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send, CheckCircle } from "lucide-react";
import PageHeader from "@/components/PageHeader";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    enquiryType: "retail",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9\s-]{10,14}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!formData.message.trim()) newErrors.message = "Message text is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Format the WhatsApp message with form details
      const whatsappNumber = "919795872419";
      const enquiryLabels: Record<string, string> = {
        retail: "Direct Home Purchase (Retail)",
        hotel: "Boutique Hotel Linens",
        wholesale: "Wholesale Dealership / Distribution",
        designer: "Interior Designing Sourcing",
      };
      
      const messageText = `Hello Archita Creation, I would like to submit an enquiry:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Company: ${formData.company || "N/A"}
- Interest: ${enquiryLabels[formData.enquiryType] || formData.enquiryType}
- Message: ${formData.message}`;

      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageText)}`;
      
      // Open in a new tab
      window.open(whatsappUrl, "_blank");

      // Simulate API submit
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        enquiryType: "retail",
        message: "",
      });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <>
      <PageHeader title="Contact Our Desk" breadcrumbs={[{ name: "Contact Us" }]} />

      <section className="py-24 bg-white dark:bg-luxury-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Form Info & Details */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                Get In Touch
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-primary dark:text-secondary-light leading-tight mt-1 mb-4">
                Let&apos;s Co-Create Comfort
              </h2>
              <p className="font-sans text-sm text-luxury-dark/70 dark:text-white/70 leading-relaxed font-light">
                Whether you represent a 5-star hotel chain looking for bespoke monogram embroideries, a retail partner planning bulk ordering, or a homeowner desiring Giza sheets—our bedding specialists are ready to assist.
              </p>
            </div>

            {/* Direct details */}
            <div className="flex flex-col space-y-6 text-sm text-luxury-dark/80 dark:text-white/80">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-secondary mr-4 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-primary dark:text-secondary-light">
                    Lucknow Corporate Head Office
                  </h4>
                  <p className="font-sans text-xs text-luxury-dark/60 dark:text-white/50 mt-1 font-light">
                    Archita House, Indra Nagar, Lucknow, Uttar Pradesh - 226016, India
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="w-5 h-5 text-secondary mr-4 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-primary dark:text-secondary-light">
                    Specialist Direct Desk
                  </h4>
                  <p className="font-sans text-xs text-luxury-dark/60 dark:text-white/50 mt-1 font-light">
                    Mon - Sat (9:00 AM - 7:00 PM): <br />
                    <span className="font-semibold text-secondary">+91 97958 72419</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="w-5 h-5 text-secondary mr-4 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-primary dark:text-secondary-light">
                    Corporate Email Enquiries
                  </h4>
                  <p className="font-sans text-xs text-luxury-dark/60 dark:text-white/50 mt-1 font-light">
                    General: info@architacreation.com <br />
                    Wholesale: sales@architacreation.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-accent/20 dark:bg-luxury-dark/40 border border-luxury-dark/5 dark:border-white/5 p-8 md:p-12 rounded-3xl backdrop-blur-md shadow-sm">
            <h3 className="font-serif text-2xl font-bold text-primary dark:text-secondary-light mb-6">
              Request Info / Catalogue
            </h3>
            
            {submitted ? (
              <div className="bg-green-500/10 border border-green-500/30 text-green-700 dark:text-green-400 p-6 rounded-2xl flex items-start space-x-3 mb-6">
                <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm">Enquiry Submitted Successfully</h4>
                  <p className="text-xs font-light mt-1">
                    Thank you for contacting Archita Creation. One of our luxury bedding representatives will call you within 24 business hours.
                  </p>
                </div>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-luxury-dark/60 dark:text-white/60 mb-2 font-medium">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white dark:bg-luxury-dark border border-luxury-dark/10 dark:border-white/10 rounded-full py-3 px-6 text-xs focus:outline-none focus:border-secondary transition-all text-luxury-dark dark:text-luxury-light placeholder-luxury-dark/40 dark:placeholder-white/40"
                  />
                  {errors.name && <p className="text-red-500 text-[10px] mt-1.5 pl-4">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-luxury-dark/60 dark:text-white/60 mb-2 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white dark:bg-luxury-dark border border-luxury-dark/10 dark:border-white/10 rounded-full py-3 px-6 text-xs focus:outline-none focus:border-secondary transition-all text-luxury-dark dark:text-luxury-light placeholder-luxury-dark/40 dark:placeholder-white/40"
                  />
                  {errors.email && <p className="text-red-500 text-[10px] mt-1.5 pl-4">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Phone */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-luxury-dark/60 dark:text-white/60 mb-2 font-medium">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white dark:bg-luxury-dark border border-luxury-dark/10 dark:border-white/10 rounded-full py-3 px-6 text-xs focus:outline-none focus:border-secondary transition-all text-luxury-dark dark:text-luxury-light placeholder-luxury-dark/40 dark:placeholder-white/40"
                    placeholder="+91 97958 72419"
                  />
                  {errors.phone && <p className="text-red-500 text-[10px] mt-1.5 pl-4">{errors.phone}</p>}
                </div>

                {/* Company name */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-luxury-dark/60 dark:text-white/60 mb-2 font-medium">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-white dark:bg-luxury-dark border border-luxury-dark/10 dark:border-white/10 rounded-full py-3 px-6 text-xs focus:outline-none focus:border-secondary transition-all text-luxury-dark dark:text-luxury-light placeholder-luxury-dark/40 dark:placeholder-white/40"
                    placeholder="e.g. Studio Design (Optional)"
                  />
                </div>
              </div>

              {/* Enquiry Type selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-luxury-dark/60 dark:text-white/60 mb-2 font-medium">
                  I am interested in:
                </label>
                <select
                  value={formData.enquiryType}
                  onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                  className="w-full bg-white dark:bg-luxury-dark border border-luxury-dark/10 dark:border-white/10 rounded-full py-3 px-6 text-xs focus:outline-none focus:border-secondary transition-all appearance-none text-luxury-dark dark:text-luxury-light"
                >
                  <option value="retail" className="bg-white dark:bg-luxury-dark text-luxury-dark dark:text-luxury-light">Direct Home Purchase (Retail)</option>
                  <option value="hotel" className="bg-white dark:bg-luxury-dark text-luxury-dark dark:text-luxury-light">Boutique Hotel Linens</option>
                  <option value="wholesale" className="bg-white dark:bg-luxury-dark text-luxury-dark dark:text-luxury-light">Wholesale Dealership / Distribution</option>
                  <option value="designer" className="bg-white dark:bg-luxury-dark text-luxury-dark dark:text-luxury-light">Interior Designing Sourcing</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-luxury-dark/60 dark:text-white/60 mb-2 font-medium">
                  Your Message *
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white dark:bg-luxury-dark border border-luxury-dark/10 dark:border-white/10 rounded-3xl py-3 px-6 text-xs focus:outline-none focus:border-secondary transition-all resize-none text-luxury-dark dark:text-luxury-light placeholder-luxury-dark/40 dark:placeholder-white/40"
                  placeholder="Tell us about your bedding dimensions, bulk volume or custom requirements..."
                />
                {errors.message && <p className="text-red-500 text-[10px] mt-1.5 pl-4">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
              >
                <Send className="w-3.5 h-3.5 mr-2" /> Send Enquiry Message
              </button>
            </form>
          </div>

        </div>

        {/* Large Embedded Map */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-24">
          <div className="rounded-3xl overflow-hidden h-[400px] border border-luxury-dark/5 dark:border-white/5 relative shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14234.619086395383!2d80.98565158652342!3d26.882705096538965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be2a6ab06d7ef%3A0xc38ddf7e268a86a6!2sIndira%20Nagar%2C%20Lucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(100%) invert(5%) contrast(90%) brightness(95%)" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Archita Creation Head Office"
            />
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import {
  MessageSquare,
  Phone,
  Mail,
  Building,
  CheckCircle2,
  Clock,
  Archive,
  ExternalLink,
  Trash2,
  Loader2,
  Filter,
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/inquiries");
      const data = await res.json();
      setInquiries(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load inquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
      }
    } catch (err) {
      console.error("Error updating status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this customer inquiry?")) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
      if (res.ok) {
        setInquiries((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error("Delete inquiry error:", err);
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    if (statusFilter === "ALL") return true;
    return inq.status === statusFilter;
  });

  const getWhatsAppLink = (phone: string, name: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const msg = encodeURIComponent(
      `Hello ${name}, thank you for contacting Archita Creation Luxury Bedding. How may we assist you today?`
    );
    return `https://wa.me/${cleanPhone}?text=${msg}`;
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Customer Inquiries & Leads"
        description="Review inbound retail orders, boutique hotel sourcing, and wholesale requests"
      />

      <div className="p-8 space-y-6">
        {/* Filter Bar */}
        <div className="flex items-center justify-between bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xs">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-neutral-400" />
            <span className="text-xs font-semibold text-luxury-dark dark:text-luxury-light">
              Filter by Status:
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {["ALL", "NEW", "CONTACTED", "RESOLVED", "ARCHIVED"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  statusFilter === status
                    ? "bg-secondary text-white"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Inquiries List */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 text-secondary animate-spin" />
            <p className="text-xs text-neutral-500">Loading inquiries...</p>
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="py-20 text-center space-y-3 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800">
            <MessageSquare className="w-12 h-12 text-neutral-300 mx-auto" />
            <p className="text-sm font-semibold text-luxury-dark dark:text-luxury-light">
              No inquiries found under &quot;{statusFilter}&quot;
            </p>
            <p className="text-xs text-neutral-500">
              Customer inquiries submitted via the contact form or product inquiry buttons appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredInquiries.map((inq) => (
              <div
                key={inq.id}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 dark:border-neutral-800 pb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-serif text-lg font-bold text-luxury-dark dark:text-luxury-light">
                        {inq.name}
                      </h3>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          inq.status === "NEW"
                            ? "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                            : inq.status === "CONTACTED"
                            ? "bg-blue-500/10 text-blue-600 border border-blue-500/20"
                            : inq.status === "RESOLVED"
                            ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                            : "bg-neutral-500/10 text-neutral-500 border border-neutral-500/20"
                        }`}
                      >
                        {inq.status}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Received on {new Date(inq.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-500 font-medium">Status:</span>
                    <select
                      value={inq.status}
                      disabled={updatingId === inq.id}
                      onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                      className="px-3 py-1.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-secondary/40"
                    >
                      <option value="NEW">NEW</option>
                      <option value="CONTACTED">CONTACTED</option>
                      <option value="RESOLVED">RESOLVED</option>
                      <option value="ARCHIVED">ARCHIVED</option>
                    </select>
                  </div>
                </div>

                {/* Contact Information Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                    <Phone className="w-3.5 h-3.5 text-secondary" />
                    <span className="font-medium">{inq.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                    <Mail className="w-3.5 h-3.5 text-secondary" />
                    <span className="font-medium">{inq.email}</span>
                  </div>
                  {inq.company && (
                    <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                      <Building className="w-3.5 h-3.5 text-secondary" />
                      <span>{inq.company}</span>
                    </div>
                  )}
                </div>

                {/* Message Body */}
                <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl text-xs text-luxury-dark dark:text-neutral-200 leading-relaxed">
                  <p className="font-semibold text-neutral-500 text-[10px] uppercase tracking-wider mb-1">
                    Customer Message & Requirement:
                  </p>
                  <p className="whitespace-pre-wrap">{inq.message}</p>
                </div>

                {/* Quick Contact CTAs */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <a
                      href={getWhatsAppLink(inq.phone, inq.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> WhatsApp Reply
                    </a>
                    <a
                      href={`mailto:${inq.email}?subject=Archita Creation Inquiry Response`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-700 dark:text-neutral-200 text-xs font-semibold rounded-lg transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" /> Email
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDelete(inq.id)}
                    className="p-1.5 text-neutral-400 hover:text-red-500 rounded-md transition-colors"
                    title="Delete Inquiry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

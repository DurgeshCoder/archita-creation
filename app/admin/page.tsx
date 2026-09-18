"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  Layers,
  Sparkles,
  Image as ImageIcon,
  MessageSquare,
  ArrowUpRight,
  TrendingUp,
  Plus,
  CheckCircle2,
  Clock,
  ChevronRight,
  Loader2,
  ExternalLink,
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
      })
      .catch((err) => console.error("Error fetching stats:", err))
      .finally(() => setLoading(false));
  }, []);

  const metrics = [
    {
      label: "Bedding Products",
      value: stats?.metrics?.totalProducts ?? 0,
      description: `${stats?.metrics?.featuredProducts ?? 0} Featured collections`,
      icon: Package,
      color: "from-amber-600 to-amber-700",
      href: "/admin/products",
    },
    {
      label: "Active Categories",
      value: stats?.metrics?.totalCategories ?? 0,
      description: "Bedsheets, Dohars, Blankets, Comforters",
      icon: Layers,
      color: "from-primary to-primary-dark",
      href: "/admin/categories",
    },
    {
      label: "Curated Collections",
      value: stats?.metrics?.totalCollections ?? 0,
      description: "Signature luxury bedding themes",
      icon: Sparkles,
      color: "from-secondary to-secondary-dark",
      href: "/admin/collections",
    },
    {
      label: "Design Gallery Photos",
      value: stats?.metrics?.totalGalleryItems ?? 0,
      description: "Showcase photos & weave closeups",
      icon: ImageIcon,
      color: "from-indigo-600 to-indigo-700",
      href: "/admin/gallery",
    },
    {
      label: "Customer Inquiries",
      value: stats?.metrics?.totalInquiries ?? 0,
      description: "Direct WhatsApp & custom inquiries",
      icon: MessageSquare,
      color: "from-emerald-600 to-emerald-700",
      href: "/admin/inquiries",
    },
  ];

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Executive Dashboard"
        description="Real-time control center for Archita Creation products, categories, gallery, and inquiries"
        actionHref="/admin/products/new"
        actionLabel="Add New Product"
      />

      <div className="p-8 space-y-8">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-neutral-900 via-primary-dark to-neutral-900 text-white p-6 md:p-8 shadow-xl border border-neutral-800">
          <div className="relative z-10 max-w-2xl space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/20 text-secondary border border-secondary/30 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Luxury Catalog Management
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-tight">
              Welcome to the Archita Creation CMS
            </h2>
            <p className="text-neutral-300 text-xs md:text-sm">
              Manage your luxury bedding catalog, update thread count specifications, upload high-res imagery via ImageKit, and curate the visual design gallery.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 relative z-10">
            <Link
              href="/admin/products/new"
              className="px-4 py-2 bg-secondary hover:bg-secondary-dark text-white text-xs font-semibold rounded-lg shadow-md transition-all flex items-center gap-2"
            >
              <Plus className="w-3.5 h-3.5" /> Add Product
            </Link>
            <Link
              href="/admin/gallery"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg backdrop-blur-sm transition-all flex items-center gap-2 border border-white/10"
            >
              <ImageIcon className="w-3.5 h-3.5" /> Add Gallery Photo
            </Link>
            <Link
              href="/admin/categories"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg backdrop-blur-sm transition-all flex items-center gap-2 border border-white/10"
            >
              <Layers className="w-3.5 h-3.5" /> Categories
            </Link>
            <Link
              href="/admin/collections"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg backdrop-blur-sm transition-all flex items-center gap-2 border border-white/10"
            >
              <Sparkles className="w-3.5 h-3.5" /> Collections
            </Link>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <Link
                key={idx}
                href={m.href}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all hover:border-secondary/50 group"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${m.color} flex items-center justify-center text-white shadow-md`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-secondary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold font-serif text-luxury-dark dark:text-luxury-light">
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : m.value}
                  </p>
                  <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 mt-0.5">
                    {m.label}
                  </p>
                  <p className="text-[11px] text-neutral-400 mt-1 truncate">
                    {m.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Recent Products & Inquiries Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Products Overview */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-luxury-dark dark:text-luxury-light">
                  Product Catalog
                </h3>
                <p className="text-xs text-neutral-500">Live products in store</p>
              </div>
              <Link
                href="/admin/products"
                className="text-xs font-semibold text-secondary hover:text-secondary-dark flex items-center gap-1"
              >
                View All <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {stats?.recentProducts && stats.recentProducts.length > 0 ? (
                stats.recentProducts.map((prod: any) => (
                  <div
                    key={prod.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-700/60"
                  >
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-12 h-12 rounded-lg object-cover bg-neutral-200"
                      />
                      <div>
                        <p className="text-xs font-bold text-luxury-dark dark:text-luxury-light line-clamp-1">
                          {prod.name}
                        </p>
                        <p className="text-[11px] text-neutral-500">
                          {prod.category?.name || "Bedsheets"} • <span className="text-secondary font-semibold">{prod.price}</span>
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/admin/products/${prod.id}/edit`}
                      className="px-2.5 py-1 text-[11px] font-semibold text-secondary hover:bg-secondary/10 rounded-md transition-colors"
                    >
                      Edit
                    </Link>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-xs text-neutral-500">
                  <Package className="w-8 h-8 mx-auto text-neutral-400 mb-2" />
                  <p>Catalog is ready for products.</p>
                  <Link
                    href="/admin/products/new"
                    className="inline-block mt-2 text-secondary font-semibold hover:underline"
                  >
                    + Create First Product
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Quick Inquiries Overview */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-luxury-dark dark:text-luxury-light">
                  Recent Inquiries
                </h3>
                <p className="text-xs text-neutral-500">Prospective buyer leads</p>
              </div>
              <Link
                href="/admin/inquiries"
                className="text-xs font-semibold text-secondary hover:text-secondary-dark flex items-center gap-1"
              >
                View Inbox <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {stats?.recentInquiries && stats.recentInquiries.length > 0 ? (
                stats.recentInquiries.map((inq: any) => (
                  <div
                    key={inq.id}
                    className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-700/60 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-luxury-dark dark:text-luxury-light">
                        {inq.name}
                      </p>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 border border-amber-500/20 uppercase">
                        {inq.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 line-clamp-1">
                      {inq.message}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-1">
                      <span>{inq.phone}</span>
                      <span>{new Date(inq.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-xs text-neutral-500">
                  <MessageSquare className="w-8 h-8 mx-auto text-neutral-400 mb-2" />
                  <p>No new customer inquiries yet.</p>
                  <p className="text-[11px] text-neutral-400 mt-1">
                    Inquiries submitted from the website contact form or product pages will appear here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

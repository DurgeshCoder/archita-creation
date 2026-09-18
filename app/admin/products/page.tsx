"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  ExternalLink,
  Star,
  CheckCircle2,
  XCircle,
  Loader2,
  Sparkles,
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/categories"),
      ]);
      const prodData = await prodRes.json();
      const catData = await catRes.json();
      setProducts(Array.isArray(prodData) ? prodData : []);
      setCategories(Array.isArray(catData) ? catData : []);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert("Failed to delete product.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting product.");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.price?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      p.categoryId === selectedCategory ||
      p.category?.slug === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Bedding Products Management"
        description="Manage your luxury sheets, comforters, dohars, and bedding collections"
        actionHref="/admin/products/new"
        actionLabel="Add New Product"
      />

      <div className="p-8 space-y-6">
        {/* Search & Category Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xs">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by product name, fabric, or price..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-neutral-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Table Card */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-xs">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center space-y-3">
              <Loader2 className="w-8 h-8 text-secondary animate-spin" />
              <p className="text-xs text-neutral-500 font-medium">
                Loading luxury product catalog...
              </p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <Package className="w-12 h-12 text-neutral-300 mx-auto" />
              <p className="text-sm font-semibold text-luxury-dark dark:text-luxury-light">
                No bedding products found
              </p>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                {searchQuery || selectedCategory !== "all"
                  ? "Try adjusting your search query or category filter."
                  : "Start populating your catalog with your first premium item."}
              </p>
              <Link
                href="/admin/products/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-white text-xs font-semibold rounded-lg shadow-sm hover:bg-secondary-dark transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add First Product
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-800/40 text-[11px] uppercase tracking-wider text-neutral-500 font-bold">
                    <th className="py-3.5 px-6">Product</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Collection</th>
                    <th className="py-3.5 px-4">Price</th>
                    <th className="py-3.5 px-4">Rating</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 text-xs">
                  {filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-neutral-50/80 dark:hover:bg-neutral-800/30 transition-colors"
                    >
                      {/* Product Thumbnail & Name */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3.5">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 rounded-xl object-cover border border-neutral-200 dark:border-neutral-700 bg-neutral-100"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-luxury-dark dark:text-luxury-light line-clamp-1">
                                {product.name}
                              </span>
                              {product.isFeatured && (
                                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 bg-amber-500/10 text-amber-600 border border-amber-500/20 text-[10px] font-bold rounded">
                                  <Sparkles className="w-2.5 h-2.5" /> Featured
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-neutral-400 font-mono">
                              /products/{product.slug || product.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-md font-medium">
                          {product.category?.name || product.categoryId || "Bedsheets"}
                        </span>
                      </td>

                      {/* Collection */}
                      <td className="py-4 px-4 text-neutral-600 dark:text-neutral-400">
                        {product.collection?.name || product.collection || "—"}
                      </td>

                      {/* Price */}
                      <td className="py-4 px-4 font-semibold text-secondary">
                        {product.price}
                      </td>

                      {/* Rating */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1 text-amber-500 font-medium">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{product.rating}</span>
                        </div>
                      </td>

                      {/* Stock Status */}
                      <td className="py-4 px-4">
                        {product.inStock !== false ? (
                          <span className="inline-flex items-center gap-1 text-emerald-600 text-[11px] font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" /> In Stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-red-500 text-[11px] font-semibold">
                            <XCircle className="w-3.5 h-3.5" /> Out of Stock
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/products/${product.slug || product.id}`}
                            target="_blank"
                            title="Preview on live site"
                            className="p-1.5 text-neutral-400 hover:text-luxury-dark dark:hover:text-white rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>

                          <Link
                            href={`/admin/products/${product.id}/edit`}
                            title="Edit product"
                            className="p-1.5 text-neutral-400 hover:text-secondary rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleDelete(product.id, product.name)}
                            disabled={deletingId === product.id}
                            title="Delete product"
                            className="p-1.5 text-neutral-400 hover:text-red-600 rounded-md hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors disabled:opacity-50"
                          >
                            {deletingId === product.id ? (
                              <Loader2 className="w-4 h-4 animate-spin text-red-600" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Loader2,
  X,
  Sparkles,
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import ImageKitUploader from "@/components/admin/ImageKitUploader";

export default function AdminCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [displayOrder, setDisplayOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openCreateModal = () => {
    setEditingCategory(null);
    setName("");
    setSlug("");
    setDescription("");
    setImages([]);
    setDisplayOrder(categories.length + 1);
    setIsActive(true);
    setErrorMessage(null);
    setIsModalOpen(true);
  };

  const openEditModal = (cat: any) => {
    setEditingCategory(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description || "");
    setImages(cat.image ? [cat.image] : []);
    setDisplayOrder(cat.displayOrder || 0);
    setIsActive(cat.isActive !== false);
    setErrorMessage(null);
    setIsModalOpen(true);
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingCategory) {
      setSlug(
        val
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage("Category name is required.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const payload = {
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, "-"),
      description,
      image: images[0] || null,
      displayOrder: Number(displayOrder),
      isActive,
    };

    try {
      const url = editingCategory
        ? `/api/categories/${editingCategory.id}`
        : "/api/categories";
      const method = editingCategory ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to save category.");
      }

      setIsModalOpen(false);
      fetchCategories();
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, catName: string) => {
    if (!confirm(`Delete category "${catName}"? Any associated products will remain.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCategories((prev) => prev.filter((c) => c.id !== id));
      } else {
        alert("Failed to delete category.");
      }
    } catch (err) {
      console.error("Delete category error:", err);
      alert("Error deleting category.");
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Bedding Categories"
        description="Organize product lines into categories (Bedsheets, Blankets, Comforters, Dohars, Bedding Sets)"
      />

      <div className="p-8 space-y-6">
        {/* Top bar with Add Button */}
        <div className="flex justify-between items-center bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xs">
          <div>
            <p className="text-xs font-semibold text-luxury-dark dark:text-luxury-light">
              Total Categories: {categories.length}
            </p>
            <p className="text-[11px] text-neutral-500">
              Categories define the main product browsing navigation
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary-dark text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" /> Add Category
          </button>
        </div>

        {/* Categories Grid */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 text-secondary animate-spin" />
            <p className="text-xs text-neutral-500">Loading categories...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Category Banner Image */}
                  <div className="relative h-40 bg-neutral-100 dark:bg-neutral-800">
                    {cat.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-400">
                        <Layers className="w-10 h-10" />
                      </div>
                    )}
                    <span className="absolute top-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-[11px] font-bold rounded-full">
                      {cat._count?.products ?? 0} Products
                    </span>
                  </div>

                  {/* Category Details */}
                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-lg font-bold text-luxury-dark dark:text-luxury-light">
                        {cat.name}
                      </h3>
                      {cat.isActive !== false ? (
                        <span className="text-emerald-600 text-[10px] font-bold uppercase bg-emerald-500/10 px-2 py-0.5 rounded-full">
                          Active
                        </span>
                      ) : (
                        <span className="text-neutral-500 text-[10px] font-bold uppercase bg-neutral-500/10 px-2 py-0.5 rounded-full">
                          Inactive
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-400 font-mono">
                      /{cat.slug}
                    </p>
                    {cat.description && (
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2">
                        {cat.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <span className="text-[11px] text-neutral-400">
                    Order: #{cat.displayOrder ?? 0}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openEditModal(cat)}
                      className="p-1.5 text-neutral-500 hover:text-secondary rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      title="Edit Category"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(cat.id, cat.name)}
                      className="p-1.5 text-neutral-500 hover:text-red-500 rounded-md hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                      title="Delete Category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Add / Edit Category */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <h2 className="font-serif text-lg font-bold text-luxury-dark dark:text-luxury-light">
                {editingCategory ? "Edit Category" : "Create New Category"}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-neutral-400 hover:text-luxury-dark dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-950/40 border border-red-800 rounded-xl text-xs text-red-300">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300 mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Luxury Bedsheets"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300 mb-1">
                  URL Slug *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. bedsheets"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-secondary/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Brief description of this bedding category..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40"
                />
              </div>

              <ImageKitUploader
                value={images}
                onChange={setImages}
                maxFiles={1}
                folder="/archita-creation/categories"
                label="Category Banner Image (ImageKit CDN)"
              />

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40"
                  />
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      className="w-4 h-4 text-secondary rounded"
                    />
                    <span className="text-xs font-semibold text-luxury-dark dark:text-luxury-light">
                      Active on Storefront
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-5 py-2 bg-secondary hover:bg-secondary-dark text-white text-xs font-semibold rounded-xl shadow-md transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>{editingCategory ? "Update Category" : "Save Category"}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

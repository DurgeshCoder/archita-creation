"use client";

import { useState, useEffect } from "react";
import {
  Sparkles,
  Plus,
  Edit2,
  Trash2,
  Loader2,
  X,
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import ImageKitUploader from "@/components/admin/ImageKitUploader";

export default function AdminCollections() {
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [theme, setTheme] = useState("Luxury");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [displayOrder, setDisplayOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const fetchCollections = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/collections");
      const data = await res.json();
      setCollections(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load collections:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const openCreateModal = () => {
    setEditingCollection(null);
    setName("");
    setSlug("");
    setTheme("Heritage & Royal");
    setDescription("");
    setImages([]);
    setDisplayOrder(collections.length + 1);
    setIsActive(true);
    setErrorMessage(null);
    setIsModalOpen(true);
  };

  const openEditModal = (col: any) => {
    setEditingCollection(col);
    setName(col.name);
    setSlug(col.slug);
    setTheme(col.theme || "Luxury");
    setDescription(col.description || "");
    setImages(col.image ? [col.image] : []);
    setDisplayOrder(col.displayOrder || 0);
    setIsActive(col.isActive !== false);
    setErrorMessage(null);
    setIsModalOpen(true);
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingCollection) {
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
      setErrorMessage("Collection name is required.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const payload = {
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, "-"),
      theme,
      description,
      image: images[0] || null,
      displayOrder: Number(displayOrder),
      isActive,
    };

    try {
      const url = editingCollection
        ? `/api/collections/${editingCollection.id}`
        : "/api/collections";
      const method = editingCollection ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to save collection.");
      }

      setIsModalOpen(false);
      fetchCollections();
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, colName: string) => {
    if (!confirm(`Delete collection "${colName}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/collections/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCollections((prev) => prev.filter((c) => c.id !== id));
      } else {
        alert("Failed to delete collection.");
      }
    } catch (err) {
      console.error("Delete collection error:", err);
      alert("Error deleting collection.");
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Bedding Collections"
        description="Curate designer suites (Excellence Collection, Royal Heritage, Hotel Satin Stripe)"
      />

      <div className="p-8 space-y-6">
        {/* Top bar with Add Button */}
        <div className="flex justify-between items-center bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xs">
          <div>
            <p className="text-xs font-semibold text-luxury-dark dark:text-luxury-light">
              Total Collections: {collections.length}
            </p>
            <p className="text-[11px] text-neutral-500">
              Collections group related products across themes and seasons
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary-dark text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" /> Add Collection
          </button>
        </div>

        {/* Collections Grid */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 text-secondary animate-spin" />
            <p className="text-xs text-neutral-500">Loading collections...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((col) => (
              <div
                key={col.id}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Collection Cover Image */}
                  <div className="relative h-44 bg-neutral-100 dark:bg-neutral-800">
                    {col.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={col.image}
                        alt={col.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-400">
                        <Sparkles className="w-10 h-10" />
                      </div>
                    )}
                    {col.theme && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 bg-secondary text-white text-[10px] font-bold uppercase rounded-full shadow-sm">
                        {col.theme}
                      </span>
                    )}
                    <span className="absolute top-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-[11px] font-bold rounded-full">
                      {col._count?.products ?? 0} Items
                    </span>
                  </div>

                  {/* Details */}
                  <div className="p-5 space-y-2">
                    <h3 className="font-serif text-lg font-bold text-luxury-dark dark:text-luxury-light">
                      {col.name}
                    </h3>
                    <p className="text-xs text-neutral-400 font-mono">
                      /collections/{col.slug}
                    </p>
                    {col.description && (
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2">
                        {col.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <span className="text-[11px] text-neutral-400">
                    Order: #{col.displayOrder ?? 0}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openEditModal(col)}
                      className="p-1.5 text-neutral-500 hover:text-secondary rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      title="Edit Collection"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(col.id, col.name)}
                      className="p-1.5 text-neutral-500 hover:text-red-500 rounded-md hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                      title="Delete Collection"
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

      {/* Modal for Add / Edit Collection */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <h2 className="font-serif text-lg font-bold text-luxury-dark dark:text-luxury-light">
                {editingCollection ? "Edit Collection" : "Create New Collection"}
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
                  Collection Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Excellence Giza Collection"
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
                  placeholder="e.g. excellence-collection"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-secondary/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300 mb-1">
                  Theme / Design Note
                </label>
                <input
                  type="text"
                  placeholder="e.g. 100% Giza Sateen Silk"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe this curated bedding collection..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40"
                />
              </div>

              <ImageKitUploader
                value={images}
                onChange={setImages}
                maxFiles={1}
                folder="/archita-creation/collections"
                label="Collection Showcase Image (ImageKit CDN)"
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
                    <span>{editingCollection ? "Update Collection" : "Save Collection"}</span>
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

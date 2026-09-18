"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import AdminHeader from "@/components/admin/AdminHeader";
import ImageKitUploader from "@/components/admin/ImageKitUploader";
import {
  Plus,
  Search,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  X,
  ExternalLink,
} from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  categoryKey: string;
  image: string;
  aspectRatio: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
}

const CATEGORY_OPTIONS = [
  { label: "Bedsheets", key: "bedsheets" },
  { label: "Comforters", key: "comforters" },
  { label: "AC Blankets", key: "blankets" },
  { label: "Handcrafted Dohars", key: "dohars" },
  { label: "Bedding Sets", key: "bedding-sets" },
  { label: "Master Bedroom", key: "master-bedroom" },
  { label: "Craftsmanship & Weave", key: "craftsmanship" },
  { label: "Hotel & Suite Projects", key: "hotel-projects" },
];

const ASPECT_RATIO_OPTIONS = [
  { label: "Compact Height (250px - 300px)", value: "h-[250px] md:h-[300px]" },
  { label: "Standard Height (300px - 380px)", value: "h-[300px] md:h-[380px]" },
  { label: "Tall Feature (350px - 450px)", value: "h-[350px] md:h-[450px]" },
];

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "Bedsheets",
    categoryKey: "bedsheets",
    image: "",
    aspectRatio: "h-[300px] md:h-[380px]",
    displayOrder: 0,
    isActive: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Fetch all gallery items
  const loadGalleryItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/gallery");
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (err) {
      console.error("Failed to load gallery items:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGalleryItems();
  }, []);

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleOpenCreateModal = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      category: "Bedsheets",
      categoryKey: "bedsheets",
      image: "",
      aspectRatio: "h-[300px] md:h-[380px]",
      displayOrder: items.length + 1,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      categoryKey: item.categoryKey,
      image: item.image,
      aspectRatio: item.aspectRatio || "h-[300px] md:h-[380px]",
      displayOrder: item.displayOrder,
      isActive: item.isActive,
    });
    setIsModalOpen(true);
  };

  const handleCategorySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = CATEGORY_OPTIONS.find((c) => c.label === e.target.value);
    if (selected) {
      setFormData({
        ...formData,
        category: selected.label,
        categoryKey: selected.key,
      });
    } else {
      setFormData({
        ...formData,
        category: e.target.value,
        categoryKey: e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showNotification("error", "Please provide a title for the photo.");
      return;
    }
    if (!formData.image.trim()) {
      showNotification("error", "Please upload or provide an image URL.");
      return;
    }

    setIsSubmitting(true);
    try {
      const url = editingItem
        ? `/api/gallery/${editingItem.id}`
        : "/api/gallery";
      const method = editingItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Operation failed");
      }

      showNotification(
        "success",
        editingItem ? "Gallery photo updated successfully!" : "New photo added to gallery!"
      );
      setIsModalOpen(false);
      loadGalleryItems();
    } catch (err: any) {
      showNotification("error", err.message || "Failed to save gallery item.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}" from the gallery?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete photo");
      showNotification("success", "Photo deleted from gallery.");
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err: any) {
      showNotification("error", err.message || "Could not delete photo.");
    }
  };

  const handleToggleActive = async (item: GalleryItem) => {
    try {
      const res = await fetch(`/api/gallery/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !item.isActive }),
      });
      if (!res.ok) throw new Error("Failed to toggle status");
      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, isActive: !item.isActive } : i))
      );
      showNotification("success", `Photo ${!item.isActive ? "activated" : "hidden"}.`);
    } catch (err: any) {
      showNotification("error", err.message || "Status update failed.");
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategoryFilter === "all" || item.categoryKey === selectedCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Design Gallery Photos"
        subtitle="Manage public showcase photos, fabric closeups, and master suite styling"
        action={{
          label: "Add New Photo",
          onClick: handleOpenCreateModal,
          icon: Plus,
        }}
      />

      {/* Notification toast */}
      {notification && (
        <div
          className={`flex items-center gap-2 p-4 rounded-xl text-sm font-medium ${
            notification.type === "success"
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
              : "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search by title or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-secondary/40 text-luxury-dark dark:text-luxury-light"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <button
            onClick={() => setSelectedCategoryFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 cursor-pointer ${
              selectedCategoryFilter === "all"
                ? "bg-secondary text-white"
                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200"
            }`}
          >
            All Photos ({items.length})
          </button>
          {CATEGORY_OPTIONS.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategoryFilter(cat.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 cursor-pointer ${
                selectedCategoryFilter === cat.key
                  ? "bg-secondary text-white"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Photos Grid */}
      {loading ? (
        <div className="text-center py-20 text-neutral-400">Loading gallery photos...</div>
      ) : filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`group relative bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
                item.isActive
                  ? "border-neutral-200 dark:border-neutral-800 hover:shadow-xl hover:border-secondary/50"
                  : "border-neutral-200/50 dark:border-neutral-800/50 opacity-60"
              }`}
            >
              {/* Photo Preview */}
              <div className="relative h-48 w-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                <Image
                  src={item.image || "/images/hero_bedroom.jpg"}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Badges */}
                <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                  <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>

                <div className="absolute top-2.5 right-2.5">
                  <button
                    onClick={() => handleToggleActive(item)}
                    className={`p-1.5 rounded-lg backdrop-blur-md transition-colors cursor-pointer ${
                      item.isActive
                        ? "bg-emerald-500/80 text-white hover:bg-emerald-600"
                        : "bg-neutral-800/80 text-neutral-400 hover:bg-neutral-700"
                    }`}
                    title={item.isActive ? "Active (Click to Hide)" : "Hidden (Click to Show)"}
                  >
                    {item.isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-sm font-bold text-luxury-dark dark:text-luxury-light line-clamp-1 group-hover:text-secondary transition-colors">
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-neutral-400 mt-1">
                    <span>Order: #{item.displayOrder}</span>
                    <span className="font-mono text-[10px] truncate max-w-[120px]">
                      {item.aspectRatio.replace(" md:", ", ")}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <button
                    onClick={() => handleOpenEditModal(item)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-secondary-dark cursor-pointer transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-red-500 hover:text-red-700 cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-16 text-center border border-neutral-200 dark:border-neutral-800 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mx-auto">
            <ImageIcon className="w-7 h-7" />
          </div>
          <h3 className="font-serif text-lg font-bold text-luxury-dark dark:text-luxury-light">
            No Gallery Photos Found
          </h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            {searchQuery
              ? "No photos matched your search criteria. Try clearing search filters."
              : "Upload high-resolution textile photos, artisan closeups, and bedroom sets to showcase."}
          </p>
          <button
            onClick={handleOpenCreateModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary hover:bg-secondary-dark text-white rounded-full text-xs font-semibold uppercase tracking-wider shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add First Photo
          </button>
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 w-full max-w-2xl shadow-2xl p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
              <div>
                <h3 className="font-serif text-xl font-bold text-luxury-dark dark:text-luxury-light">
                  {editingItem ? "Edit Gallery Photo" : "Add Photo to Design Gallery"}
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Upload through ImageKit CDN into <span className="font-mono text-secondary">/archita-creation/gallery</span>
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
                  Photo Title / Description *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Presidential Bedroom Suite Decor, Sanganeri Dohar Detail"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-secondary/40 text-luxury-dark dark:text-luxury-light"
                />
              </div>

              {/* Category & Display Order */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={handleCategorySelect}
                    className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-secondary/40 text-luxury-dark dark:text-luxury-light"
                  >
                    {CATEGORY_OPTIONS.map((cat) => (
                      <option key={cat.key} value={cat.label}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) =>
                      setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-secondary/40 text-luxury-dark dark:text-luxury-light"
                  />
                </div>
              </div>

              {/* Aspect Ratio / Card Height Style */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
                  Masonry Card Height Style
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {ASPECT_RATIO_OPTIONS.map((opt) => (
                    <button
                      type="button"
                      key={opt.value}
                      onClick={() => setFormData({ ...formData, aspectRatio: opt.value })}
                      className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        formData.aspectRatio === opt.value
                          ? "border-secondary bg-secondary/10 text-secondary font-semibold"
                          : "border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-neutral-300"
                      }`}
                    >
                      <span className="block font-medium">{opt.label.split(" (")[0]}</span>
                      <span className="text-[10px] text-neutral-400 font-mono">
                        {opt.value.replace(" md:", ", ")}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* ImageKit Image Upload */}
              <div>
                <ImageKitUploader
                  value={formData.image ? [formData.image] : []}
                  onChange={(images) => setFormData({ ...formData, image: images[0] || "" })}
                  maxFiles={1}
                  folder="/archita-creation/gallery"
                  label="Gallery Image (ImageKit CDN)"
                />
              </div>

              {/* Active Toggle */}
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 rounded text-secondary focus:ring-secondary/40 cursor-pointer"
                />
                <label htmlFor="isActive" className="text-xs font-medium text-luxury-dark dark:text-luxury-light cursor-pointer">
                  Visible on Live Website Design Gallery & Homepage
                </label>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-secondary hover:bg-secondary-dark text-white text-xs font-semibold uppercase tracking-wider shadow-md transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? "Saving..." : editingItem ? "Update Photo" : "Add to Gallery"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

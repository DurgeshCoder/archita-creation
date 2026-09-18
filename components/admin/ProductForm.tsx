"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Loader2,
  Sparkles,
  Info,
  Check,
} from "lucide-react";
import ImageKitUploader from "./ImageKitUploader";

interface ProductFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export default function ProductForm({ initialData, isEdit = false }: ProductFormProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || "");
  const [collectionId, setCollectionId] = useState(initialData?.collectionId || "");
  const [price, setPrice] = useState(initialData?.price || "₹4,499");
  const [originalPrice, setOriginalPrice] = useState(initialData?.originalPrice || "");
  const [rating, setRating] = useState(initialData?.rating || 5.0);
  const [inStock, setInStock] = useState(initialData?.inStock !== false);
  const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured || false);
  
  const [images, setImages] = useState<string[]>(
    Array.isArray(initialData?.images)
      ? initialData.images
      : initialData?.image
      ? [initialData.image]
      : ["/images/archita_bedding_01.jpg"]
  );

  const [shortDescription, setShortDescription] = useState(
    initialData?.shortDescription || ""
  );
  const [description, setDescription] = useState(initialData?.description || "");

  // Dynamic Key-Value Specifications
  const [specs, setSpecs] = useState<{ key: string; value: string }[]>(() => {
    if (initialData?.specifications && typeof initialData.specifications === "object") {
      return Object.entries(initialData.specifications).map(([key, value]) => ({
        key,
        value: String(value),
      }));
    }
    return [
      { key: "Material", value: "100% Giza Long-Staple Cotton" },
      { key: "Thread Count", value: "400 TC" },
      { key: "Weave", value: "Sateen" },
      { key: "Origin", value: "Proudly Made in India" },
      { key: "Sizes Available", value: "Double King (108\" x 108\")" },
    ];
  });

  // Dynamic String Lists
  const [features, setFeatures] = useState<string[]>(
    Array.isArray(initialData?.features) && initialData.features.length > 0
      ? initialData.features
      : [
          "100% Giza Cotton with long-staple fibers",
          "Mercerized for silk-like sheen and color retention",
          "Fade-resistant and shrink-resistant",
        ]
  );

  const [careInstructions, setCareInstructions] = useState<string[]>(
    Array.isArray(initialData?.careInstructions) && initialData.careInstructions.length > 0
      ? initialData.careInstructions
      : [
          "Machine wash warm on gentle cycle",
          "Use mild detergent without bleach",
          "Tumble dry low and remove promptly",
        ]
  );

  const [packageIncludes, setPackageIncludes] = useState<string[]>(
    Array.isArray(initialData?.packageIncludes) && initialData.packageIncludes.length > 0
      ? initialData.packageIncludes
      : [
          "1 King Size Flat Bedsheet (108 in x 108 in)",
          "2 Standard Pillow Covers (18 in x 27 in)",
        ]
  );

  useEffect(() => {
    Promise.all([
      fetch("/api/categories").then((r) => r.json()),
      fetch("/api/collections").then((r) => r.json()),
    ]).then(([cats, cols]) => {
      if (Array.isArray(cats)) {
        setCategories(cats);
        if (!categoryId && cats.length > 0) setCategoryId(cats[0].id);
      }
      if (Array.isArray(cols)) setCollections(cols);
    });
  }, [categoryId]);

  // Auto-generate slug when typing name in create mode
  const handleNameChange = (val: string) => {
    setName(val);
    if (!isEdit) {
      setSlug(
        val
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
      );
    }
  };

  const handleAddSpec = () => setSpecs([...specs, { key: "", value: "" }]);
  const handleRemoveSpec = (idx: number) => setSpecs(specs.filter((_, i) => i !== idx));
  const handleUpdateSpec = (idx: number, field: "key" | "value", val: string) => {
    const updated = [...specs];
    updated[idx][field] = val;
    setSpecs(updated);
  };

  const handleAddFeature = () => setFeatures([...features, ""]);
  const handleRemoveFeature = (idx: number) => setFeatures(features.filter((_, i) => i !== idx));
  const handleUpdateFeature = (idx: number, val: string) => {
    const updated = [...features];
    updated[idx] = val;
    setFeatures(updated);
  };

  const handleAddCare = () => setCareInstructions([...careInstructions, ""]);
  const handleRemoveCare = (idx: number) =>
    setCareInstructions(careInstructions.filter((_, i) => i !== idx));
  const handleUpdateCare = (idx: number, val: string) => {
    const updated = [...careInstructions];
    updated[idx] = val;
    setCareInstructions(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage("Product name is required.");
      return;
    }
    if (images.length === 0) {
      setErrorMessage("Please upload or provide at least one product image.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    // Transform specs to JSON object
    const specificationsObj: Record<string, string> = {};
    specs.forEach((s) => {
      if (s.key.trim()) specificationsObj[s.key.trim()] = s.value.trim();
    });

    const payload = {
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, "-"),
      categoryId,
      collectionId: collectionId || null,
      price,
      originalPrice: originalPrice || null,
      rating: Number(rating) || 5.0,
      image: images[0],
      images,
      description,
      shortDescription: shortDescription || description.slice(0, 100),
      specifications: specificationsObj,
      features: features.filter((f) => f.trim().length > 0),
      careInstructions: careInstructions.filter((c) => c.trim().length > 0),
      packageIncludes: packageIncludes.filter((p) => p.trim().length > 0),
      inStock,
      isFeatured,
    };

    try {
      const url = isEdit ? `/api/products/${initialData.id}` : "/api/products";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to save product.");
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      console.error("Save product error:", err);
      setErrorMessage(err.message || "An error occurred while saving the product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 max-w-5xl mx-auto space-y-8">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 hover:text-luxury-dark dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-2.5 bg-secondary hover:bg-secondary-dark text-white text-xs font-semibold rounded-xl shadow-md shadow-secondary/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Product...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>{isEdit ? "Update Product" : "Publish Product"}</span>
            </>
          )}
        </button>
      </div>

      {errorMessage && (
        <div className="p-4 bg-red-950/40 border border-red-800 rounded-xl text-xs text-red-300">
          {errorMessage}
        </div>
      )}

      {/* Main Form Cards */}
      <div className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 space-y-5 shadow-xs">
          <h2 className="font-serif text-lg font-bold text-luxury-dark dark:text-luxury-light flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-secondary" /> Basic Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300 mb-1.5">
                Product Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Excellence Premium Giza Cotton Sheets"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300 mb-1.5">
                URL Slug *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. excellence-cotton-bedsheet"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm font-mono text-xs focus:outline-none focus:ring-2 focus:ring-secondary/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300 mb-1.5">
                Category *
              </label>
              <select
                required
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300 mb-1.5">
                Bedding Collection (Optional)
              </label>
              <select
                value={collectionId}
                onChange={(e) => setCollectionId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40"
              >
                <option value="">No Collection</option>
                {collections.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.name} ({col.theme || "Curated"})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300 mb-1.5">
                Display Price *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. ₹4,499"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300 mb-1.5">
                Original Price (Strikethrough)
              </label>
              <input
                type="text"
                placeholder="e.g. ₹5,999"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40"
              />
            </div>
          </div>

          {/* Flags */}
          <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-neutral-100 dark:border-neutral-800">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
                className="w-4 h-4 text-secondary rounded focus:ring-secondary"
              />
              <span className="text-xs font-semibold text-luxury-dark dark:text-luxury-light">
                Product is In Stock
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 text-secondary rounded focus:ring-secondary"
              />
              <span className="text-xs font-semibold text-luxury-dark dark:text-luxury-light">
                Show as Featured on Homepage
              </span>
            </label>
          </div>
        </div>

        {/* ImageKit Media Upload */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 space-y-4 shadow-xs">
          <ImageKitUploader
            value={images}
            onChange={setImages}
            maxFiles={8}
            folder={
              categories.find((c) => c.id === categoryId)?.slug
                ? `/archita-creation/products/${categories.find((c) => c.id === categoryId)?.slug}`
                : "/archita-creation/products"
            }
            label="Product Images (ImageKit High-Res CDN)"
          />
        </div>

        {/* Descriptions */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 space-y-5 shadow-xs">
          <h2 className="font-serif text-lg font-bold text-luxury-dark dark:text-luxury-light">
            Descriptions & Copy
          </h2>

          <div>
            <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300 mb-1.5">
              Short Description (Card Teaser)
            </label>
            <input
              type="text"
              placeholder="e.g. 400 TC long-staple sateen Giza cotton sheet set with elegant hemstitching."
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300 mb-1.5">
              Full Detailed Description *
            </label>
            <textarea
              rows={4}
              required
              placeholder="Describe the weave, fabric hand-feel, thread count, luxury finishing, and craftsmanship..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40"
            />
          </div>
        </div>

        {/* Specifications Key-Value Editor */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-lg font-bold text-luxury-dark dark:text-luxury-light">
                Fabric Specifications
              </h2>
              <p className="text-xs text-neutral-500">
                Key-value attributes shown on the product page specification sheet.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddSpec}
              className="px-3 py-1.5 text-xs font-semibold text-secondary hover:bg-secondary/10 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Add Attribute
            </button>
          </div>

          <div className="space-y-2.5">
            {specs.map((spec, idx) => (
              <div key={idx} className="flex gap-3 items-center">
                <input
                  type="text"
                  placeholder="e.g. Thread Count"
                  value={spec.key}
                  onChange={(e) => handleUpdateSpec(idx, "key", e.target.value)}
                  className="w-1/3 px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-secondary/40"
                />
                <input
                  type="text"
                  placeholder="e.g. 400 TC Sateen"
                  value={spec.value}
                  onChange={(e) => handleUpdateSpec(idx, "value", e.target.value)}
                  className="flex-1 px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-secondary/40"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSpec(idx)}
                  className="p-2 text-neutral-400 hover:text-red-500 rounded-lg transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Features & Care Bullet Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Key Features */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-base font-bold text-luxury-dark dark:text-luxury-light">
                Key Features
              </h3>
              <button
                type="button"
                onClick={handleAddFeature}
                className="text-xs text-secondary font-semibold hover:underline"
              >
                + Add Point
              </button>
            </div>
            <div className="space-y-2">
              {features.map((feat, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={feat}
                    onChange={(e) => handleUpdateFeature(idx, e.target.value)}
                    placeholder="e.g. Mercerized for silk-like sheen"
                    className="flex-1 px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-secondary/40"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="p-1.5 text-neutral-400 hover:text-red-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Care Instructions */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-base font-bold text-luxury-dark dark:text-luxury-light">
                Care Instructions
              </h3>
              <button
                type="button"
                onClick={handleAddCare}
                className="text-xs text-secondary font-semibold hover:underline"
              >
                + Add Step
              </button>
            </div>
            <div className="space-y-2">
              {careInstructions.map((care, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={care}
                    onChange={(e) => handleUpdateCare(idx, e.target.value)}
                    placeholder="e.g. Machine wash warm on gentle cycle"
                    className="flex-1 px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-secondary/40"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveCare(idx)}
                    className="p-1.5 text-neutral-400 hover:text-red-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

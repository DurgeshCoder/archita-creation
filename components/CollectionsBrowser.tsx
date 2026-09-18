"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import { PRODUCTS } from "@/constants";
import ProductCard from "./ProductCard";

export default function CollectionsBrowser() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [productList, setProductList] = useState<any[]>(PRODUCTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [categoryList, setCategoryList] = useState([
    { value: "all", label: "All Items" },
    { value: "bedsheets", label: "Bedsheets" },
    { value: "comforters", label: "Comforters" },
    { value: "blankets", label: "AC Blankets" },
    { value: "dohars", label: "Dohars" },
    { value: "bedding-sets", label: "Bedding Sets" },
  ]);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProductList(data);
        }
      })
      .catch(() => {});

    fetch("/api/categories")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const active = data.filter((c: any) => c.isActive !== false);
          if (active.length > 0) {
            setCategoryList([
              { value: "all", label: "All Items" },
              ...active.map((c: any) => ({
                value: c.slug,
                label: c.name,
              })),
            ]);
          }
        }
      })
      .catch(() => {});
  }, []);

  // Read URL query params on load
  useEffect(() => {
    const timer = setTimeout(() => {
      const search = searchParams.get("search");
      const cat = searchParams.get("category");
      if (search) {
        setSearchQuery(search);
      }
      if (cat) {
        setSelectedCategory(cat);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [searchParams]);

  // Filter items
  const filteredProducts = useMemo(() => {
    return productList.filter((product) => {
      const categorySlug = product.category?.slug || product.category || product.categoryId;
      const collectionName = product.collection?.name || product.collection || "";

      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        collectionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === "all" || categorySlug === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [productList, searchQuery, selectedCategory]);

  // Reset page when filters change
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
    }, 0);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory]);

  // Calculate paginated products
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    router.push("/collections");
  };

  return (
    <div className="w-full">
      {/* Search and Filters panel */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between bg-accent/20 dark:bg-luxury-dark/40 border border-luxury-dark/5 dark:border-white/5 p-6 rounded-3xl backdrop-blur-md">
          {/* Search Field */}
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-dark/40 dark:text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search design, fabric, collection..."
              className="w-full bg-white dark:bg-luxury-dark border border-luxury-dark/10 dark:border-white/10 rounded-full py-3 pl-12 pr-10 text-xs focus:outline-none focus:border-secondary transition-all text-luxury-dark dark:text-luxury-light placeholder-luxury-dark/40 dark:placeholder-white/40"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-luxury-dark/40 dark:text-white/40 hover:text-primary transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Filters (Horizontal scroll on mobile) */}
          <div className="flex items-center space-x-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 no-scrollbar">
            {categoryList.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-wide uppercase transition-all shrink-0 border cursor-pointer ${
                  selectedCategory === cat.value
                    ? "bg-primary border-primary text-white"
                    : "bg-white dark:bg-luxury-dark border-luxury-dark/10 dark:border-white/10 text-luxury-dark/70 dark:text-luxury-light hover:border-secondary hover:text-secondary"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Products */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 min-h-[400px]">
        {paginatedProducts.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-4 mt-16">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-3 rounded-full border border-luxury-dark/10 dark:border-white/10 disabled:opacity-30 disabled:cursor-not-allowed hover:border-secondary hover:text-secondary transition-all cursor-pointer"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs uppercase tracking-widest font-semibold text-luxury-dark/50 dark:text-luxury-light/50">
                  Page <span className="text-primary dark:text-secondary">{currentPage}</span> of{" "}
                  {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-3 rounded-full border border-luxury-dark/10 dark:border-white/10 disabled:opacity-30 disabled:cursor-not-allowed hover:border-secondary hover:text-secondary transition-all cursor-pointer"
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20 flex flex-col items-center justify-center space-y-4">
            <p className="font-serif text-2xl font-semibold text-luxury-dark/50 dark:text-white/40">
              No Premium Designs Found
            </p>
            <p className="text-xs text-luxury-dark/40 dark:text-white/30 max-w-xs font-light">
              We couldn&apos;t find matches for your search. Try resetting filters or search query parameters.
            </p>
            <button
              onClick={handleClearFilters}
              className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all mt-4 cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

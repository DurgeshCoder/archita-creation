"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Search, X, Clock, ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/constants";

export default function BlogBrowser() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const timer = setTimeout(() => {
      const search = searchParams.get("search");
      const cat = searchParams.get("category");
      if (search) setSearchQuery(search);
      if (cat) setSelectedCategory(cat);
    }, 0);
    return () => clearTimeout(timer);
  }, [searchParams]);

  // Extract unique categories
  const categories = useMemo(() => {
    const unique = new Set(BLOG_POSTS.map((post) => post.category));
    return ["all", ...Array.from(unique)];
  }, []);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    router.push("/blog");
  };

  return (
    <div className="w-full">
      {/* Search & Topic Filters */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between bg-accent/20 dark:bg-luxury-dark/40 border border-luxury-dark/5 dark:border-white/5 p-6 rounded-3xl backdrop-blur-md">
          {/* Search Field */}
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-dark/40 dark:text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search article title or topic..."
              className="w-full bg-white dark:bg-luxury-dark border border-luxury-dark/10 dark:border-white/10 rounded-full py-3 pl-12 pr-10 text-xs focus:outline-none focus:border-secondary transition-all text-luxury-dark dark:text-luxury-light placeholder-luxury-dark/40 dark:placeholder-white/40"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-luxury-dark/40 dark:text-white/40"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category List */}
          <div className="flex items-center space-x-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-wide uppercase transition-all shrink-0 border ${
                  selectedCategory === cat
                    ? "bg-primary border-primary text-white"
                    : "bg-white dark:bg-luxury-dark border-luxury-dark/10 dark:border-white/10 text-luxury-dark/70 dark:text-luxury-light hover:border-secondary hover:text-secondary"
                }`}
              >
                {cat === "all" ? "All Topics" : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Article Cards Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 min-h-[400px]">
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white dark:bg-luxury-dark/40 border border-luxury-dark/5 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image */}
                  <div className="relative h-[220px] w-full overflow-hidden">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-primary/95 text-white text-[9px] font-semibold tracking-wider uppercase px-2.5 py-1.5 rounded-full">
                      {post.category}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-8">
                    <div className="flex items-center space-x-4 text-[10px] text-luxury-dark/40 dark:text-white/40 uppercase tracking-widest mb-3">
                      <span>{post.date}</span>
                      <span className="flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1" /> {post.readTime}
                      </span>
                    </div>
                    <h2 className="font-serif text-xl font-bold text-primary dark:text-secondary-light leading-snug mb-3 hover:text-secondary transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="font-sans text-xs text-luxury-dark/65 dark:text-white/65 font-light leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer Link & Author */}
                <div className="px-8 pb-8 flex items-center justify-between border-t border-luxury-dark/5 dark:border-white/5 pt-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-luxury-dark/10">
                      <Image
                        src={post.author.image}
                        alt={post.author.name}
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    </div>
                    <span className="text-[10px] font-medium text-luxury-dark/70 dark:text-white/70">
                      {post.author.name}
                    </span>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-secondary hover:text-secondary-dark group/btn"
                  >
                    Read Article
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 flex flex-col items-center justify-center space-y-4">
            <p className="font-serif text-2xl font-semibold text-luxury-dark/50 dark:text-white/40">
              No Articles Found
            </p>
            <button
              onClick={handleClearFilters}
              className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all mt-4"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

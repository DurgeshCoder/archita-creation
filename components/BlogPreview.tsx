"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/constants";
import SectionTitle from "./SectionTitle";

export default function BlogPreview() {
  return (
    <section className="py-24 bg-accent/10 dark:bg-luxury-dark/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionTitle
          title="Insights & Inspiration"
          subtitle="Achtia Journal"
          description="Read expert guides on fiber specifications, mattress thickness selections, and interior design styling tips from textile pros."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-luxury-dark border border-luxury-dark/5 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Featured Image */}
                <div className="relative h-[220px] w-full overflow-hidden">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-primary/95 text-white text-[10px] font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center space-x-4 text-[10px] text-luxury-dark/40 dark:text-luxury-light/40 uppercase tracking-widest mb-3">
                    <span>{post.date}</span>
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" /> {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-primary dark:text-secondary-light leading-snug mb-3 hover:text-secondary transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="font-sans text-xs text-luxury-dark/60 dark:text-luxury-light/60 font-light leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Read Action & Author */}
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
                  <span className="text-[10px] font-medium text-luxury-dark/70 dark:text-luxury-light/70">
                    {post.author.name}
                  </span>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-secondary hover:text-secondary-dark group/btn"
                >
                  Read Post
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

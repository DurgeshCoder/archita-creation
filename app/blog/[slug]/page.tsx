import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, ChevronRight } from "lucide-react";
import { BLOG_POSTS } from "@/constants";
import PageHeader from "@/components/PageHeader";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | Archita Creation Blog`,
      description: post.excerpt,
      url: `https://www.architacreation.com/blog/${post.slug}`,
      images: [
        {
          url: post.featuredImage,
          alt: post.title,
        },
      ],
      type: "article",
    },
  };
}

// Simple parser to render basic markdown elements (headings, bullet points, paragraphs) in a premium styling
function renderMarkdownContent(content: string) {
  const lines = content.split("\n");
  return lines.map((line, index) => {
    const trimmed = line.trim();
    
    if (trimmed.startsWith("## ")) {
      const text = trimmed.substring(3);
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      return (
        <h2
          key={index}
          id={id}
          className="font-serif text-2xl md:text-3xl font-bold text-primary dark:text-secondary-light mt-10 mb-4 tracking-tight border-b border-luxury-dark/5 dark:border-white/5 pb-2 scroll-mt-24"
        >
          {text}
        </h2>
      );
    }
    
    if (trimmed.startsWith("### ")) {
      const text = trimmed.substring(4);
      return (
        <h3 key={index} className="font-serif text-xl font-bold text-primary dark:text-white mt-8 mb-3">
          {text}
        </h3>
      );
    }
    
    if (trimmed.startsWith("- ")) {
      return (
        <li key={index} className="ml-6 list-disc text-sm text-luxury-dark/85 dark:text-white/80 leading-relaxed font-light mb-2">
          {trimmed.substring(2)}
        </li>
      );
    }
    
    if (trimmed.startsWith("1. ") || trimmed.startsWith("2. ") || trimmed.startsWith("3. ") || trimmed.startsWith("4. ")) {
      return (
        <li key={index} className="ml-6 list-decimal text-sm text-luxury-dark/85 dark:text-white/80 leading-relaxed font-light mb-2">
          {trimmed.substring(3)}
        </li>
      );
    }
    
    if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
      return (
        <p key={index} className="font-sans text-sm font-semibold text-primary dark:text-secondary-light mt-4 mb-2">
          {trimmed.replace(/\*\*/g, "")}
        </p>
      );
    }

    if (trimmed === "---") {
      return <hr key={index} className="my-8 border-t border-luxury-dark/10 dark:border-white/10" />;
    }

    if (trimmed === "") {
      return null;
    }

    // Handle normal paragraphs
    // Simple inline bold parser
    const parts = trimmed.split("**");
    if (parts.length > 1) {
      return (
        <p key={index} className="font-sans text-sm text-luxury-dark/75 dark:text-white/70 leading-relaxed font-light mb-4">
          {parts.map((part, i) => (i % 2 === 1 ? <strong key={i} className="font-bold text-primary dark:text-white">{part}</strong> : part))}
        </p>
      );
    }

    return (
      <p key={index} className="font-sans text-sm text-luxury-dark/75 dark:text-white/70 leading-relaxed font-light mb-4">
        {trimmed}
      </p>
    );
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // Related articles (max 2)
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  // Article JSON-LD Structured Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": [`https://www.architacreation.com${post.featuredImage}`],
    "datePublished": "2026-06-25T10:00:00+05:30",
    "dateModified": "2026-06-25T10:00:00+05:30",
    "author": [
      {
        "@type": "Person",
        "name": post.author.name,
        "jobTitle": post.author.role,
      },
    ],
    "publisher": {
      "@type": "Organization",
      "name": "Archita Creation",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.architacreation.com/images/logo.png",
      },
    },
    "description": post.excerpt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.architacreation.com/blog/${post.slug}`,
    },
  };

  return (
    <>
      {/* Article Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <PageHeader
        title={post.title}
        breadcrumbs={[{ name: "Blog", href: "/blog" }, { name: post.category }]}
      />

      <section className="py-24 bg-white dark:bg-luxury-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Back Action */}
          <Link
            href="/blog"
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-luxury-dark/60 dark:text-white/60 hover:text-secondary mb-12"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog Library
          </Link>

          {/* Featured Image Banner */}
          <div className="relative h-[350px] md:h-[480px] w-full rounded-3xl overflow-hidden shadow-lg mb-16">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-primary/10" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column: Article Body & Author */}
            <div className="lg:col-span-8">
              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-6 text-xs text-luxury-dark/50 dark:text-white/50 uppercase tracking-wider mb-6 pb-6 border-b border-luxury-dark/5 dark:border-white/5">
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-secondary" /> {post.date}
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-secondary" /> {post.readTime}
                </span>
                <span className="bg-primary/5 dark:bg-secondary/10 px-3 py-1 rounded-full text-[10px] text-primary dark:text-secondary-light font-bold">
                  {post.category}
                </span>
              </div>

              {/* Parsed Body */}
              <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
                {renderMarkdownContent(post.content)}
              </div>

              {/* Author Author Bio Card */}
              <div className="mt-16 bg-accent/25 dark:bg-luxury-dark/40 border border-luxury-dark/5 dark:border-white/5 p-8 rounded-3xl flex items-center space-x-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-secondary">
                  <Image
                    src={post.author.image}
                    alt={post.author.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-secondary font-semibold uppercase tracking-widest">
                    Written By
                  </span>
                  <h3 className="font-serif text-lg font-bold text-primary dark:text-secondary-light mt-0.5">
                    {post.author.name}
                  </h3>
                  <p className="text-xs text-luxury-dark/60 dark:text-white/60 font-light mt-1">
                    {post.author.role} - Textile industry consultant specializing in organic staple fibers and retail styling.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Table of Contents & Related Posts */}
            <aside className="lg:col-span-4 flex flex-col space-y-10">
              {/* Table of Contents */}
              <div className="bg-accent/20 dark:bg-luxury-dark/30 border border-luxury-dark/5 dark:border-white/5 p-8 rounded-3xl sticky top-24">
                <h3 className="font-serif text-lg font-bold text-primary dark:text-secondary-light mb-4 border-b border-luxury-dark/10 dark:border-white/10 pb-2">
                  Table of Contents
                </h3>
                <nav className="flex flex-col space-y-3">
                  {post.tableOfContents.map((item) => {
                    const id = item.id;
                    return (
                      <Link
                        key={id}
                        href={`#${id}`}
                        className="text-xs text-luxury-dark/70 dark:text-white/70 hover:text-secondary flex items-center group font-light"
                      >
                        <ChevronRight className="w-3.5 h-3.5 mr-1 text-secondary/40 group-hover:text-secondary transition-colors" />
                        {item.text}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Related Articles List */}
              {relatedPosts.length > 0 && (
                <div className="bg-white dark:bg-luxury-dark/20 border border-luxury-dark/5 dark:border-white/5 p-8 rounded-3xl">
                  <h3 className="font-serif text-lg font-bold text-primary dark:text-secondary-light mb-6 border-b border-luxury-dark/10 dark:border-white/10 pb-2">
                    Related Articles
                  </h3>
                  <div className="flex flex-col space-y-6">
                    {relatedPosts.map((rPost) => (
                      <Link
                        key={rPost.slug}
                        href={`/blog/${rPost.slug}`}
                        className="group flex flex-col space-y-2 border-b border-luxury-dark/5 pb-4 last:border-b-0 last:pb-0"
                      >
                        <span className="text-[9px] tracking-wider uppercase text-secondary font-bold">
                          {rPost.category}
                        </span>
                        <h4 className="font-serif text-sm font-bold text-primary dark:text-secondary-light group-hover:text-secondary leading-snug transition-colors line-clamp-2">
                          {rPost.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import { useEffect, useState, use } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import ProductForm from "@/components/admin/ProductForm";
import { Loader2 } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditProductPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/products/${resolvedParams.id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => console.error("Error loading product:", err))
      .finally(() => setLoading(false));
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center py-32">
        <Loader2 className="w-8 h-8 text-secondary animate-spin" />
      </div>
    );
  }

  if (!product || product.error) {
    return (
      <div className="flex-1 p-8 text-center text-sm text-neutral-500">
        Product not found.
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title={`Edit: ${product.name}`}
        description={`Updating product details for /products/${product.slug || product.id}`}
      />
      <ProductForm initialData={product} isEdit={true} />
    </div>
  );
}

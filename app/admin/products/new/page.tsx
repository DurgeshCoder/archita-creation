import AdminHeader from "@/components/admin/AdminHeader";
import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Add New Bedding Product"
        description="Publish a new luxury bedsheet, comforter, dohar, or blanket to the live catalog"
      />
      <ProductForm isEdit={false} />
    </div>
  );
}

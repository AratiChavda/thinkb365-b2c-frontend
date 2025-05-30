import ProductForm from "@/components/admin/products/productForm";
import ProductManagement from "@/components/admin/products/productManagement";
import { brandAPI, categoryAPI } from "@/lib/api";
import { useEffect, useState } from "react";

const ProductPage = () => {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const [brandsResponse, categoriesResponse] = await Promise.all([
        brandAPI.getAll(),
        categoryAPI.getAll(),
      ]);
      setBrands(brandsResponse.data);
      setCategories(categoriesResponse.data);
    };
    fetchData();
  });

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
  };

  return isAdding ? (
    <ProductForm
      brands={brands}
      categories={categories}
      editingId={editingId}
      onCancel={handleCancel}
    />
  ) : (
    <ProductManagement setIsAdding={setIsAdding} setEditingId={setEditingId} />
  );
};

export default ProductPage;

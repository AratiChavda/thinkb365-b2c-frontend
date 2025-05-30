import CategoryForm from "@/components/admin/category/categoryForm";
import CategoryManagement from "@/components/admin/category/categoryManagement";
import { useState } from "react";

const CategoryPage = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
  };

  return isAdding ? (
    <CategoryForm editingId={editingId} onCancel={handleCancel} />
  ) : (
    <CategoryManagement setIsAdding={setIsAdding} setEditingId={setEditingId} />
  );
};

export default CategoryPage;

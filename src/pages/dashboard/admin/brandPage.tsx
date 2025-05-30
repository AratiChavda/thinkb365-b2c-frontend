import BrandForm from "@/components/admin/brand/brandForm";
import BrandManagement from "@/components/admin/brand/brandMangement";
import { useState } from "react";

const BrandPage = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
  };

  return isAdding ? (
    <BrandForm editingId={editingId} onCancel={handleCancel} />
  ) : (
    <BrandManagement setIsAdding={setIsAdding} setEditingId={setEditingId} />
  );
};

export default BrandPage;

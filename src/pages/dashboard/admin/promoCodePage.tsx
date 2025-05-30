import PromoCodeForm from "@/components/admin/promoCode/promoCodeForm";
import PromoCodeManagement from "@/components/admin/promoCode/promoCodeManagement";
import { useState } from "react";

const PromoCodePage = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
  };

  return isAdding ? (
    <PromoCodeForm editingId={editingId} onCancel={handleCancel} />
  ) : (
    <PromoCodeManagement
      setIsAdding={setIsAdding}
      setEditingId={setEditingId}
    />
  );
};

export default PromoCodePage;

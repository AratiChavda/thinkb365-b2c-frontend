import OfferForm from "@/components/admin/offer/offerForm";
import OfferManagement from "@/components/admin/offer/offerManagement";
import { useState } from "react";

const OfferPage = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
  };

  return isAdding ? (
    <OfferForm editingId={editingId} onCancel={handleCancel} />
  ) : (
    <OfferManagement setIsAdding={setIsAdding} setEditingId={setEditingId} />
  );
};

export default OfferPage;

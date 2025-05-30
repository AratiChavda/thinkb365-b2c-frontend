import AddOnForm from "@/components/admin/addOns/addOnsForm";
import AddOnManagement from "@/components/admin/addOns/addOnsMangement";

import { useState } from "react";

const AddOnPage = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
  };

  return isAdding ? (
    <AddOnForm editingId={editingId} onCancel={handleCancel} />
  ) : (
    <AddOnManagement setIsAdding={setIsAdding} setEditingId={setEditingId} />
  );
};

export default AddOnPage;

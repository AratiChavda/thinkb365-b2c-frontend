import UserForm from "@/components/admin/user/userForm";
import UserManagement from "@/components/admin/user/userManagement";
import { useState } from "react";

const UserPage = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
  };

  return isAdding ? (
    <UserForm editingId={editingId} onCancel={handleCancel} />
  ) : (
    <UserManagement setIsAdding={setIsAdding} setEditingId={setEditingId} />
  );
};

export default UserPage;

import SubscriptionForm from "@/components/admin/supscription/supscriptionForm";
import SubscriptionManagement from "@/components/admin/supscription/supscriptionManagement";
import { offerAPI, productAPI } from "@/lib/api";
import { useEffect, useState } from "react";

const SubscriptionPage = () => {
  const [offers, setOffers] = useState([]);
  const [products, setProducts] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const [offersResponse, productsResponse] = await Promise.all([
        offerAPI.getAll(),
        productAPI.getAll(),
      ]);
      setOffers(offersResponse.data);
      setProducts(productsResponse.data);
    };
    fetchData();
  }, []);

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
  };

  return isAdding ? (
    <SubscriptionForm
      offers={offers}
      products={products}
      editingId={editingId}
      onCancel={handleCancel}
    />
  ) : (
    <SubscriptionManagement
      setIsAdding={setIsAdding}
      setEditingId={setEditingId}
    />
  );
};

export default SubscriptionPage;

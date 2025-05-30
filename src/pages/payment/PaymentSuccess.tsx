import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  CheckCircleIcon,
  ArrowRightIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { subscriptionsItemsAPI } from "@/lib/api";

const PaymentSuccess = () => {
  const [subId, setSubId] = useState(0);
  const [isActivating, setIsActivating] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const encodedId = params.get("subscription");
    if (encodedId) {
      setSubId(Number(atob(encodedId)));
    }
  }, [location]);

  const handleActivate = async () => {
    setIsActivating(true);
    try {
      const response: any = await subscriptionsItemsAPI.active(subId);
      if (response?.data?.message) {
        alert(response?.message);
      }
    } finally {
      navigate("/dashboard");
      setIsActivating(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <motion.div
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-6">
          <CheckCircleIcon className="w-20 h-20 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Payment Successful!
          </h1>
          <p className="text-blue-600 mb-6">Thank you for your subscription</p>
        </div>

        <div className="space-y-4">
          <motion.button
            onClick={handleActivate}
            disabled={isActivating}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg
                     flex items-center justify-center gap-2 font-medium transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowRightIcon className="w-5 h-5" />
            {isActivating ? "Activating..." : "Activate Now"}
          </motion.button>

          <button
            onClick={() => navigate("/")}
            className="w-full border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-lg
                     hover:bg-blue-50 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <ClockIcon className="w-5 h-5" />
            Activate Later
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;

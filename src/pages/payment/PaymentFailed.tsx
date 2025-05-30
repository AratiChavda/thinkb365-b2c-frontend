import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { XCircleIcon, ArrowPathIcon, HomeIcon } from "@heroicons/react/24/solid";

const PaymentFailure = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
      <motion.div
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-6">
          <XCircleIcon className="w-20 h-20 text-red-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Payment Failed
          </h1>
          <p className="text-red-600 mb-6">
            We couldn't process your payment
          </p>
        </div>

        <div className="space-y-4">
          <motion.button
            onClick={() => navigate("/checkout")}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg
                     flex items-center justify-center gap-2 font-medium transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowPathIcon className="w-5 h-5" />
            Retry Payment
          </motion.button>
          
          <button
            onClick={() => navigate("/")}
            className="w-full border-2 border-red-600 text-red-600 py-3 px-6 rounded-lg
                     hover:bg-red-50 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <HomeIcon className="w-5 h-5" />
            Return Home
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-red-100">
          <p className="text-sm text-red-600">
            Need help? Contact our support team
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentFailure;

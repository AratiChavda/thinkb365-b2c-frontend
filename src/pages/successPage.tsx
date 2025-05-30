import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();
  const order = {
    id: "ORD-123456",
    bundle: "Family Entertainment",
    total: 27.48,
    next_billing_date: "July 15, 2023",
    trial_end: "June 22, 2023"
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="mt-4 text-2xl font-bold text-gray-900">
              Subscription Successful!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-600">
              Thank you for your subscription. Your order <span className="font-medium">#{order.id}</span> has been confirmed.
            </p>

            <div className="bg-gray-50 p-4 rounded-lg text-left">
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Plan</span>
                <span className="font-medium">{order.bundle}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Total</span>
                <span className="font-medium">${order.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Next billing date</span>
                <span className="font-medium">{order.next_billing_date}</span>
              </div>
              {order.trial_end && (
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Trial ends</span>
                  <span className="font-medium">{order.trial_end}</span>
                </div>
              )}
            </div>

            <p className="text-sm text-gray-500">
              A confirmation email has been sent to your registered email address with all the details.
            </p>

            <div className="flex flex-col gap-3">
              <Button className="w-full" onClick={() => navigate("/dashboard")}>Go to Dashboard</Button>
              <Button variant="outline" className="w-full">
                Download Invoice
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SuccessPage;
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const PlansPage = () => {
  const navigate = useNavigate();
  const allPlans = [
    {
      id: 1,
      name: "Digital Basic",
      description: "Access to standard digital content",
      bundle_type: "individual",
      pricing: 9.99,
      billing_period: "monthly",
      max_users: 1,
      products: ["All digital articles", "Daily newsletter", "Basic archives"],
      offer: null,
      category: "digital",
      is_featured: false,
    },
    {
      id: 2,
      name: "Digital Premium",
      description: "Complete digital access with premium features",
      bundle_type: "individual",
      pricing: 14.99,
      billing_period: "monthly",
      max_users: 1,
      products: [
        "All digital articles",
        "Premium newsletters",
        "Full archives",
        "Audio articles",
      ],
      offer: {
        discount_type: "percentage",
        discount_value: 15,
        end_date: "2023-12-31",
      },
      category: "digital",
      is_featured: true,
    },
    {
      id: 3,
      name: "Print + Digital",
      description: "Complete access with weekend print edition",
      bundle_type: "individual",
      pricing: 24.99,
      billing_period: "monthly",
      max_users: 1,
      products: [
        "Print weekend edition",
        "All digital access",
        "Full archives",
      ],
      trial_period_days: 7,
      category: "print",
      is_featured: false,
    },
    {
      id: 4,
      name: "Family Digital",
      description: "Share with up to 5 family members",
      bundle_type: "family",
      pricing: 29.99,
      billing_period: "monthly",
      max_users: 5,
      products: ["Shared digital access", "Family profiles", "Kids content"],
      category: "digital",
      is_featured: true,
    },
    {
      id: 5,
      name: "Student Plan",
      description: "Discounted access for students",
      bundle_type: "student",
      pricing: 4.99,
      billing_period: "monthly",
      max_users: 1,
      products: ["All digital articles", "Basic archives"],
      category: "discount",
      is_featured: false,
    },
    {
      id: 6,
      name: "Annual Saver",
      description: "Save with annual billing",
      bundle_type: "individual",
      pricing: 99.99,
      billing_period: "yearly",
      max_users: 1,
      products: [
        "All digital articles",
        "Premium newsletters",
        "Full archives",
      ],
      category: "digital",
      is_featured: false,
    },
  ];

  const allAddons = [
    {
      id: 1,
      name: "Crossword Unlimited",
      description: "Access to our premium crossword puzzles",
      pricing: 2.99,
      billing_period: "monthly",
      category: "puzzles",
    },
    {
      id: 2,
      name: "Print Daily",
      description: "Add daily print delivery",
      pricing: 15.99,
      billing_period: "monthly",
      category: "print",
    },
    {
      id: 3,
      name: "Premium Magazine",
      description: "Our monthly premium magazine",
      pricing: 5.99,
      billing_period: "monthly",
      category: "magazine",
    },
    {
      id: 4,
      name: "Audio Stories",
      description: "Audio versions of top stories",
      pricing: 3.99,
      billing_period: "monthly",
      category: "audio",
    },
  ];

  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const [selectedBundle, setSelectedBundle] = useState<number | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPlans = allPlans.filter((plan) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "featured" && plan.is_featured) ||
      plan.category === activeTab;
    const matchesSearch =
      plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const calculatePrice = (basePrice: number) => {
    return billingCycle === "yearly" ? basePrice * 12 * 0.85 : basePrice;
  };

  const calculateTotal = () => {
    const bundle = allPlans.find((p) => p.id === selectedBundle);
    if (!bundle) return 0;

    let total = calculatePrice(bundle.pricing);

    selectedAddons.forEach((addonId) => {
      const addon = allAddons.find((a) => a.id === addonId);
      if (addon) {
        total += calculatePrice(addon.pricing);
      }
    });

    return total;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Subscription
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get unlimited access to our premium journalism. Select the plan that
            works for you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center mb-12"
        >
          <div className="bg-gray-100 p-1 rounded-full inline-flex">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                billingCycle === "monthly"
                  ? "bg-white shadow-sm text-gray-900"
                  : "text-gray-600"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                billingCycle === "yearly"
                  ? "bg-white shadow-sm text-gray-900"
                  : "text-gray-600"
              }`}
            >
              Yearly <span className="text-green-600 ml-1">(Save 15%)</span>
            </button>
          </div>
        </motion.div>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <Input
              placeholder="Search plans..."
              className="max-w-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="featured">Featured</TabsTrigger>
                <TabsTrigger value="digital">Digital</TabsTrigger>
                <TabsTrigger value="print">Print</TabsTrigger>
                <TabsTrigger value="discount">Discount</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredPlans.length > 0 ? (
            filteredPlans.map((plan) => (
              <motion.div
                key={plan.id}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                layout
              >
                <Card
                  className={`h-full flex flex-col transition-all border-2 ${
                    selectedBundle === plan.id
                      ? "border-indigo-500 shadow-lg"
                      : "border-transparent hover:border-gray-200"
                  } ${plan.is_featured ? "ring-2 ring-yellow-400" : ""}`}
                >
                  {plan.is_featured && (
                    <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 px-3 py-1 text-xs font-bold rounded-bl-lg rounded-tr-lg">
                      POPULAR
                    </div>
                  )}
                  <CardHeader>
                    <div>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="mb-6">
                      <span className="text-4xl font-bold">
                        ${calculatePrice(plan.pricing).toFixed(2)}
                      </span>
                      <span className="text-gray-500">
                        /{billingCycle === "yearly" ? "year" : "month"}
                      </span>
                      {billingCycle === "yearly" && (
                        <p className="text-sm text-gray-500 mt-1">
                          <s>${(plan.pricing * 12).toFixed(2)}</s> • Save $
                          {(plan.pricing * 12 * 0.15).toFixed(2)}
                        </p>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Includes:</h3>
                        <ul className="space-y-2">
                          {plan.products.map((product, i) => (
                            <li key={i} className="flex items-start">
                              <svg
                                className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span>{product}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {plan.trial_period_days && plan.trial_period_days > 0 && (
                        <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                          <p className="text-blue-800 font-medium">
                            {plan.trial_period_days}-day free trial
                          </p>
                        </div>
                      )}

                      {plan.offer && (
                        <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                          <p className="text-green-800 font-medium">
                            {plan.offer.discount_value}% off until{" "}
                            {new Date(plan.offer.end_date).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      variant={
                        selectedBundle === plan.id ? "default" : "outline"
                      }
                      onClick={() => setSelectedBundle(plan.id)}
                    >
                      {selectedBundle === plan.id ? "Selected" : "Select Plan"}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No plans found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>

        {selectedBundle && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Enhance Your Subscription
            </h2>
            <p className="text-gray-600 mb-8 max-w-3xl">
              Add these premium extras to get the most from your subscription
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {allAddons.map((addon) => (
                <motion.div
                  key={addon.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  layout
                >
                  <Card
                    className={`cursor-pointer transition-all h-full flex flex-col ${
                      selectedAddons.includes(addon.id)
                        ? "ring-2 ring-indigo-500 bg-indigo-50"
                        : ""
                    }`}
                    onClick={() => {
                      if (selectedAddons.includes(addon.id)) {
                        setSelectedAddons(
                          selectedAddons.filter((id) => id !== addon.id)
                        );
                      } else {
                        setSelectedAddons([...selectedAddons, addon.id]);
                      }
                    }}
                  >
                    <CardHeader>
                      <CardTitle>{addon.name}</CardTitle>
                      <CardDescription>{addon.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-lg font-semibold">
                        ${calculatePrice(addon.pricing).toFixed(2)}/
                        {billingCycle === "yearly" ? "year" : "month"}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant={
                          selectedAddons.includes(addon.id)
                            ? "default"
                            : "outline"
                        }
                        className="w-full"
                      >
                        {selectedAddons.includes(addon.id) ? "Added" : "Add"}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {(selectedBundle || selectedAddons.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="sticky bottom-0 bg-white border-t border-gray-200 py-6 shadow-lg"
          >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Your Selection</h3>
                <p className="text-sm text-gray-600">
                  {selectedBundle &&
                    allPlans.find((p) => p.id === selectedBundle)?.name}
                  {selectedAddons.length > 0 &&
                    ` + ${selectedAddons.length} add-ons`}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${calculateTotal().toFixed(2)}/
                    {billingCycle === "yearly" ? "year" : "month"}
                  </p>
                </div>
                <Button size="lg" className="px-8" onClick={() => navigate("/checkout")}> 
                  Continue to Checkout
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PlansPage;

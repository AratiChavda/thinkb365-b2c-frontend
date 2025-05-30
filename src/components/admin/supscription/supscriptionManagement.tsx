import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { bundleAPI } from "@/lib/api";

export type BillingPeriod = "daily" | "weekly" | "monthly" | "yearly";
export type BundleType = "basic" | "standard" | "premium";

type Subscription = {
  id: number;
  name: string;
  description: string;
  bundle_type: BundleType;
  pricing: number;
  billing_period: BillingPeriod;
  billing_cycle_length: number;
  trial_period_days: number;
  is_active: boolean;
  max_users: number;
  cancellation_policy: string;
  is_cancellable: boolean;
  cancellation_notice_days: number;
  cancellation_fee: number;
  lock_in_period_days: number;
  cancellation_rules: Record<string, any>;
  offer_id: number | null;
  products_count: number;
};


const getBundleColor = (bundle: BundleType) => {
  switch (bundle) {
    case "basic":
      return "bg-gray-100 text-gray-800";
    case "standard":
      return "bg-blue-100 text-blue-800";
    case "premium":
      return "bg-purple-100 text-purple-800";
  }
};

const formatBillingCycle = (period: BillingPeriod, length: number): string => {
  const pluralize = (word: string, count: number) =>
    count !== 1 ? word + "s" : word;

  return `${length} ${pluralize(period, length)}`;
};

const SubscriptionManagement = ({ setIsAdding, setEditingId }: any) => {
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc" as "asc" | "desc",
  });

 
  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const response = await bundleAPI.getAll();
      setSubscriptions(response.data);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    }
  };

  const startEdit = (brand: any) => {
    setEditingId(brand.id);
    setIsAdding(true);
  };

  const filteredAndSortedSubs = subscriptions
    .filter(
      (sub) =>
        sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortConfig.key as keyof Subscription];
      const bValue = b[sortConfig.key as keyof Subscription];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (aValue && bValue && aValue < bValue)
        return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue && bValue && aValue > bValue)
        return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-1"
        >
          <h1 className="text-3xl font-bold text-gray-800">
            Subscription Management
          </h1>
          <p className="text-gray-500">
            Manage all your subscriptions and product mappings
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-4"
        >
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode(viewMode === "table" ? "grid" : "table")}
          >
            {viewMode === "table" ? (
              <Icons.lGrid className="h-4 w-4" />
            ) : (
              <Icons.lList className="h-4 w-4" />
            )}
          </Button>
          <Button
            onClick={() => {
              setIsAdding(true);
              setEditingId(null);
            }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-full shadow-md"
          >
            <Icons.plus className="h-4 w-4 mr-2" />
            Add Subscription
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="mb-8"
      >
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icons.search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            placeholder="Search brand by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-3 rounded-full border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-3"
            >
              <Icons.x className="h-5 w-5 text-gray-400" />
            </button>
          )}
        </div>
      </motion.div>

      {viewMode === "table" ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="rounded-xl overflow-hidden shadow-sm border-0">
            <CardContent className="p-0">
              {filteredAndSortedSubs.length ? (
                <div className="overflow-x-auto">
                  <table className="w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <Button
                            variant="ghost"
                            onClick={() =>
                              sortConfig.key === "name" &&
                              sortConfig.direction === "asc"
                                ? setSortConfig({
                                    key: "name",
                                    direction: "desc",
                                  })
                                : setSortConfig({
                                    key: "name",
                                    direction: "asc",
                                  })
                            }
                          >
                            Name
                            <Icons.sortDesc
                              className={`h-4 w-4 transition-transform ${
                                sortConfig.key === "name" &&
                                sortConfig.direction === "desc"
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                          </Button>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Pricing
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Billing Cycle
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Products
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {filteredAndSortedSubs.map((sub: any) => (
                        <motion.tr
                          key={sub.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                            {sub.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getBundleColor(
                                sub.bundle_type
                              )}`}
                            >
                              {sub.bundle_type.charAt(0).toUpperCase() +
                                sub.bundle_type.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                            <span className="font-bold">${sub.pricing}</span> /{" "}
                            {formatBillingCycle(
                              sub.billing_period,
                              sub.billing_cycle_length
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                            {sub.trial_period_days > 0
                              ? `${sub.trial_period_days} days free trial`
                              : "No trial"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                            {sub.products_count} products
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => startEdit(sub)}
                                className="hover:bg-gray-100 rounded-full"
                              >
                                <Icons.edit className="h-4 w-4 text-gray-600" />
                              </Button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="col-span-full"
                >
                  <Card className="rounded-xl border-0 shadow-sm">
                    <CardContent className="p-8 text-center">
                      <Icons.subscription className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        No subscription found
                      </h3>
                      <p className="text-gray-500 mb-6">
                        Try adjusting your search or create a new subscription
                      </p>
                      <Button
                        onClick={() => {
                          setIsAdding(true);
                          setEditingId(null);
                        }}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-full shadow-md"
                      >
                        <Icons.plus className="h-4 w-4 mr-2" />
                        Add Subscription
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
            {filteredAndSortedSubs.length > 0 ? (
              filteredAndSortedSubs.map((sub: any) => (
                <motion.div
                  key={sub.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="hover:shadow-lg transition-shadow duration-300 rounded-xl border-0 overflow-hidden group">
                    <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
                      <h3 className="text-xl font-bold">{sub.name}</h3>
                      <span className="block mt-1 text-sm opacity-90">
                        {sub.description.substring(0, 50)}...
                      </span>
                      {sub.offer_id && (
                        <span className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
                          Offer #{sub.offer_id?.name}
                        </span>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Type</span>
                          <span
                            className={`text-xs font-semibold px-2 py-1 rounded ${getBundleColor(
                              sub.bundle_type
                            )}`}
                          >
                            {sub.bundle_type.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Price</span>
                          <span className="font-bold text-lg">
                            ${sub.pricing}/mo
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">
                            Products
                          </span>
                          <span>{sub.products_count}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Trial</span>
                          <span>
                            {sub.trial_period_days > 0
                              ? `${sub.trial_period_days} Days`
                              : "-"}
                          </span>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full"
                          >
                            <Icons.moreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="rounded-lg shadow-lg"
                        >
                          <DropdownMenuItem
                            onClick={() => startEdit(sub)}
                            className="focus:bg-indigo-50"
                          >
                            <Icons.edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="col-span-full"
              >
                <Card className="rounded-xl border-0 shadow-sm">
                  <CardContent className="p-8 text-center">
                    <Icons.subscription className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      No subscription found
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Try adjusting your search or create a new subscription
                    </p>
                    <Button
                      onClick={() => {
                        setIsAdding(true);
                        setEditingId(null);
                      }}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-full shadow-md"
                    >
                      <Icons.plus className="h-4 w-4 mr-2" />
                      Add Subscription
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default SubscriptionManagement;

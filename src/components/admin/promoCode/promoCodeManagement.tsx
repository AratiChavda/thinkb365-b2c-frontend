import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { promoCodeAPI } from "@/lib/api";
import { Icons } from "@/components/icons";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { discountType } from "@/types/product";

const PromoCodeManagement = ({ setIsAdding, setEditingId }: any) => {
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [promoCodes, setPromoCodes] = useState<any[]>([]);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc" as "asc" | "desc",
  });

  useEffect(() => {
    fetchPromoCodes();
  }, []);

  const fetchPromoCodes = async () => {
    try {
      const response = await promoCodeAPI.getAll();
      setPromoCodes(response.data);
    } catch (error) {
      console.error("Error fetching promoCodes:", error);
    }
  };

  const startEdit = (promoCode: any) => {
    setEditingId(promoCode.id);
    setIsAdding(true);
  };

  const sortData = (key: string) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  const filteredPromoCodes = promoCodes
    .filter(
      (item) =>
        item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.discount_value.toLowerCase().includes(searchTerm.toLowerCase()) ||
        discountType[item.discount_type as keyof typeof discountType]
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-800">
            Promo Codes Management
          </h1>
          <p className="text-gray-500">
            Boost sales with smart discounts and time-limited offers
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
            {viewMode === "table" ? <Icons.lGrid /> : <Icons.lList />}
          </Button>
          <Button
            onClick={() => {
              setIsAdding(true);
              setEditingId(null);
            }}
          >
            <Icons.plus className="mr-2 h-4 w-4" />
            Add Promo Code
          </Button>
        </motion.div>
      </div>

      <div className="mb-6 relative max-w-md">
        <Input
          placeholder="Search promoCode by code"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-3 rounded-full"
        />
        <Icons.search className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-3"
          >
            <Icons.x className="h-5 w-5 text-gray-400" />
          </button>
        )}
      </div>

      {viewMode === "table" ? (
        <Card>
          <CardContent className="p-0">
            {filteredPromoCodes.length ? (
              <div className="overflow-x-auto">
                <table className="w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        <Button
                          variant="ghost"
                          onClick={() => sortData("code")}
                        >
                          Code
                          <Icons.sortDesc
                            className={`ml-2 h-4 w-4 ${
                              sortConfig.key === "code" &&
                              sortConfig.direction === "desc"
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </Button>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Value
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Used
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Min Purchase
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Start Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        End Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Created At
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {filteredPromoCodes.map((promoCode) => (
                      <tr key={promoCode.id}>
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {promoCode.code}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {promoCode.discount_type}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {promoCode.discount_value}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {promoCode?.used_count || 0} /{" "}
                          {promoCode?.usage_limit || 0}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {promoCode.min_purchase}
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                          {new Date(promoCode.start_date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                          {promoCode.end_date
                            ? new Date(promoCode.end_date).toLocaleDateString()
                            : ""}
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                          {new Date(promoCode.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => startEdit(promoCode)}
                          >
                            <Icons.edit className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
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
                    <Icons.promotions className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      No promo Codes found
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Try adjusting your search or create a new promoCode
                    </p>
                    <Button
                      onClick={() => {
                        setIsAdding(true);
                        setEditingId(null);
                      }}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-full shadow-md"
                    >
                      <Icons.plus className="h-4 w-4 mr-2" />
                      Add Promo Code
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </CardContent>
        </Card>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
            {filteredPromoCodes.length > 0 ? (
              filteredPromoCodes.map((promoCode: any) => (
                <motion.div
                  key={promoCode.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="hover:shadow-lg transition-shadow duration-300 rounded-xl border-0">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h3 className="text-lg font-semibold">
                              {promoCode.code}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {
                                discountType[
                                  promoCode.discount_type as keyof typeof discountType
                                ]
                              }
                            </p>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                            {promoCode.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                promoCode.is_active
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {promoCode.is_active ? "Active" : "Inactive"}
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
                              onClick={() => startEdit(promoCode)}
                              className="focus:bg-indigo-50"
                            >
                              <Icons.edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center text-xs text-gray-500">
                          <svg
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          Created{" "}
                          {new Date(promoCode.createdAt).toLocaleDateString()}
                        </div>
                      </div>
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
                    <Icons.promotions className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      No promo Codes found
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Try adjusting your search or create a new promoCode
                    </p>
                    <Button
                      onClick={() => {
                        setIsAdding(true);
                        setEditingId(null);
                      }}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-full shadow-md"
                    >
                      <Icons.plus className="h-4 w-4 mr-2" />
                      Add Promo Code
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

export default PromoCodeManagement;

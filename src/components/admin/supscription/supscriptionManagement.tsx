import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DataTable from "@/components/table/dataTable";
import { DataTablePagination } from "@/components/table/dataTablePagination";
import { useTableData } from "@/hooks/useTableData";
import GlobalFilter from "@/components/table/globalFilter";
import { getFormattedDate } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { bundleAPI } from "@/lib/api";
import {
  CalendarClock,
  Gift,
  Lock,
  PackageCheck,
  ShieldCheck,
  Tag,
  Users,
} from "lucide-react";

export type BillingPeriod = "daily" | "weekly" | "monthly" | "yearly";
export type BundleType = "basic" | "standard" | "premium";

const formatBillingCycle = (period: BillingPeriod, length: number): string => {
  const pluralize = (word: string, count: number) =>
    count !== 1 ? word + "s" : word;

  return `${length} ${pluralize(period, length)}`;
};

const SubscriptionManagement = ({ setIsAdding, setEditingId }: any) => {
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const {
    paginatedData,
    page,
    setPage,
    pageCount,
    sorting,
    setSorting,
    globalFilter,
    setGlobalFilter,
  } = useTableData({ data: subscriptions, initialPageSize: 10 });

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

  const InfoItem = ({
    icon,
    label,
    children,
  }: {
    icon: React.ReactNode;
    label: string;
    children: React.ReactNode;
  }) => (
    <div className="flex items-start gap-2">
      <div className="text-gray-500 mt-0.5">{icon}</div>
      <div>
        <div className="text-gray-500">{label}</div>
        <div className="font-medium text-gray-800">{children}</div>
      </div>
    </div>
  );
  return (
    <div className="w-full p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Subscription Management
          </h1>
          <p className="text-sm sm:text-base text-gray-500">
            Manage all your subscriptions and product mappings
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 w-full sm:w-auto"
        >
          <GlobalFilter
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setViewMode(viewMode === "table" ? "grid" : "table")
              }
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
              Add Subscription
            </Button>
          </div>
        </motion.div>
      </div>

      {paginatedData.length ? (
        viewMode === "table" ? (
          <DataTable
            data={paginatedData}
            columns={[
              {
                header: "Name",
                accessorKey: "name",
              },
              {
                header: "Type",
                accessorKey: "bundle_type",
              },
              {
                header: "Pricing",
                accessorKey: "pricing",
              },
              {
                header: "Billing Cycle",
                accessorKey: "name",
                cell: ({ row }: any) => {
                  return (
                    <span>
                      {formatBillingCycle(
                        row.original.billing_period,
                        row.original.billing_cycle_length
                      )}
                    </span>
                  );
                },
              },
              {
                header: "Trial Period",
                accessorKey: "trial_period_days",
              },
              {
                header: "Products",
                accessorKey: "products_count",
              },
              {
                header: "Created At",
                accessorKey: "created_at",
                sortingFn: "datetime",
                cell: ({ _, row }: any) => {
                  return getFormattedDate(row.original.created_at);
                },
              },
              {
                header: "Actions",
                accessorKey: "actions",
                enableSorting: false,
                cell: ({ row }: any) => (
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => startEdit(row.original)}
                    >
                      <Icons.edit className="h-4 w-4" />
                    </Button>
                  </div>
                ),
              },
            ]}
            sorting={sorting}
            onSortingChange={setSorting}
          ></DataTable>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr"
          >
            <AnimatePresence>
              {paginatedData.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full relative hover:shadow-xl shadow-lg transition-shadow duration-300 bg-gradient-to-br from-white to-gray-50  rounded-xl border-0">
                    {item.trial_period_days > 0 && (
                      <div className="absolute top-0 left-0 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-br-lg z-10">
                        🎉 {item.trial_period_days}-Day Trial
                      </div>
                    )}
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {item.description}
                          </p>
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
                          <DropdownMenuContent className="w-24 mt-2 shadow-xl rounded-xl border border-gray-100">
                            <DropdownMenuItem
                              onClick={() => startEdit(item)}
                              className="gap-2 cursor-pointer"
                            >
                              <Icons.edit className="h-4 w-4 mr-2" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 text-sm">
                        <InfoItem
                          icon={<Tag className="w-4 h-4" />}
                          label="Price"
                        >
                          ₹{item.pricing} / {item.billing_period}
                        </InfoItem>
                        <InfoItem
                          icon={<Users className="w-4 h-4" />}
                          label="Max Users"
                        >
                          {item.max_users}
                        </InfoItem>
                        <InfoItem
                          icon={<PackageCheck className="w-4 h-4" />}
                          label="Bundle Type"
                        >
                          {item.bundle_type}
                        </InfoItem>
                        <InfoItem
                          icon={<Gift className="w-4 h-4" />}
                          label="Products"
                        >
                          {item.products_count}
                        </InfoItem>
                        <InfoItem
                          icon={<CalendarClock className="w-4 h-4" />}
                          label="Billing Cycle"
                        >
                          {item.billing_cycle_length}x {item.billing_period}
                        </InfoItem>
                        {item.lock_in_period_days > 0 && (
                          <InfoItem
                            icon={<Lock className="w-4 h-4" />}
                            label="Lock-in"
                          >
                            {item.lock_in_period_days} days
                          </InfoItem>
                        )}
                      </div>
                      {item.is_cancellable && (
                        <div className="mt-4 p-3 bg-gray-100 border rounded-lg flex items-start gap-3 text-sm text-gray-700">
                          <ShieldCheck className="w-5 h-5 mt-1 text-blue-500" />
                          <div>
                            <p className="font-medium mb-1">
                              Cancellation Policy
                            </p>
                            <p>{item.cancellation_policy}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              Notice: {item.cancellation_notice_days} days •
                              Fee: ₹{item.cancellation_fee}
                            </p>
                          </div>
                        </div>
                      )}{" "}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="col-span-full"
        >
          <Card className="rounded-xl border-0 shadow-md bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-primary-100/30 via-primary-50/30 to-primary-100/30">
            <CardContent className="p-8 text-center">
              <Icons.subscription className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No subscriptions found
              </h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search or create a new subscription
              </p>
              <Button
                onClick={() => {
                  setIsAdding(true);
                  setEditingId(null);
                }}
                className="bg-gradient-to-r from-primary-600 to-primary-600 hover:from-primary-700 hover:to-primary-700 rounded-full shadow-md"
              >
                <Icons.plus className="h-4 w-4 mr-2" />
                Add Subscription
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
      <DataTablePagination
        currentPage={page}
        pageCount={pageCount}
        onPageChange={setPage}
      />
    </div>
  );
};

export default SubscriptionManagement;

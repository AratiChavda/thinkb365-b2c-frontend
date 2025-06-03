import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { promoCodeAPI } from "@/lib/api";
import { Icons } from "@/components/icons";
import { Card, CardContent } from "@/components/ui/card";
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
import { Activity, CheckCircle, Percent } from "lucide-react";

const PromoCodeManagement = ({ setIsAdding, setEditingId }: any) => {
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [promoCodes, setPromoCodes] = useState<any[]>([]);
  const {
    paginatedData,
    page,
    setPage,
    pageCount,
    sorting,
    setSorting,
    globalFilter,
    setGlobalFilter,
  } = useTableData({ data: promoCodes, initialPageSize: 10 });

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

  return (
    <div className="w-full p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Promo Codes Management
          </h1>
          <p className="text-sm sm:text-base text-gray-500">
            Boost sales with smart discounts and time-limited offers
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
              Add Promo Code
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
                header: "Code",
                accessorKey: "code",
              },
              {
                header: "Type",
                accessorKey: "discount_type",
              },
              {
                header: "Value",
                accessorKey: "discount_value",
              },
              {
                header: "Used",
                accessorKey: "usage_limit",
                cell: ({ row }: any) => {
                  return (
                    <span>
                      {row.original.used_count}/{row.original.usage_limit}
                    </span>
                  );
                },
              },
              {
                header: "Min Purchase",
                accessorKey: "min_purchase",
              },
              {
                header: "Start Date",
                accessorKey: "start_date",
                sortingFn: "datetime",
                cell: ({ _, row }: any) => {
                  return getFormattedDate(row.original.start_date);
                },
              },
              {
                header: "End Date",
                accessorKey: "end_date",
                sortingFn: "datetime",
                cell: ({ _, row }: any) => {
                  return getFormattedDate(row.original.end_date);
                },
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
                  <Card className="relative h-full hover:shadow-xl transition-shadow duration-300 rounded-2xl border border-gray-200 bg-white">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {item.code}
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

                      <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                        <div className="flex items-center gap-1">
                          <Percent className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">Type:</span>
                          <span className="ml-1 capitalize">
                            {item.discount_type}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Activity className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">Value:</span>
                          <span className="ml-1">
                            {item.discount_value}
                            {item.discount_type === "percentage" ? "%" : "₹"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">Used:</span>
                          <span className="ml-1">
                            {item.used_count} / {item.usage_limit}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">Min Purchase:</span>
                          <span className="ml-1">₹{item.min_purchase}</span>
                        </div>
                      </div>

                      <div className="flex items-center text-xs text-gray-500">
                        <Icons.calendar className="h-4 w-4 mr-1" />
                        Created {getFormattedDate(item.created_at)}
                      </div>
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
              <Icons.promoCodes className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No promo codes found
              </h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search or create a new promo code
              </p>
              <Button
                onClick={() => {
                  setIsAdding(true);
                  setEditingId(null);
                }}
                className="bg-gradient-to-r from-primary-600 to-primary-600 hover:from-primary-700 hover:to-primary-700 rounded-full shadow-md"
              >
                <Icons.plus className="h-4 w-4 mr-2" />
                Add Promo Code
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

export default PromoCodeManagement;

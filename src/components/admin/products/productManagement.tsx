import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { productAPI } from "@/lib/api";
import { Icons } from "@/components/icons";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getProductTypeStyles } from "@/lib/utils";
import DataTable from "@/components/table/dataTable";
import { DataTablePagination } from "@/components/table/dataTablePagination";
import { useTableData } from "@/hooks/useTableData";
import GlobalFilter from "@/components/table/globalFilter";
import { getFormattedDate } from "@/lib/utils";
import { productType } from "@/types/product";

const ProductManagement = ({ setIsAdding, setEditingId }: any) => {
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [products, setProducts] = useState<any[]>([]);
  const {
    paginatedData,
    page,
    setPage,
    pageCount,
    sorting,
    setSorting,
    globalFilter,
    setGlobalFilter,
  } = useTableData({ data: products, initialPageSize: 10 });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productAPI.getAll();
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const startEdit = (product: any) => {
    setEditingId(product.id);
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
            Products Management
          </h1>
          <p className="text-sm sm:text-base text-gray-500">
            Power up your catalog — manage every product in one place
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
              Add Product
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
                header: "Brand",
                accessorKey: "brand.name",
              },
              {
                header: "Category",
                accessorKey: "category.name",
              },
              {
                header: "Type",
                accessorKey: "type",
                cell: ({ row }: any) => {
                  const Icon: any = getProductTypeStyles(
                    row.original.type
                  ).icon;
                  return (
                    <div
                      className={`inline-flex text-nowrap items-center border px-3 py-1 rounded-full text-sm font-medium ${
                        getProductTypeStyles(row.original.type).border
                      } ${getProductTypeStyles(row.original.type).bgColor}`}
                    >
                      <Icon
                        className={`h-4 w-4 mr-1 ${
                          getProductTypeStyles(row.original.type).textColor
                        }`}
                      />
                      {
                        productType[
                          row.original.type as keyof typeof productType
                        ]
                      }
                    </div>
                  );
                },
              },

              {
                header: "Description",
                accessorKey: "description",
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
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence>
              {paginatedData.map((item) => {
                const Icon: any = getProductTypeStyles(item.type).icon;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="hover:shadow-xl transition-shadow duration-300 rounded-2xl border border-gray-200 bg-white">
                      {item.image && (
                        <img
                          src={`${productAPI.filePath}/${item.image}`}
                          alt={item.name}
                          className="w-full h-44 object-cover rounded-t-2xl"
                        />
                      )}

                      <CardContent className="p-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            {item.brand.logo_url ? (
                              <img
                                src={item.brand.logo_url}
                                alt={item.brand.name}
                                className="h-6 w-6 rounded-full"
                              />
                            ) : (
                              <div className="h-6 w-6 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                                {item.brand.name[0]}
                              </div>
                            )}
                            <span className="text-sm font-medium text-gray-700">
                              {item.brand.name}
                            </span>
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

                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {item.description}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2 text-xs">
                          <div
                            className={`inline-flex text-nowrap items-center border px-2 py-0.5 rounded-full text-sm font-medium ${
                              getProductTypeStyles(item.type).border
                            } ${getProductTypeStyles(item.type).bgColor}`}
                          >
                            <Icon
                              className={`h-4 w-4 mr-1 ${
                                getProductTypeStyles(item.type).textColor
                              }`}
                            />
                            {productType[item.type as keyof typeof productType]}
                          </div>
                          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                            {item.category.name}
                          </span>
                          {item.is_active ? (
                            <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
                              Active
                            </span>
                          ) : (
                            <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
                              Inactive
                            </span>
                          )}
                        </div>

                        <div className="flex items-center text-xs text-gray-500">
                          <Icons.calendar className="h-4 w-4 mr-1" />
                          Created {getFormattedDate(item.created_at)}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
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
              <Icons.product className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No products found
              </h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search or create a new product
              </p>
              <Button
                onClick={() => {
                  setIsAdding(true);
                  setEditingId(null);
                }}
                className="bg-gradient-to-r from-primary-600 to-primary-600 hover:from-primary-700 hover:to-primary-700 rounded-full shadow-md"
              >
                <Icons.plus className="h-4 w-4 mr-2" />
                Add Product
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

export default ProductManagement;

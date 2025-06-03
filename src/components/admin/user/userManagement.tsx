import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { userAPI } from "@/lib/api";
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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserManagement = ({ setIsAdding, setEditingId }: any) => {
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [users, setUsers] = useState<any[]>([]);
  const {
    paginatedData,
    page,
    setPage,
    pageCount,
    sorting,
    setSorting,
    globalFilter,
    setGlobalFilter,
  } = useTableData({ data: users, initialPageSize: 10 });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await userAPI.getAll();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const startEdit = (user: any) => {
    setEditingId(user.id);
    setIsAdding(true);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "administrator":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "subscriber":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "household_subscriber":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };
  return (
    <div className="w-full p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Users
          </h1>
          <p className="text-sm sm:text-base text-gray-500">
            Manage system users and permissions
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
              Add User
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
                header: "Email",
                accessorKey: "email",
              },
              {
                header: "Role",
                accessorKey: "role",
                cell: ({ _, row }: any) => {
                  return (
                    <Badge
                      className={`${getRoleColor(
                        row.original.role
                      )} px-3 py-1 rounded-full text-xs font-medium`}
                    >
                      {row.original.role.replace("_", " ")}
                    </Badge>
                  );
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
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence>
              {paginatedData.map((item: any) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="hover:shadow-lg transition-shadow duration-300 rounded-xl border-0">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={item.avatar} />
                            <AvatarFallback className="bg-indigo-100 text-indigo-600">
                              {getInitials(item.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-semibold">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {item.email}
                            </p>
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
                      <Badge
                        className={`${getRoleColor(
                          item.role
                        )} px-3 py-1 rounded-full text-xs font-medium`}
                      >
                        {item.role.replace("_", " ")}
                      </Badge>
                      <div className="flex items-center text-xs text-gray-500 mt-2">
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
              <Icons.users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No categories found
              </h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search or create a new user
              </p>
              <Button
                onClick={() => {
                  setIsAdding(true);
                  setEditingId(null);
                }}
                className="bg-gradient-to-r from-primary-600 to-primary-600 hover:from-primary-700 hover:to-primary-700 rounded-full shadow-md"
              >
                <Icons.plus className="h-4 w-4 mr-2" />
                Add User
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

export default UserManagement;

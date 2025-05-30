// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { AnimatePresence, motion } from "framer-motion";
// import { brandAPI } from "@/lib/api";
// import { Icons } from "@/components/icons";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@radix-ui/react-dropdown-menu";

// const BrandManagement = ({ setIsAdding, setEditingId }: any) => {
//   const [viewMode, setViewMode] = useState<"table" | "grid">("table");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [brands, setBrands] = useState<any[]>([]);
//   const [sortConfig, setSortConfig] = useState<{
//     key: string;
//     direction: "asc" | "desc";
//   }>({ key: "name", direction: "asc" });

//   useEffect(() => {
//     fetchBrands();
//   }, []);

//   const fetchBrands = async () => {
//     try {
//       const response = await brandAPI.getAll();
//       setBrands(response.data);
//     } catch (error) {
//       console.error("Error fetching brands:", error);
//     }
//   };

//   const startEdit = (brand: any) => {
//     setEditingId(brand.id);
//     setIsAdding(true);
//   };

//   const sortData = (key: string) => {
//     setSortConfig({
//       key,
//       direction:
//         sortConfig.key === key && sortConfig.direction === "asc"
//           ? "desc"
//           : "asc",
//     });
//   };

//   const filteredAndSortedBrands = brands
//     .filter(
//       (brand) =>
//         brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         brand.description.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//     .sort((a, b) => {
//       if (sortConfig.direction === "asc") {
//         return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
//       }
//       return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
//     });

//   return (
//     <div className="max-w-7xl mx-auto">
//       <div className="flex justify-between items-center mb-8">
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3 }}
//           className="space-y-1"
//         >
//           <h1 className="text-3xl font-bold text-gray-800">
//             Brands Management
//           </h1>
//           <p className="text-gray-500">Control and organize brand listings</p>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3, delay: 0.1 }}
//           className="flex items-center space-x-4"
//         >
//           <Button
//             variant="outline"
//             size="icon"
//             onClick={() => setViewMode(viewMode === "table" ? "grid" : "table")}
//             className="rounded-full"
//           >
//             {viewMode === "table" ? (
//               <Icons.lGrid className="h-4 w-4" />
//             ) : (
//               <Icons.lList className="h-4 w-4" />
//             )}
//           </Button>
//           <Button
//             onClick={() => {
//               setIsAdding(true);
//               setEditingId(null);
//             }}
//             className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-full shadow-md"
//           >
//             <Icons.plus className="h-4 w-4 mr-2" />
//             Add Brand
//           </Button>
//         </motion.div>
//       </div>

//       <motion.div
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3, delay: 0.2 }}
//         className="mb-8"
//       >
//         <div className="relative max-w-md">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Icons.search className="h-5 w-5 text-gray-400" />
//           </div>
//           <Input
//             placeholder="Search brand by name or description..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-10 pr-4 py-3 rounded-full border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//           />
//           {searchTerm && (
//             <button
//               onClick={() => setSearchTerm("")}
//               className="absolute right-3 top-3"
//             >
//               <Icons.x className="h-5 w-5 text-gray-400" />
//             </button>
//           )}
//         </div>
//       </motion.div>

//       {viewMode === "table" ? (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.4 }}
//         >
//           <Card className="rounded-xl overflow-hidden shadow-sm border-0">
//             <CardContent className="p-0">
//               {filteredAndSortedBrands.length > 0 ? (
//                 <div className="overflow-x-auto">
//                   <table className="w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           <Button
//                             variant="ghost"
//                             onClick={() => sortData("name")}
//                             className="flex items-center space-x-1 hover:bg-gray-100 rounded-lg px-3"
//                           >
//                             <span>Name</span>
//                             <Icons.sortDesc
//                               className={`h-4 w-4 transition-transform ${
//                                 sortConfig.key === "name" &&
//                                 sortConfig.direction === "desc"
//                                   ? "rotate-180"
//                                   : ""
//                               }`}
//                             />
//                           </Button>
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           <Button
//                             variant="ghost"
//                             onClick={() => sortData("description")}
//                             className="flex items-center space-x-1 hover:bg-gray-100 rounded-lg px-3"
//                           >
//                             <span>Description</span>
//                             <Icons.sortDesc
//                               className={`h-4 w-4 transition-transform ${
//                                 sortConfig.key === "description" &&
//                                 sortConfig.direction === "desc"
//                                   ? "rotate-180"
//                                   : ""
//                               }`}
//                             />
//                           </Button>
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Created At
//                         </th>
//                         <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Actions
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {filteredAndSortedBrands.map((brand) => (
//                         <motion.tr
//                           key={brand.id}
//                           initial={{ opacity: 0 }}
//                           animate={{ opacity: 1 }}
//                           transition={{ duration: 0.3 }}
//                           className="hover:bg-gray-50"
//                         >
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="flex items-center">
//                               {brand.logo_url && (
//                                 <img
//                                   src={brand?.logo_url}
//                                   className="h-5 w-5"
//                                 />
//                               )}
//                               <div>
//                                 <div className="font-medium text-gray-900">
//                                   {brand.name}
//                                 </div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-gray-500">
//                             {brand.description}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-gray-500">
//                             {new Date(brand.created_at).toLocaleDateString(
//                               "en-US",
//                               {
//                                 year: "numeric",
//                                 month: "short",
//                                 day: "numeric",
//                               }
//                             )}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                             <div className="flex justify-end space-x-2">
//                               <Button
//                                 variant="ghost"
//                                 size="icon"
//                                 onClick={() => startEdit(brand)}
//                                 className="hover:bg-gray-100 rounded-full"
//                               >
//                                 <Icons.edit className="h-4 w-4 text-gray-600" />
//                               </Button>
//                             </div>
//                           </td>
//                         </motion.tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               ) : (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.4 }}
//                   className="col-span-full"
//                 >
//                   <Card className="rounded-xl border-0 shadow-sm">
//                     <CardContent className="p-8 text-center">
//                       <Icons.brand className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//                       <h3 className="text-lg font-medium text-gray-900 mb-1">
//                         No brands found
//                       </h3>
//                       <p className="text-gray-500 mb-6">
//                         Try adjusting your search or create a new brand
//                       </p>
//                       <Button
//                         onClick={() => {
//                           setIsAdding(true);
//                           setEditingId(null);
//                         }}
//                         className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-full shadow-md"
//                       >
//                         <Icons.plus className="h-4 w-4 mr-2" />
//                         Add Brand
//                       </Button>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               )}
//             </CardContent>
//           </Card>
//         </motion.div>
//       ) : (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.4 }}
//           className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
//         >
//           <AnimatePresence>
//             {filteredAndSortedBrands.length > 0 ? (
//               filteredAndSortedBrands.map((brand) => (
//                 <motion.div
//                   key={brand.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <Card className="hover:shadow-lg transition-shadow duration-300 rounded-xl border-0">
//                     <CardContent className="p-6">
//                       <div className="flex justify-between items-start mb-4">
//                         <div className="flex items-center space-x-4">
//                           {brand.avatar_url && (
//                             <img
//                               src={brand.avatar_url}
//                               alt="brand logo"
//                               className="h-10 w-10 rounded-full"
//                             />
//                           )}
//                           <div>
//                             <h3 className="text-lg font-semibold">
//                               {brand.name}
//                             </h3>
//                             <p className="text-sm text-gray-600">
//                               {brand.description}
//                             </p>
//                           </div>
//                         </div>
//                         <DropdownMenu>
//                           <DropdownMenuTrigger asChild>
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               className="rounded-full"
//                             >
//                               <Icons.moreVertical className="h-4 w-4" />
//                             </Button>
//                           </DropdownMenuTrigger>
//                           <DropdownMenuContent
//                             align="end"
//                             className="rounded-lg shadow-lg"
//                           >
//                             <DropdownMenuItem
//                               onClick={() => startEdit(brand)}
//                               className="focus:bg-indigo-50"
//                             >
//                               <Icons.edit className="h-4 w-4 mr-2" />
//                               Edit
//                             </DropdownMenuItem>
//                           </DropdownMenuContent>
//                         </DropdownMenu>
//                       </div>
//                       <div className="space-y-3">
//                         <div className="flex items-center text-xs text-gray-500">
//                           <svg
//                             className="h-4 w-4 mr-1"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                             />
//                           </svg>
//                           Created{" "}
//                           {new Date(brand.createdAt).toLocaleDateString()}
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               ))
//             ) : (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.4 }}
//                 className="col-span-full"
//               >
//                 <Card className="rounded-xl border-0 shadow-sm">
//                   <CardContent className="p-8 text-center">
//                     <Icons.brand className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//                     <h3 className="text-lg font-medium text-gray-900 mb-1">
//                       No brands found
//                     </h3>
//                     <p className="text-gray-500 mb-6">
//                       Try adjusting your search or create a new brand
//                     </p>
//                     <Button
//                       onClick={() => {
//                         setIsAdding(true);
//                         setEditingId(null);
//                       }}
//                       className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-full shadow-md"
//                     >
//                       <Icons.plus className="h-4 w-4 mr-2" />
//                       Add Brand
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.div>
//       )}
//     </div>
//   );
// };
// export default BrandManagement;

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { brandAPI } from "@/lib/api";
import { Icons } from "@/components/icons";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

const BrandManagement = ({ setIsAdding, setEditingId }: any) => {
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [brands, setBrands] = useState<any[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  }>({ key: "name", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await brandAPI.getAll();
      setBrands(response.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  const startEdit = (brand: any) => {
    setEditingId(brand.id);
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

  const filteredAndSortedBrands = brands
    .filter(
      (brand) =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand?.description?.toLowerCase()?.includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortConfig.direction === "asc") {
        return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
      }
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedBrands.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAndSortedBrands.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-2xl font-bold text-gray-900">Brands</h1>
          <p className="text-gray-500">Manage your brand listings</p>
        </motion.div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icons.search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              placeholder="Search brands..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); 
              }}
              className="pl-10 pr-4 py-2 rounded-lg border-gray-200 focus:ring-1 focus:ring-indigo-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <Icons.x className="h-4 w-4 text-gray-400" />
              </button>
            )}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode(viewMode === "table" ? "grid" : "table")}
            className="rounded-lg"
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
            className="bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm"
          >
            <Icons.plus className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Add Brand</span>
          </Button>
        </div>
      </div>

      {filteredAndSortedBrands.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mt-12"
        >
          <Card className="border-0 shadow-none bg-gray-50">
            <CardContent className="p-8 text-center">
              <div className="mx-auto h-24 w-24 flex items-center justify-center rounded-full bg-indigo-50 mb-4">
                <Icons.brand className="h-12 w-12 text-indigo-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No brands found
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm ? "Try a different search" : "Create your first brand"}
              </p>
              <Button
                onClick={() => {
                  setIsAdding(true);
                  setEditingId(null);
                }}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                <Icons.plus className="h-4 w-4 mr-2" />
                Add Brand
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ) : viewMode === "table" ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="space-y-4"
        >
          <Card className="rounded-lg overflow-hidden border border-gray-200">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <Button
                          variant="ghost"
                          onClick={() => sortData("name")}
                          className="px-3 -ml-3"
                        >
                          <span>Brand</span>
                          <Icons.sortDesc
                            className={`h-4 w-4 ml-1 transition-transform ${
                              sortConfig.key === "name" && sortConfig.direction === "desc"
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </Button>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <Button
                          variant="ghost"
                          onClick={() => sortData("description")}
                          className="px-3 -ml-3"
                        >
                          <span>Description</span>
                          <Icons.sortDesc
                            className={`h-4 w-4 ml-1 transition-transform ${
                              sortConfig.key === "description" && sortConfig.direction === "desc"
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </Button>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentItems.map((brand) => (
                      <motion.tr
                        key={brand.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            {brand.logo_url && (
                              <div className="flex-shrink-0 h-8 w-8 rounded-md bg-gray-100 overflow-hidden">
                                <img
                                  src={brand.logo_url}
                                  alt={brand.name}
                                  className="h-full w-full object-contain"
                                />
                              </div>
                            )}
                            <div className="font-medium text-gray-900">
                              {brand.name}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-500 max-w-xs truncate">
                          {brand.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {new Date(brand.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => startEdit(brand)}
                            className="text-gray-600 hover:text-indigo-600"
                          >
                            <Icons.edit className="h-4 w-4" />
                          </Button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Pagination for table view */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-500">
                Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredAndSortedBrands.length)} of {filteredAndSortedBrands.length} brands
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Show first pages, current page, and last pages
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        className="w-10"
                        onClick={() => paginate(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <>
                      <span className="px-2">...</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-10"
                        onClick={() => paginate(totalPages)}
                      >
                        {totalPages}
                      </Button>
                    </>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {currentItems.map((brand) => (
                <motion.div
                  key={brand.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="hover:shadow-md transition-shadow duration-200 rounded-lg border border-gray-200">
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex items-center gap-3">
                          {brand.logo_url && (
                            <div className="flex-shrink-0 h-10 w-10 rounded-md bg-gray-100 overflow-hidden">
                              <img
                                src={brand.logo_url}
                                alt={brand.name}
                                className="h-full w-full object-contain"
                              />
                            </div>
                          )}
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {brand.name}
                            </h3>
                            <p className="text-sm text-gray-500 line-clamp-1">
                              {brand.description}
                            </p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <Icons.moreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-40 bg-white rounded-md shadow-lg border border-gray-200"
                          >
                            <DropdownMenuItem
                              onClick={() => startEdit(brand)}
                              className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center"
                            >
                              <Icons.edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="mt-4 flex items-center text-xs text-gray-500">
                        <Icons.calender className="h-3 w-3 mr-1.5" />
                        Created{" "}
                        {new Date(brand.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination for grid view */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-500">
                Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredAndSortedBrands.length)} of {filteredAndSortedBrands.length} brands
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Show first pages, current page, and last pages
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        className="w-10"
                        onClick={() => paginate(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <>
                      <span className="px-2">...</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-10"
                        onClick={() => paginate(totalPages)}
                      >
                        {totalPages}
                      </Button>
                    </>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default BrandManagement;
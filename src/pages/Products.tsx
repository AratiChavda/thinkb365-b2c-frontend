// import { useState, useEffect } from "react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Slider } from "@/components/ui/slider";
// import { Badge } from "@/components/ui/badge";
// import {
//   ShoppingCart,
//   Filter,
//   Plus,
//   Check,
//   ArrowRight,
//   Package,
// } from "lucide-react";
// import { motion } from "framer-motion";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { Newspaper, MonitorSmartphone, BookOpen } from "lucide-react";
// import { productType, subscriptionTypeLabels } from "../types/product";
// import { Skeleton } from "@/components/ui/skeleton";
// import { useLocalStorage } from "@uidotdev/usehooks";
// import { API_BASE_URL, productAPI } from "../lib/api";
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerTrigger,
// } from "@/components/ui/drawer";

// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   type: keyof typeof productType;
//   image: string;
//   featured?: boolean;
//   category: string;
// }

// interface FilterState {
//   search: string;
//   category: string;
//   priceRange: [number, number];
//   types?: (keyof typeof productType)[];
// }

// export default function Products() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchParams, setSearchParams] = useSearchParams();
//   const navigate = useNavigate();

//   // Persist filters and cart in localStorage
//   const [filters, setFilters] = useLocalStorage<FilterState>(
//     "subscription-filters",
//     {
//       search: searchParams.get("search") || "",
//       category: searchParams.get("category") || "all",
//       priceRange: [
//         parseInt(searchParams.get("minPrice") || "0"),
//         parseInt(searchParams.get("maxPrice") || "1000"),
//       ],
//       // types:
//       //   (searchParams
//       //     .get("types")
//       //     ?.split(",") as keyof (typeof productType)[]) || [],
//     }
//   );

//   const [cart, setCart] = useLocalStorage<Product[]>("subscription-cart", []);
//   const [compareItems, setCompareItems] = useLocalStorage<Product[]>(
//     "subscription-compare",
//     []
//   );

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setIsLoading(true);
//         const params = new URLSearchParams({
//           search: filters.search,
//           category: filters.category,
//           minPrice: filters.priceRange[0].toString(),
//           maxPrice: filters.priceRange[1].toString(),
//           types: filters.types.join(","),
//         });
//         const response = await productAPI.search(params);
//         setProducts(response.data);
//         setSearchParams(params);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const toggleCompareItem = (product: Product) => {
//     setCompareItems((prev) =>
//       prev.some((p) => p.id === product.id)
//         ? prev.filter((p) => p.id !== product.id)
//         : [...prev, product]
//     );
//   };

//   const addToCart = (product: Product) => {
//     setCart((prev) => {
//       const existing = prev.find((p) => p.id === product.id);
//       return existing ? prev : [...prev, product];
//     });
//   };

//   const removeFromCart = (productId: number) => {
//     setCart((prev) => prev.filter((p) => p.id !== productId));
//   };

//   const getTypeIcon = (type: Product) => {
//     switch (type) {
//       case SubscriptionType.PRINT:
//         return <Newspaper className="h-5 w-5" />;
//       case SubscriptionType.DIGITAL:
//         return <MonitorSmartphone className="h-5 w-5" />;
//       case SubscriptionType.PRINT_AND_DIGITAL:
//         return <BookOpen className="h-5 w-5" />;
//       default:
//         return null;
//     }
//   };

//   const filteredProducts = products.filter((product) => {
//     return (
//       product.name.toLowerCase().includes(filters.search.toLowerCase()) &&
//       (filters.category === "all" || product.category === filters.category) &&
//       (filters.types.length === 0 || filters.types.includes(product.type)) &&
//       product.price >= filters.priceRange[0] &&
//       product.price <= filters.priceRange[1]
//     );
//   });

//   const categories = [...new Set(products.map((p) => p.category))];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       {/* Hero Section */}
//       <div className="bg-gradient-to-r from-primary-600 to-primary-600 text-white py-16 px-4">
//         <div className="container mx-auto text-center">
//           <h1 className="text-4xl font-bold mb-4">Choose Your Perfect Plan</h1>
//           <p className="text-xl mb-8 max-w-2xl mx-auto">
//             Access premium content with our flexible subscription options
//           </p>
//           <div className="flex gap-4 justify-center">
//             <Button
//               variant="secondary"
//               size="lg"
//               onClick={() => document.getElementById("plans")?.scrollIntoView()}
//             >
//               View Plans
//             </Button>
//             <Button
//               variant="outline"
//               size="lg"
//               className="text-white border-white bg-transparent hover:bg-white/10"
//               onClick={() => navigate("/compare")}
//               disabled={compareItems.length === 0}
//             >
//               Compare Plans ({compareItems.length})
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-12" id="plans">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Filters - Desktop */}
//           <aside className="hidden lg:block w-72 flex-shrink-0">
//             <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
//               <h3 className="font-semibold text-lg mb-6 flex items-center">
//                 <Filter className="h-5 w-5 mr-2" />
//                 Filter Plans
//               </h3>

//               <div className="space-y-6">
//                 <div>
//                   <Label>Search</Label>
//                   <Input
//                     placeholder="Search plans..."
//                     value={filters.search}
//                     onChange={(e) =>
//                       setFilters({ ...filters, search: e.target.value })
//                     }
//                     className="mt-2"
//                   />
//                 </div>

//                 <div>
//                   <Label>Category</Label>
//                   <select
//                     className="w-full mt-2 rounded-lg border p-2 bg-white"
//                     value={filters.category}
//                     onChange={(e) =>
//                       setFilters({ ...filters, category: e.target.value })
//                     }
//                   >
//                     <option value="all">All Categories</option>
//                     {categories.map((category) => (
//                       <option key={category} value={category}>
//                         {category}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <Label>Subscription Type</Label>
//                   <div className="mt-2 space-y-2">
//                     {Object.values(SubscriptionType).map((type) => (
//                       <div key={type} className="flex items-center">
//                         <input
//                           type="checkbox"
//                           id={`type-${type}`}
//                           checked={filters.types.includes(type)}
//                           onChange={() =>
//                             setFilters({
//                               ...filters,
//                               types: filters.types.includes(type)
//                                 ? filters.types.filter((t) => t !== type)
//                                 : [...filters.types, type],
//                             })
//                           }
//                           className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
//                         />
//                         <label
//                           htmlFor={`type-${type}`}
//                           className="ml-2 flex items-center"
//                         >
//                           {getTypeIcon(type)}
//                           <span className="ml-2">
//                             {subscriptionTypeLabels[type]}
//                           </span>
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <Label>
//                     Price Range: ${filters.priceRange[0]} - $
//                     {filters.priceRange[1]}
//                   </Label>
//                   <Slider
//                     value={filters.priceRange}
//                     max={1000}
//                     step={10}
//                     onValueChange={(value) =>
//                       setFilters({
//                         ...filters,
//                         priceRange: value as [number, number],
//                       })
//                     }
//                     className="mt-4"
//                   />
//                 </div>

//                 <Button
//                   variant="outline"
//                   onClick={() =>
//                     setFilters({
//                       search: "",
//                       category: "all",
//                       priceRange: [0, 1000],
//                       types: [],
//                     })
//                   }
//                 >
//                   Reset Filters
//                 </Button>
//               </div>
//             </div>
//           </aside>

//           {/* Mobile Filters Drawer */}
//           <Drawer>
//             <div className="lg:hidden flex justify-between items-center mb-6 sticky top-0 z-10 bg-white/80 backdrop-blur-sm p-4 -mx-4 border-b">
//               <h2 className="text-xl font-bold">Subscription Plans</h2>
//               <DrawerTrigger asChild>
//                 <Button variant="outline">
//                   <Filter className="h-4 w-4 mr-2" />
//                   Filters
//                 </Button>
//               </DrawerTrigger>
//             </div>

//             <DrawerContent className="bg-white flex flex-col rounded-t-xl fixed bottom-0 left-0 right-0 h-[90%] mt-24">
//               <div className="p-4 bg-white rounded-t-xl flex-1 overflow-auto">
//                 <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-4" />
//                 <div className="max-w-md mx-auto">
//                   <h3 className="font-semibold text-lg mb-6 flex items-center">
//                     <Filter className="h-5 w-5 mr-2" />
//                     Filter Plans
//                   </h3>

//                   <div className="space-y-6">
//                     <div>
//                       <Label>Search</Label>
//                       <Input
//                         placeholder="Search plans..."
//                         value={filters.search}
//                         onChange={(e) =>
//                           setFilters({ ...filters, search: e.target.value })
//                         }
//                         className="mt-2"
//                       />
//                     </div>

//                     <div>
//                       <Label>Category</Label>
//                       <select
//                         className="w-full mt-2 rounded-lg border p-2 bg-white"
//                         value={filters.category}
//                         onChange={(e) =>
//                           setFilters({ ...filters, category: e.target.value })
//                         }
//                       >
//                         <option value="all">All Categories</option>
//                         {categories.map((category) => (
//                           <option key={category} value={category}>
//                             {category}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     <div>
//                       <Label>Subscription Type</Label>
//                       <div className="mt-2 space-y-2">
//                         {Object.values(SubscriptionType).map((type) => (
//                           <div key={type} className="flex items-center">
//                             <input
//                               type="checkbox"
//                               id={`mobile-type-${type}`}
//                               checked={filters.types.includes(type)}
//                               onChange={() =>
//                                 setFilters({
//                                   ...filters,
//                                   types: filters.types.includes(type)
//                                     ? filters.types.filter((t) => t !== type)
//                                     : [...filters.types, type],
//                                 })
//                               }
//                               className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
//                             />
//                             <label
//                               htmlFor={`mobile-type-${type}`}
//                               className="ml-2 flex items-center"
//                             >
//                               {getTypeIcon(type)}
//                               <span className="ml-2">
//                                 {subscriptionTypeLabels[type]}
//                               </span>
//                             </label>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     <div>
//                       <Label>
//                         Price Range: ${filters.priceRange[0]} - $
//                         {filters.priceRange[1]}
//                       </Label>
//                       <Slider
//                         value={filters.priceRange}
//                         max={1000}
//                         step={10}
//                         onValueChange={(value) =>
//                           setFilters({
//                             ...filters,
//                             priceRange: value as [number, number],
//                           })
//                         }
//                         className="mt-4"
//                       />
//                     </div>

//                     <div className="flex gap-3">
//                       <Button
//                         className="flex-1"
//                         onClick={() => {
//                           setFilters({
//                             search: "",
//                             category: "all",
//                             priceRange: [0, 1000],
//                             types: [],
//                           });
//                         }}
//                       >
//                         Reset
//                       </Button>
//                       <DrawerClose className="flex-1">
//                         <Button variant="outline" className="w-full">
//                           Apply Filters
//                         </Button>
//                       </DrawerClose>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </DrawerContent>
//           </Drawer>

//           {/* Products Grid */}
//           <div className="flex-1">
//             {isLoading ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {Array.from({ length: 6 }).map((_, i) => (
//                   <Card key={i}>
//                     <Skeleton className="h-48 w-full rounded-t-lg" />
//                     <CardContent className="p-6 space-y-4">
//                       <Skeleton className="h-6 w-3/4" />
//                       <Skeleton className="h-4 w-full" />
//                       <Skeleton className="h-4 w-2/3" />
//                       <Skeleton className="h-10 w-full mt-4" />
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             ) : filteredProducts.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredProducts.map((product) => (
//                   <ProductCard
//                     key={product.id}
//                     product={product}
//                     isInCompare={compareItems.some((p) => p.id === product.id)}
//                     isInCart={cart.some((p) => p.id === product.id)}
//                     onToggleCompare={toggleCompareItem}
//                     onAddToCart={addToCart}
//                     onRemoveFromCart={removeFromCart}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-sm">
//                 <Package className="h-12 w-12 text-gray-400 mb-4" />
//                 <h3 className="text-xl font-medium mb-2">No plans found</h3>
//                 <p className="text-gray-500 mb-6">
//                   Try adjusting your filters or search term
//                 </p>
//                 <Button
//                   variant="outline"
//                   onClick={() =>
//                     setFilters({
//                       search: "",
//                       category: "",
//                       priceRange: [0, 1000],
//                       types: [],
//                     })
//                   }
//                 >
//                   Reset Filters
//                 </Button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Floating Action Buttons */}
//       <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
//         {compareItems.length > 0 && (
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ type: "spring" }}
//           >
//             <Button
//               size="lg"
//               className="rounded-full shadow-lg"
//               onClick={() => navigate("/compare")}
//             >
//               Compare ({compareItems.length})
//               <ArrowRight className="ml-2 h-4 w-4" />
//             </Button>
//           </motion.div>
//         )}

//         {cart.length > 0 && (
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ type: "spring" }}
//           >
//             <Button
//               size="lg"
//               className="rounded-full shadow-lg bg-green-600 hover:bg-green-700"
//               onClick={() => navigate("/checkout")}
//             >
//               Checkout ({cart.length})
//               <ShoppingCart className="ml-2 h-4 w-4" />
//             </Button>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// }

// // Product Card Component
// function ProductCard({
//   product,
//   isInCompare,
//   isInCart,
//   onToggleCompare,
//   onAddToCart,
//   onRemoveFromCart,
// }: {
//   product: Product;
//   isInCompare: boolean;
//   isInCart: boolean;
//   onToggleCompare: (product: Product) => void;
//   onAddToCart: (product: Product) => void;
//   onRemoveFromCart: (productId: number) => void;
// }) {
//   const getTypeBadge = (type: SubscriptionType) => {
//     const styles = {
//       [SubscriptionType.PRINT]: "bg-primary-100 text-primary-800",
//       [SubscriptionType.DIGITAL]: "bg-primary-100 text-primary-800",
//       [SubscriptionType.PRINT_AND_DIGITAL]: "bg-green-100 text-green-800",
//     };
//     return styles[type] || "bg-gray-100 text-gray-800";
//   };

//   return (
//     <motion.div
//       whileHover={{ y: -5 }}
//       transition={{ type: "spring", stiffness: 300 }}
//     >
//       <Card
//         className={`h-full flex flex-col overflow-hidden ${
//           isInCompare ? "ring-2 ring-primary-500" : ""
//         }`}
//       >
//         <div className="relative h-48 overflow-hidden">
//           <img
//             src={API_BASE_URL + product.image || "/default-product.jpg"}
//             alt={product.name}
//             className="w-full h-full object-cover"
//           />
//           {product.featured && (
//             <div className="absolute top-3 right-3">
//               <Badge className="bg-amber-500 hover:bg-amber-600">Popular</Badge>
//             </div>
//           )}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
//         </div>

//         <CardHeader className="pb-3">
//           <CardTitle>{product.name}</CardTitle>
//           <CardDescription className="line-clamp-2">
//             {product.description}
//           </CardDescription>
//           <Badge className={`w-fit mt-2 ${getTypeBadge(product.type)}`}>
//             {subscriptionTypeLabels[product.type]}
//           </Badge>
//         </CardHeader>

//         <CardContent className="pt-0 mt-auto">
//           <div className="flex items-end justify-between">
//             <div>
//               <span className="text-sm text-gray-500">Starting at</span>
//               <p className="text-2xl font-bold">
//                 ${product.price}
//                 <span className="text-sm font-normal text-gray-500">/mo</span>
//               </p>
//             </div>

//             <div className="flex gap-2">
//               <Button
//                 size="sm"
//                 variant={isInCompare ? "default" : "outline"}
//                 onClick={() => onToggleCompare(product)}
//               >
//                 {isInCompare ? (
//                   <Check className="h-4 w-4" />
//                 ) : (
//                   <Plus className="h-4 w-4" />
//                 )}
//               </Button>

//               {isInCart ? (
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => onRemoveFromCart(product.id)}
//                 >
//                   Remove
//                 </Button>
//               ) : (
//                 <Button size="sm" onClick={() => onAddToCart(product)}>
//                   Add to Cart
//                 </Button>
//               )}
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </motion.div>
//   );
// }

export default function Products() {
  return <></>;
}

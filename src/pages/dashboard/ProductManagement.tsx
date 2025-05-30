import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  PlusCircle,
  Package,
  Pencil,
  Search,
  ArrowUpDown,
  Trash2,
  Upload,
  Newspaper,
  Monitor,
  Layers,
  X,
  LayoutGrid,
  LayoutList,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect } from "react";
import { productAPI } from "@/lib/api";
import { API_BASE_URL, uploadAPI } from "../../lib/api";

type ValidityUnit = "days" | "hours" | "minutes" | "times";
const validityUnits: ValidityUnit[] = ["days", "hours", "minutes", "times"];

enum SubscriptionType {
  PRINT = "PRINT",
  DIGITAL = "DIGITAL",
  PRINT_AND_DIGITAL = "PRINT_AND_DIGITAL",
}

const subscriptionTypeLabels = {
  [SubscriptionType.PRINT]: "Print Subscription",
  [SubscriptionType.DIGITAL]: "Digital Subscription",
  [SubscriptionType.PRINT_AND_DIGITAL]: "Print and Digital Subscription",
};

const getTypeStyles = (type: SubscriptionType) => {
  switch (type) {
    case SubscriptionType.PRINT:
      return {
        bgColor: "bg-blue-100",
        textColor: "text-blue-800",
        icon: <Newspaper className="h-4 w-4 mr-2" />,
      };
    case SubscriptionType.DIGITAL:
      return {
        bgColor: "bg-purple-100",
        textColor: "text-purple-800",
        icon: <Monitor className="h-4 w-4 mr-2" />,
      };
    case SubscriptionType.PRINT_AND_DIGITAL:
      return {
        bgColor: "bg-green-100",
        textColor: "text-green-800",
        icon: <Layers className="h-4 w-4 mr-2" />,
      };
    default:
      return {
        bgColor: "bg-gray-100",
        textColor: "text-gray-800",
        icon: null,
      };
  }
};

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.any().optional(),
  type: z.enum([
    SubscriptionType.PRINT,
    SubscriptionType.DIGITAL,
    SubscriptionType.PRINT_AND_DIGITAL,
  ]),
  featured: z.boolean().default(false),
  category: z.string().min(1, "Category is required"),
  price: z.number().min(0, "Price must be positive"),
  validity_value: z.number().min(1, "Validity value must be positive"),
  validity_unit: z.enum(["days", "hours", "minutes", "times"]),
  is_active: z.boolean().default(true),
});

export default function ProductManagement() {
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  }>({ key: "name", direction: "asc" });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "",
      featured: false,
      category: "",
      price: 0,
      validity_value: 1,
      validity_unit: "days",
      is_active: true,
    },
  });

  const startEdit = (product: any) => {
    form.reset({
      ...product,
      type: product.type as SubscriptionType,
    });
    setSelectedImage(API_BASE_URL + product.image);
    setIsFormOpen(true);
  };

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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (form.getValues("id")) {
        await productAPI.update(form.getValues("id"), values);
      } else {
        await productAPI.create(values);
      }
      fetchProducts();
      setIsFormOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const deleteProduct = async (productId: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await productAPI.delete(productId);
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const response: any = await uploadAPI.products({
          formData,
        });

        if (!response.url) {
          throw new Error("Failed to upload image");
        }

        setSelectedImage(response?.url);
        form.setValue("image", response?.url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-gray-800">
            Product Management
          </h1>
          <p className="text-gray-500">Add and manage products</p>
        </div>
        {!isFormOpen && (
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setViewMode(viewMode === "table" ? "grid" : "table")
              }
              className="relative"
            >
              {viewMode === "table" ? (
                <LayoutGrid className="h-4 w-4" />
              ) : (
                <LayoutList className="h-4 w-4" />
              )}
            </Button>
            <Button
              onClick={() => setIsFormOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
        )}
      </div>

      {isFormOpen ? (
        <>
          <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-indigo-500" />
                {form.getValues("id") ? "Edit Product" : "Add New Product"}
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setIsFormOpen(false);
                  form.reset();
                  setSelectedImage(null);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter product name"
                              autoComplete="off"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter category"
                              autoComplete="off"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter product description"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subscription Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select subscription type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.values(SubscriptionType).map((type) => {
                                const styles = getTypeStyles(type);
                                return (
                                  <SelectItem
                                    key={type}
                                    value={type}
                                    className={`flex items-center ${styles.bgColor} ${styles.textColor} rounded-md my-1 p-2`}
                                  >
                                    <div className="flex items-center">
                                      {styles.icon}
                                      {subscriptionTypeLabels[type]}
                                    </div>
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter price"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="validity_value"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Validity Value</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter validity value"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="validity_unit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Validity Unit</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select validity unit" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {validityUnits.map((unit) => (
                                <SelectItem key={unit} value={unit}>
                                  {unit.charAt(0).toUpperCase() + unit.slice(1)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <Label>Product Image</Label>
                    <div className="flex items-center gap-4">
                      <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center relative">
                        {selectedImage ? (
                          <div className="relative w-full h-full">
                            <img
                              src={selectedImage ? `/${selectedImage}` : ""} // Add leading slash to make it relative to public folder
                              alt="Selected"
                              className="w-full h-full object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => setSelectedImage(null)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <label className="cursor-pointer flex flex-col items-center">
                            <Upload className="h-8 w-8 text-gray-400" />
                            <span className="text-sm text-gray-500">
                              Upload Image
                            </span>
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={handleImageChange}
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center gap-8">
                    <FormField
                      control={form.control}
                      name="featured"
                      render={({ field }) => (
                        <FormItem className="flex items-center gap-2">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="!mt-0">
                            Featured Product
                          </FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="is_active"
                      render={({ field }) => (
                        <FormItem className="flex items-center gap-2">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="!mt-0">Active</FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => form.reset()}
                    >
                      Reset
                    </Button>
                    <Button
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-700"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Product
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          <div className="mb-6 flex items-center justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {viewMode === "table" ? (
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Image</TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => sortData("name")}
                          className="hover:bg-transparent flex items-center"
                        >
                          Name
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => sortData("category")}
                          className="hover:bg-transparent flex items-center"
                        >
                          Category
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => sortData("price")}
                          className="hover:bg-transparent flex items-center"
                        >
                          Price
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Validity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products
                      .filter(
                        (product) =>
                          product.name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                          product.category
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                          subscriptionTypeLabels[
                            product.type as SubscriptionType
                          ]
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                      )
                      .sort((a, b) => {
                        if (sortConfig.direction === "asc") {
                          return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
                        }
                        return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
                      })
                      .map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="w-16 h-16 rounded-lg overflow-hidden">
                              {product.image ? (
                                <img
                                  src={
                                    API_BASE_URL + product.image ||
                                    "/default-product.jpg"
                                  }
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                  <Package className="h-6 w-6 text-gray-400" />
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            {product.name}
                          </TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>${product.price}</TableCell>
                          <TableCell>
                            {product.type && (
                              <div
                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                  getTypeStyles(product.type).bgColor
                                } ${getTypeStyles(product.type).textColor}`}
                              >
                                {getTypeStyles(product.type).icon}
                                {subscriptionTypeLabels[product.type]}
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            {product.validity_value} {product.validity_unit}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                product.is_active
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {product.is_active ? "Active" : "Inactive"}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => startEdit(product)}
                                className="hover:bg-gray-100"
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteProduct(product.id)}
                                className="hover:bg-red-100 text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : (
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Product List</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {products.map((product) => (
                    <Card key={product.id} className="overflow-hidden">
                      <div className="aspect-video relative">
                        {product.image ? (
                          <img
                            src={
                              API_BASE_URL + product.image ||
                              "/default-product.jpg"
                            }
                            alt={product.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <Package className="h-12 w-12 text-gray-300" />
                          </div>
                        )}
                        {product.featured && (
                          <span className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {product.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {product.category}
                            </p>
                          </div>
                          <span className="text-lg font-bold text-indigo-600">
                            ${product.price}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="space-y-2">
                            {product.type && (
                              <div
                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                  getTypeStyles(product.type).bgColor
                                } ${getTypeStyles(product.type).textColor}`}
                              >
                                {getTypeStyles(product.type).icon}
                                {subscriptionTypeLabels[product.type]}
                              </div>
                            )}
                          </div>
                          <span className="text-sm text-gray-500">
                            Validity: {product.validity_value}{" "}
                            {product.validity_unit}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              product.is_active
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {product.is_active ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}

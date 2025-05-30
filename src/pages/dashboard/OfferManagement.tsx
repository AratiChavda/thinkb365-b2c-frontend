import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  PlusCircle,
  Gift,
  Pencil,
  Search,
  ArrowUpDown,
  Trash2,
  LayoutGrid,
  LayoutList,
  Calendar as CalendarIcon,
  Percent,
  Clock,
  Zap,
  BadgePercent,
  Clock4,
  Sparkles,
  Tag,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { offerAPI, productAPI } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
type TrialUnit = "minutes" | "hours" | "days" | "weeks" | "months";
const trialUnits: TrialUnit[] = ["minutes", "hours", "days", "weeks", "months"];

const formSchema = z.object({
  product_id: z.number().min(1, "Product is required"),
  title: z.string().min(2, "Title must be at least 2 characters"),
  is_trial: z.boolean().default(false),
  trial_value: z.number().min(1, "Trial value must be positive"),
  trial_unit: z.enum(["minutes", "hours", "days", "weeks", "months"]),
  discount_percentage: z.number().min(0).max(100).optional(),
  valid_from: z.date().optional(),
  valid_to: z.date().optional(),
  is_active: z.boolean().default(true),
});

export default function OfferManagement() {
  const [offers, setOffers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  }>({ key: "title", direction: "asc" });
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_id: 0,
      title: "",
      is_trial: false,
      trial_value: 1,
      trial_unit: "days",
      discount_percentage: 0,
      is_active: true,
    },
  });

  const watchIsTrial = form.watch("is_trial");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [offersResponse, productsResponse] = await Promise.all([
          offerAPI.getAll(),
          productAPI.getAll(),
        ]);
        setOffers(offersResponse.data);
        setProducts(productsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const sortData = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (form.getValues("id")) {
        await offerAPI.update(form.getValues("id"), values);
      } else {
        await offerAPI.create(values);
      }
      fetchOffers();
      setIsFormOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error saving offer:", error);
    }
  };

  const fetchOffers = async () => {
    try {
      const response = await offerAPI.getAll();
      setOffers(response.data);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  };

  const deleteOffer = async (offerId: number) => {
    if (window.confirm("Are you sure you want to delete this offer?")) {
      try {
        await offerAPI.delete(offerId);
        fetchOffers();
      } catch (error) {
        console.error("Error deleting offer:", error);
      }
    }
  };

  const startEdit = (offer: any) => {
    form.reset(offer);
    setIsFormOpen(true);
  };

  const filteredAndSortedOffers = offers
    .filter(
      (offer) =>
        offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.product?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

  const getProductName = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    return product ? product.name : "Unknown Product";
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {isFormOpen ? (
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader className="bg-slate">
            <CardTitle className="flex items-center gap-3">
              {form.getValues("id") ? (
                <>
                  <Pencil className="h-5 w-5 text-indigo-600" />
                  <span>Edit Offer</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  <span>Create New Offer</span>
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Tag className="h-4 w-4 text-gray-500" />
                          Offer Title
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Summer Special, New User Trial"
                            {...field}
                            className="focus-visible:ring-indigo-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="product_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Gift className="h-4 w-4 text-gray-500" />
                          Product
                        </FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                          defaultValue={
                            field.value ? String(field.value) : undefined
                          }
                        >
                          <FormControl>
                            <SelectTrigger className="focus-visible:ring-indigo-500">
                              <SelectValue placeholder="Select a product" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {products.map((product) => (
                              <SelectItem
                                key={product.id}
                                value={String(product.id)}
                              >
                                {product.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="is_trial"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 bg-gradient-to-r from-gray-50 to-gray-100">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base flex items-center gap-2">
                          {field.value ? (
                            <Clock4 className="h-5 w-5 text-purple-600" />
                          ) : (
                            <BadgePercent className="h-5 w-5 text-blue-600" />
                          )}
                          Offer Type
                        </FormLabel>
                        <p className="text-sm text-gray-500">
                          {field.value
                            ? "Trial period offer"
                            : "Discount percentage offer"}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "text-sm font-medium",
                            !field.value ? "text-blue-600" : "text-gray-400"
                          )}
                        >
                          Discount
                        </span>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-purple-600 data-[state=unchecked]:bg-blue-600"
                          />
                        </FormControl>
                        <span
                          className={cn(
                            "text-sm font-medium",
                            field.value ? "text-purple-600" : "text-gray-400"
                          )}
                        >
                          Trial
                        </span>
                      </div>
                    </FormItem>
                  )}
                />

                {watchIsTrial ? (
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="trial_value"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            Trial Duration
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                              className="focus-visible:ring-purple-500"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="trial_unit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            Duration Unit
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="focus-visible:ring-purple-500">
                                <SelectValue placeholder="Select duration unit" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {trialUnits.map((unit) => (
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
                ) : (
                  <>
                    <FormField
                      control={form.control}
                      name="discount_percentage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Percent className="h-4 w-4 text-gray-500" />
                            Discount Percentage
                          </FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseInt(e.target.value))
                                }
                                className="focus-visible:ring-blue-500 pl-8"
                              />
                            </FormControl>
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                              %
                            </span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="valid_from"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="flex items-center gap-2">
                              <CalendarIcon className="h-4 w-4 text-gray-500" />
                              Valid From
                            </FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={`w-full pl-3 text-left font-normal focus-visible:ring-blue-500 ${
                                      !field.value && "text-muted-foreground"
                                    }`}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <CalendarComponent
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => date < new Date()}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="valid_to"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="flex items-center gap-2">
                              <CalendarIcon className="h-4 w-4 text-gray-500" />
                              Valid To
                            </FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={`w-full pl-3 text-left font-normal focus-visible:ring-blue-500 ${
                                      !field.value && "text-muted-foreground"
                                    }`}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <CalendarComponent
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date < new Date() ||
                                    (form.getValues("valid_from") &&
                                      date < form.getValues("valid_from"))
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                )}

                <FormField
                  control={form.control}
                  name="is_active"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 bg-gradient-to-r from-gray-50 to-gray-100">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base flex items-center gap-2">
                          <Zap
                            className={cn(
                              "h-5 w-5",
                              field.value ? "text-green-600" : "text-gray-400"
                            )}
                          />
                          Status
                        </FormLabel>
                        <p className="text-sm text-gray-500">
                          {field.value
                            ? "This offer is currently active"
                            : "This offer is inactive"}
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-400"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsFormOpen(false);
                      form.reset();
                    }}
                    className="border-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className={cn(
                      "shadow-md hover:shadow-lg transition-shadow",
                      form.getValues("id")
                        ? "bg-indigo-600 hover:bg-indigo-700"
                        : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                    )}
                  >
                    {form.getValues("id") ? "Update Offer" : "Create Offer"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex justify-between items-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-1"
            >
              <h1 className="text-3xl font-bold text-gray-800">
                Offer Management
              </h1>
              <p className="text-gray-500">
                Create and manage special offers for your products
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex items-center space-x-4"
            >
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setViewMode(viewMode === "table" ? "grid" : "table")
                }
                className="rounded-full"
              >
                {viewMode === "table" ? (
                  <LayoutGrid className="h-4 w-4" />
                ) : (
                  <LayoutList className="h-4 w-4" />
                )}
              </Button>
              <Button
                onClick={() => {
                  setIsFormOpen(true);
                  form.reset();
                }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-full shadow-md"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Offer
              </Button>
            </motion.div>
          </div>
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:max-w-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                placeholder="Search offers by title or product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                 className="pl-10 pr-4 py-3 rounded-full border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {filteredAndSortedOffers.length}{" "}
                {filteredAndSortedOffers.length === 1 ? "offer" : "offers"}{" "}
                found
              </span>
            </div>
          </div>

          {isLoading ? (
            <div
              className={cn(
                "grid gap-6",
                viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : ""
              )}
            >
              {[...Array(6)].map((_, i) =>
                viewMode === "grid" ? (
                  <Card key={i} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <Skeleton className="h-6 w-3/4 rounded" />
                        <Skeleton className="h-4 w-1/2 rounded" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-full rounded" />
                          <Skeleton className="h-4 w-4/5 rounded" />
                        </div>
                        <Skeleton className="h-8 w-24 rounded-full" />
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <TableRow key={i} className="hover:bg-transparent">
                    {[...Array(6)].map((_, j) => (
                      <TableCell key={j}>
                        <Skeleton className="h-4 w-full rounded" />
                      </TableCell>
                    ))}
                  </TableRow>
                )
              )}
            </div>
          ) : filteredAndSortedOffers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Gift className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No offers found
              </h3>
              <p className="text-gray-500 mb-6">
                Create your first offer to get started
              </p>
              <Button
                onClick={() => setIsFormOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Offer
              </Button>
            </div>
          ) : viewMode === "table" ? (
            <Card className="border-0 shadow">
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="pl-6">
                        <Button
                          variant="ghost"
                          onClick={() => sortData("title")}
                          className="px-0 hover:bg-transparent font-medium text-gray-700"
                        >
                          Offer
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead className="text-gray-700 font-medium">
                        Product
                      </TableHead>
                      <TableHead className="text-gray-700 font-medium">
                        Type
                      </TableHead>
                      <TableHead className="text-gray-700 font-medium">
                        Details
                      </TableHead>
                      <TableHead className="text-gray-700 font-medium">
                        Status
                      </TableHead>
                      <TableHead className="pr-6 text-right text-gray-700 font-medium">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAndSortedOffers.map((offer) => (
                      <TableRow
                        key={offer.id}
                        className="border-t hover:bg-gray-50/50"
                      >
                        <TableCell className="pl-6 font-medium">
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "p-2 rounded-lg",
                                offer.is_trial
                                  ? "bg-purple-100 text-purple-600"
                                  : "bg-blue-100 text-blue-600"
                              )}
                            >
                              {offer.is_trial ? (
                                <Clock4 className="h-5 w-5" />
                              ) : (
                                <BadgePercent className="h-5 w-5" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{offer.title}</p>
                              <p className="text-sm text-gray-500">
                                {!offer.is_trial &&
                                  offer.valid_from &&
                                  offer.valid_to &&
                                  `${format(
                                    new Date(offer.valid_from),
                                    "MMM d"
                                  )} - ${format(
                                    new Date(offer.valid_to),
                                    "MMM d, yyyy"
                                  )}`}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-gray-700">
                            {getProductName(offer.product_id)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={offer.is_trial ? "secondary" : "default"}
                            className={cn(
                              "px-2 py-1 rounded-full text-xs font-medium",
                              offer.is_trial
                                ? "bg-purple-100 text-purple-800"
                                : "bg-blue-100 text-blue-800"
                            )}
                          >
                            {offer.is_trial ? "Trial" : "Discount"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {offer.is_trial ? (
                            <div className="flex items-center gap-1">
                              <span className="font-medium">
                                {offer.trial_value}
                              </span>
                              <span className="text-gray-600">
                                {offer.trial_unit}
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1">
                              <span className="font-medium">
                                {offer.discount_percentage}%
                              </span>
                              <span className="text-gray-600">off</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={offer.is_active ? "default" : "outline"}
                            className={cn(
                              "px-2 py-1 rounded-full text-xs",
                              offer.is_active
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            )}
                          >
                            {offer.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="pr-6">
                          <div className="flex justify-end gap-2">
                            {/* <Tooltip>
                              <TooltipTrigger asChild> */}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => startEdit(offer)}
                              className="hover:bg-indigo-50 text-indigo-600"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            {/* </TooltipTrigger> */}
                            {/* <TooltipContent>Edit offer</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild> */}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteOffer(offer.id)}
                              className="hover:bg-red-50 text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            {/* </TooltipTrigger>
                              <TooltipContent>Delete offer</TooltipContent>
                            </Tooltip> */}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredAndSortedOffers.map((offer) => (
                <Card
                  key={offer.id}
                  className={cn(
                    "hover:shadow-lg transition-shadow border-0 overflow-hidden",
                    offer.is_active ? "ring-1 ring-gray-200" : "opacity-80"
                  )}
                >
                  <div
                    className={cn(
                      "h-2 w-full",
                      offer.is_active
                        ? "bg-gradient-to-r from-green-400 to-green-500"
                        : "bg-gray-300"
                    )}
                  ></div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "p-2 rounded-lg",
                            offer.is_trial
                              ? "bg-purple-100 text-purple-600"
                              : "bg-blue-100 text-blue-600"
                          )}
                        >
                          {offer.is_trial ? (
                            <Clock4 className="h-5 w-5" />
                          ) : (
                            <BadgePercent className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {offer.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {getProductName(offer.product_id)}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(
                          "px-2 py-1 rounded-full text-xs",
                          offer.is_active
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        )}
                      >
                        {offer.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-500">
                          Type
                        </span>
                        <Badge
                          variant={offer.is_trial ? "secondary" : "default"}
                          className={cn(
                            "px-2 py-1 rounded-full text-xs font-medium",
                            offer.is_trial
                              ? "bg-purple-100 text-purple-800"
                              : "bg-blue-100 text-blue-800"
                          )}
                        >
                          {offer.is_trial ? "Trial" : "Discount"}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-500">
                          {offer.is_trial ? "Duration" : "Discount"}
                        </span>
                        <span className="font-medium">
                          {offer.is_trial ? (
                            <span>
                              {offer.trial_value} {offer.trial_unit}
                            </span>
                          ) : (
                            <span className="text-blue-600">
                              {offer.discount_percentage}% off
                            </span>
                          )}
                        </span>
                      </div>

                      {!offer.is_trial && (
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm font-medium text-gray-500">
                            Valid Period
                          </span>
                          <span className="text-sm text-right">
                            {format(new Date(offer.valid_from), "MMM d")} -{" "}
                            <br />
                            {format(new Date(offer.valid_to), "MMM d, yyyy")}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => startEdit(offer)}
                        className="border-indigo-300 text-indigo-600 hover:bg-indigo-50"
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteOffer(offer.id)}
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

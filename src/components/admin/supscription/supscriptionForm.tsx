import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icons } from "@/components/icons";
import { bundleAPI } from "@/lib/api";
import { useCallback, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { billingPeriods, bundleTypes } from "@/types/product";

const SubscriptionFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  bundle_type: z.enum(["subscription", "one_time", "trial"]),
  pricing: z.number().min(0, "Price must be positive"),
  billing_period: z.enum(["daily", "weekly", "monthly", "quarterly", "yearly"]),
  billing_cycle_length: z.number().min(1, "Must be at least 1"),
  trial_period_days: z.number().min(0, "Cannot be negative"),
  is_active: z.boolean(),
  max_users: z.number().min(1, "Must be at least 1"),
  cancellation_policy: z.string().optional(),
  is_cancellable: z.boolean(),
  cancellation_notice_days: z.number().min(0, "Cannot be negative").optional(),
  cancellation_fee: z.number().min(0, "Cannot be negative").optional(),
  lock_in_period_days: z.number().min(0, "Cannot be negative").optional(),
  cancellation_rules: z.any().optional(),
  offer_id: z.string().optional(),
  products: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        quantity: z.number().min(1, "Quantity must be at least 1"),
      })
    )
    .min(1, "At least one product must be selected"),

  isSubmitting: z.boolean().optional(),
});

type SubscriptionFormValues = z.infer<typeof SubscriptionFormSchema>;

interface Product {
  id: string;
  name: string;
  brand_id: string;
  category_id: string;
  description: string;
  is_active: boolean;
  type: string;
  image: string;
}

const SubscriptionForm = ({ products, offers, editingId, onCancel }: any) => {
  const [activeTab, setActiveTab] = useState("subscription");
  const [availableProducts, setAvailableProducts] =
    useState<Product[]>(products);
  const [selectedProducts, setSelectedProducts] = useState<
    { id: string; name: string; quantity: number }[]
  >([]);

  const form = useForm<SubscriptionFormValues>({
    resolver: zodResolver(SubscriptionFormSchema),
    defaultValues: {
      name: "",
      description: "",
      bundle_type: "subscription",
      pricing: 0,
      billing_period: "monthly",
      billing_cycle_length: 1,
      trial_period_days: 0,
      is_active: true,
      max_users: 1,
      cancellation_policy: "",
      is_cancellable: true,
      cancellation_notice_days: 0,
      cancellation_fee: 0,
      lock_in_period_days: 0,
      cancellation_rules: {},
      offer_id: "",
      products: [],
    },
  });

  const getBundleDataById = useCallback(async () => {
    try {
      const response: any = await bundleAPI.getBundleById(editingId);
      if (response?.data) {
        const {
          name,
          description,
          bundle_type,
          pricing,
          billing_period,
          billing_cycle_length,
          trial_period_days,
          is_active,
          max_users,
          cancellation_policy,
          is_cancellable,
          cancellation_notice_days,
          cancellation_fee,
          lock_in_period_days,
          cancellation_rules,
          offer_id,
          products: bundleProducts,
        } = response.data;

        form.reset({
          name,
          description,
          bundle_type,
          pricing,
          billing_period,
          billing_cycle_length,
          trial_period_days,
          is_active,
          max_users,
          cancellation_policy,
          is_cancellable,
          cancellation_notice_days,
          cancellation_fee,
          lock_in_period_days,
          cancellation_rules,
          offer_id,
          products: bundleProducts,
        });

        setSelectedProducts(bundleProducts);
      }
    } catch (error) {
      console.error("Error fetching bundle data:", error);
    }
  }, [editingId, form]);

  useEffect(() => {
    if (editingId) {
      getBundleDataById();
    }
  }, [editingId, getBundleDataById]);

  useEffect(() => {
    const available = products.filter(
      (product: any) =>
        !selectedProducts.some((selected) => selected.id === product.id)
    );
    setAvailableProducts(available);
  }, [products, selectedProducts]);

  const handleProductSelect = (productId: string) => {
    const product = availableProducts.find((p) => p.id === productId);
    if (!product) return;

    const isSelected = selectedProducts.some((p) => p.id === productId);

    if (isSelected) {
      const updated = selectedProducts.filter((p) => p.id !== productId);
      setSelectedProducts(updated);
      form.setValue("products", updated);
    } else {
      const updated = [
        ...selectedProducts,
        { id: productId, name: product.name, quantity: 1 },
      ];
      setSelectedProducts(updated);
      form.setValue("products", updated);
    }
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    const updated = selectedProducts.map((p) =>
      p.id === productId ? { ...p, quantity } : p
    );
    setSelectedProducts(updated);
    form.setValue("products", updated);
  };

  async function onSubmit(values: SubscriptionFormValues) {
    form.setValue("isSubmitting", true);
    try {
      if (editingId) {
        await bundleAPI.update(editingId, values);
      } else {
        await bundleAPI.create(values);
      }
    } catch (error) {
      console.error("Error saving subscription:", error);
    } finally {
      form.setValue("isSubmitting", false);
      onCancel();
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {editingId
            ? "Edit Product Subscription"
            : "Create New Product Subscription"}
        </CardTitle>
        <CardDescription>
          {editingId
            ? "Update your product subscription"
            : "Create a new product subscription"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="subscription">
                  Subscription Info
                </TabsTrigger>
                <TabsTrigger
                  value="products"
                  disabled={activeTab === "products" && !form.formState.isValid}
                >
                  Product Mapping
                </TabsTrigger>
              </TabsList>

              <TabsContent value="subscription" className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subscription Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter subscription name"
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
                    name="bundle_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.entries(bundleTypes).map(([key, label]) => (
                              <SelectItem key={key} value={key}>
                                {label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pricing"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="billing_period"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Billing Period</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select billing period" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.entries(billingPeriods).map(
                              ([key, label]) => (
                                <SelectItem key={key} value={key}>
                                  {label}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="billing_cycle_length"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Billing Cycle Length</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="1"
                            min="1"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="trial_period_days"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trial Period (days)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            min="0"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="max_users"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max Users</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="1"
                            min="1"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="offer_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Offer</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select billing period" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {offers.map((item: any) => (
                              <SelectItem key={item?.id} value={item?.id}>
                                {item?.name}
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Bundle description..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Cancellation Settings</h3>

                  <FormField
                    control={form.control}
                    name="is_cancellable"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Allow Cancellation
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  {form.getValues("is_cancellable") && (
                    <>
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="cancellation_notice_days"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cancellation Notice (days)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="0"
                                  min="0"
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(parseInt(e.target.value))
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="cancellation_fee"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cancellation Fee</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="0.00"
                                  min="0"
                                  step="0.01"
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(parseFloat(e.target.value))
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="lock_in_period_days"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Lock-in Period (days)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="0"
                                  min="0"
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(parseInt(e.target.value))
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="cancellation_policy"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cancellation Policy</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Cancellation policy details..."
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setActiveTab("products")}
                    disabled={!form.formState.isValid}
                  >
                    Next: Product Mapping
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="products" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Select Products</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose which products are included in this bundle
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {availableProducts.map((product) => (
                      <div
                        key={product.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          selectedProducts.some((p) => p.id === product.id)
                            ? "border-primary bg-primary/10"
                            : "hover:bg-muted/50"
                        }`}
                        onClick={() => handleProductSelect(product.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{product.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {product.type}
                            </p>
                          </div>
                          <Checkbox
                            checked={selectedProducts.some(
                              (p) => p.id === product.id
                            )}
                            onCheckedChange={() =>
                              handleProductSelect(product.id)
                            }
                            className="ml-2"
                          />
                        </div>

                        {selectedProducts.some((p) => p.id === product.id) && (
                          <div className="mt-3 flex items-center">
                            <label className="text-sm mr-2">Quantity:</label>
                            <Input
                              type="number"
                              min="1"
                              value={
                                selectedProducts.find(
                                  (p) => p.id === product.id
                                )?.quantity || 1
                              }
                              onChange={(e) =>
                                handleQuantityChange(
                                  product.id,
                                  parseInt(e.target.value)
                                )
                              }
                              className="w-20 h-8"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {selectedProducts.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Selected Products</h3>
                    <div className="space-y-2">
                      {selectedProducts.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div>
                            <span className="font-medium">{product.name}</span>
                            <span className="text-sm text-muted-foreground ml-2">
                              (Qty: {product.quantity})
                            </span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleProductSelect(product.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setActiveTab("subscription")}
                  >
                    Back to Subscription Info
                  </Button>
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    ) : editingId ? (
                      "Update Bundle"
                    ) : (
                      "Create Bundle"
                    )}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SubscriptionForm;

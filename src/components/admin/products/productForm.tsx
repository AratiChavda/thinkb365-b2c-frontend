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
import { productType } from "@/types/product";
import { productAPI } from "@/lib/api";
import { useCallback, useEffect, useState } from "react";
import { ImageUpload } from "@/components/ui/image-upload";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const productFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  brand_id: z.string().min(1, "Brand is required"),
  category_id: z.string().min(1, "Category is required"),
  type: z.string().min(1, "Product type is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  is_active: z.boolean(),
  image: z.any().optional(),
  isSubmitting: z.boolean().optional(),
});

const ProductForm = ({ brands, categories, editingId, onCancel }: any) => {
  const [imagePreview, setImagePreview] = useState<string>("");

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      brand_id: "",
      category_id: "",
      type: "",
      description: "",
      is_active: true,
      image: null,
    },
  });

  const getProductDataById = useCallback(async () => {
    try {
      const response: any = await productAPI.getProductById(editingId);
      if (response?.data) {
        const {
          name,
          description,
          brand_id,
          category_id,
          type,
          is_active,
          image,
        } = response.data;
        form.setValue("name", name);
        form.setValue("description", description);
        form.setValue("brand_id", brand_id);
        form.setValue("category_id", category_id);
        form.setValue("type", type);
        form.setValue("is_active", is_active);
        form.setValue("image", image);
        setImagePreview(image);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  }, [editingId, form]);

  useEffect(() => {
    if (editingId) {
      getProductDataById();
    }
  }, [editingId, getProductDataById]);

  async function onSubmit(values: z.infer<typeof productFormSchema>) {
    form.setValue("isSubmitting", true);
    try {
      if (editingId) {
        await productAPI.update(editingId, values);
      } else {
        await productAPI.create(values);
      }
    } catch (error) {
      console.error("Error set product:", error);
    } finally {
      form.setValue("isSubmitting", false);
      onCancel();
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Create New Product</CardTitle>
        <CardDescription>Add a new product to your collection</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                name="brand_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value ?? undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select brand" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {brands.map((item: any) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.name}
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
                name="category_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value ?? undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((item: any) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.name}
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
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select product type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(productType).map(([key, label]) => (
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
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Product description..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Imgae</FormLabel>
                  <FormControl>
                    <div className="mt-2">
                      {imagePreview ? (
                        <div className="relative w-40 h-40 rounded-lg overflow-hidden group">
                          <img
                            src={imagePreview}
                            alt="Brand preview"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                setImagePreview("");
                                field.onChange("");
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <ImageUpload
                          onImageUpload={(imageUrl: any) => {
                            field.onChange(imageUrl);
                            setImagePreview(imageUrl);
                          }}
                          maxSize={2}
                          className="max-w-md"
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <div className="flex items-center gap-8">
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
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : editingId ? (
                  "Update Product"
                ) : (
                  "Create Product"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;

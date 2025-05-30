import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import { useCallback, useEffect, useState } from "react";
import { brandAPI } from "@/lib/api";
import { Icons } from "@/components/icons";

const formSchema = z.object({
  name: z.string().min(1, "Brand name is required"),
  description: z.string().optional(),
  logo_url: z.string().optional(),
  isSubmitting: z.boolean().optional(),
});

const BrandForm = ({ editingId, onCancel }: any) => {
  const [imagePreview, setImagePreview] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      logo_url: "",
      isSubmitting: false,
    },
  });

  const getBrandDataById = useCallback(async () => {
    try {
      const response: any = await brandAPI.getBrandById(editingId);
      if (response?.data) {
        const { name, description, logo_url } = response.data;
        form.setValue("name", name);
        form.setValue("description", description);
        form.setValue("logo_url", logo_url);
        setImagePreview(logo_url);
      }
    } catch (error) {
      console.error("Error fetching brand data:", error);
    }
  }, [editingId, form]);

  useEffect(() => {
    if (editingId) {
      getBrandDataById();
    }
  }, [editingId, getBrandDataById]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    form.setValue("isSubmitting", true);
    try {
      if (editingId) {
        await brandAPI.update(editingId, values);
      } else {
        await brandAPI.create(values);
      }
    } catch (error) {
      console.error("Error set brand:", error);
    } finally {
      form.setValue("isSubmitting", false);
      onCancel();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Create New Brand</CardTitle>
        <CardDescription>Add a new brand to your collection</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Brand Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter brand name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter brand description"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="logo_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Logo</FormLabel>
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

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : editingId ? (
                  "Update Brand"
                ) : (
                  "Create Brand"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BrandForm;

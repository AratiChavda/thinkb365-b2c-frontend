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
import { useCallback, useEffect } from "react";
import { categoryAPI } from "@/lib/api";
import { Icons } from "@/components/icons";

const formSchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().optional(),
  isSubmitting: z.boolean().optional(),
});

const CategoryForm = ({ editingId, onCancel }: any) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      isSubmitting: false,
    },
  });

  const getCategoryDataById = useCallback(async () => {
    try {
      const response: any = await categoryAPI.getCategoryById(editingId);
      if (response?.data) {
        const { name, description } = response.data;
        form.setValue("name", name);
        form.setValue("description", description);
      }
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  }, [editingId, form]);

  useEffect(() => {
    if (editingId) {
      getCategoryDataById();
    }
  }, [editingId, getCategoryDataById]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    form.setValue("isSubmitting", true);
    try {
      if (editingId) {
        await categoryAPI.update(editingId, values);
      } else {
        await categoryAPI.create(values);
      }
    } catch (error) {
      console.error("Error set category:", error);
    } finally {
      form.setValue("isSubmitting", false);
      onCancel();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Create New Category
        </CardTitle>
        <CardDescription>Add a new category to your collection</CardDescription>
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
                    Category Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name" {...field} />
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
                      placeholder="Enter category description"
                      className="min-h-[120px]"
                      {...field}
                    />
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
                  "Update Category"
                ) : (
                  "Create Category"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
export default CategoryForm;

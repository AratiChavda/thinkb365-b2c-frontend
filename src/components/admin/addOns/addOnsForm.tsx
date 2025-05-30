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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/icons";
import { useEffect } from "react";
import { addonAPI } from "@/lib/api";
import { billingPeriods } from "@/types/product";

const addonFormSchema = z.object({
  name: z.string().min(1, "Addon name is required"),
  description: z.string().optional(),
  pricing: z.coerce.number().min(0.01, "Pricing must be positive"),
  billing_period: z.string().min(1, "Billing period is required"),
  billing_cycle_length: z.coerce.number().min(1),
  max_users: z.coerce.number().min(1),
  is_active: z.boolean(),
  isSubmitting: z.boolean().optional(),
});

type AddonFormValues = z.infer<typeof addonFormSchema>;

const AddOnForm = ({ editingId, onCancel }: any) => {
  const form = useForm<AddonFormValues>({
    resolver: zodResolver(addonFormSchema),
    defaultValues: {
      name: "",
      description: "",
      pricing: 0,
      billing_period: "",
      billing_cycle_length: 1,
      max_users: 1,
      is_active: true,
    },
  });

  useEffect(() => {
    if (editingId) {
      (async () => {
        try {
          const response = await addonAPI.getById(editingId);
          const data = response?.data;
          if (data) {
            form.reset({
              ...data,
              pricing: parseFloat(data.pricing),
              billing_cycle_length: data.billing_cycle_length || 1,
              max_users: data.max_users || 1,
            });
          }
        } catch (err) {
          console.error("Failed to fetch addon:", err);
        }
      })();
    }
  }, [editingId, form]);

  const onSubmit = async (values: AddonFormValues) => {
    form.setValue("isSubmitting", true);
    try {
      if (editingId) {
        await addonAPI.update(editingId, values);
      } else {
        await addonAPI.create(values);
      }
      onCancel();
    } catch (err) {
      console.error("Error set addon:", err);
    } finally {
      form.setValue("isSubmitting", false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {editingId ? "Edit Addon" : "Create Addon"}
        </CardTitle>
        <CardDescription>
          Configure optional features or services
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Addon Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter addon name" {...field} />
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
                      placeholder="Enter addon description..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="pricing"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pricing</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="e.g. 9.99"
                        {...field}
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
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select billing period" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(billingPeriods).map(([key, label]) => (
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="billing_cycle_length"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Billing Cycle Length</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        placeholder="e.g. 1"
                        {...field}
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
                        min={1}
                        placeholder="e.g. 5"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

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

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : editingId ? (
                  "Update Addon"
                ) : (
                  "Create Addon"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddOnForm;

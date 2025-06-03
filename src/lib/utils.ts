import { productType } from "@/types/product";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Icons } from "@/components/icons";
import { format, isValid } from "date-fns";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFormattedDate = (dateString: string) => {
  return dateString && isValid(new Date(dateString))
    ? format(dateString, "PPP")
    : "";
};

export const getProductTypeStyles = (type: keyof typeof productType) => {
  switch (type) {
    case "print":
      return {
        border: "border-blue-500",
        bgColor: "bg-white",
        textColor: "text-blue-800",
        icon: Icons.newspaper,
      };
    case "digital":
      return {
        border: "border-purple-500",
        bgColor: "bg-white",
        textColor: "text-purple-800",
        icon: Icons.monitor,
      };
    case "print_and_digital":
      return {
        border: "border-green-500",
        bgColor: "bg-white",
        textColor: "text-green-800",
        icon: Icons.layers,
      };
    default:
      return {
        border: "border-gray-300",
        bgColor: "bg-white",
        textColor: "text-gray-800",
        icon: null,
      };
  }
};

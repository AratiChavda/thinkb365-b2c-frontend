import { productType } from "@/types/product";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Icons } from "@/components/icons";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getProductTypeStyles = (type: keyof typeof productType) => {
  switch (type) {
    case "print":
      return {
        bgColor: "bg-blue-100",
        textColor: "text-blue-800",
        icon: Icons.newspaper,
      };
    case "digital":
      return {
        bgColor: "bg-purple-100",
        textColor: "text-purple-800",
        icon: Icons.monitor,
      };
    case "print_and_digital":
      return {
        bgColor: "bg-green-100",
        textColor: "text-green-800",
        icon: Icons.layers,
      };
    default:
      return {
        bgColor: "bg-gray-100",
        textColor: "text-gray-800",
        icon: null,
      };
  }
};

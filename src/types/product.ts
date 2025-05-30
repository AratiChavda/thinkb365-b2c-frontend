export const productType = {
  print: "Print",
  digital: "Digital",
  print_and_digital: "Print & Digital",
} as const;

export const bundleTypes = {
  subscription: "Subscription",
  one_time: "One-time Purchase",
  trial: "Trial",
} as const;

export const billingPeriods = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
  quarterly: "Quarterly",
  yearly: "Yearly",
} as const;

export const discountType = {
  percentage: "Percentage",
  fixed: "Flat",
} as const;

export const discountAppliesTo = {
  bundle: "Subscription",
  addon: "Addon",
  product: "Product",
} as const;

export const subscriptionTypeLabels: Record<keyof typeof productType, string> =
  {
    print: "Print Subscription",
    digital: "Digital Subscription",
    print_and_digital: "Print and Digital Subscription",
  };

export type ValidityUnit = "days" | "hours" | "minutes" | "months" | "years";
export const validityUnits: ValidityUnit[] = [
  "minutes",
  "hours",
  "days",
  "months",
  "years",
];

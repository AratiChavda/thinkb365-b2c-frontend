import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface RecentSubscriptionsProps {
  data: {
    id: string;
    user: string;
    plan: string;
    amount: number;
    status: string; //"active" | "pending" | "canceled";
    startDate: string;
    nextBilling: string;
  }[];
}

export function RecentSubscriptions({ data }: RecentSubscriptionsProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Plan</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>Next Billing</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((subscription) => (
          <TableRow key={subscription.id}>
            <TableCell className="font-medium">#{subscription.id}</TableCell>
            <TableCell>{subscription.user}</TableCell>
            <TableCell>{subscription.plan}</TableCell>
            <TableCell>${subscription.amount}</TableCell>
            <TableCell>
              <Badge
                variant={
                  subscription.status === "active"
                    ? "success"
                    : subscription.status === "pending"
                    ? "warning"
                    : "destructive"
                }
              >
                {subscription.status}
              </Badge>
            </TableCell>
            <TableCell>
              {format(new Date(subscription.startDate), "MMM dd, yyyy")}
            </TableCell>
            <TableCell>
              {format(new Date(subscription.nextBilling), "MMM dd, yyyy")}
            </TableCell>
            <TableCell>
              <Link
                to={`/dashboard/subscriptions/${subscription.id}`}
                className={buttonVariants({ variant: "ghost", size: "sm" })}
              >
                View
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

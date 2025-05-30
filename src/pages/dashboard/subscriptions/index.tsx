import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Clock,
  XCircle,
  Zap,
  Sparkles,
  Calendar,
  CreditCard,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function SubscriptionsPage() {
  const subscriptions = [
    {
      id: "sub_001",
      name: "Premium News",
      price: "$29.99",
      status: "active",
      type: "PRINT_AND_DIGITAL",
      next_billing: "2023-06-15",
      billing_cycle: "MONTHLY",
      utilization: "78%",
    },
    {
      id: "sub_002",
      name: "Cloud Storage Pro",
      price: "$14.99",
      status: "active",
      type: "DIGITAL",
      next_billing: "2023-07-01",
      billing_cycle: "YEARLY",
      utilization: "45%",
    },
    {
      id: "sub_003",
      name: "Magazine Bundle",
      price: "$9.99",
      status: "cancelled",
      type: "PRINT",
      end_date: "2023-05-30",
      billing_cycle: "MONTHLY",
    },
  ];

  const [filter, setFilter] = useState({
    status: "all",
    type: "all",
    search: "",
  });

  const filteredSubscriptions = subscriptions.filter((sub) => {
    return (
      (filter.status === "all" || sub.status === filter.status) &&
      (filter.type === "all" || sub.type === filter.type) &&
      sub.name.toLowerCase().includes(filter.search.toLowerCase())
    );
  });

  const statusIcon = {
    active: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    cancelled: <XCircle className="h-4 w-4 text-red-500" />,
    pending: <Clock className="h-4 w-4 text-amber-500" />,
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h1 className="text-2xl font-bold">My Subscriptions</h1>

        <div className="flex gap-2">
          <Input
            placeholder="Search subscriptions..."
            className="max-w-xs"
            value={filter.search}
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          />

          <Select
            value={filter.status}
            onValueChange={(value) => setFilter({ ...filter, status: value })}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filter.type}
            onValueChange={(value) => setFilter({ ...filter, type: value })}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="PRINT">Print</SelectItem>
              <SelectItem value="DIGITAL">Digital</SelectItem>
              <SelectItem value="PRINT_AND_DIGITAL">Print + Digital</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {filteredSubscriptions.length > 0 ? (
            <div className="divide-y">
              {filteredSubscriptions.map((sub) => (
                <div
                  key={sub.id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
                        {sub.type === "DIGITAL" ? (
                          <Zap className="h-5 w-5" />
                        ) : sub.type === "PRINT" ? (
                          <Sparkles className="h-5 w-5" />
                        ) : (
                          <CreditCard className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{sub.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant={
                              sub.status === "active"
                                ? "default"
                                : "destructive"
                            }
                          >
                            {statusIcon?.[sub?.status]} {sub.status}
                          </Badge>
                          <span className="text-sm text-gray-600">
                            {sub.price}/
                            {sub.billing_cycle === "YEARLY" ? "yr" : "mo"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {sub.status === "active" && (
                        <div className="text-right">
                          <p className="text-sm font-medium flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            Renews{" "}
                            {new Date(sub?.next_billing).toLocaleDateString()}
                          </p>
                          {/* {sub.utilization && (
                            <p className="text-sm text-gray-600">
                              Utilization: {sub.utilization}
                            </p>
                          )} */}
                        </div>
                      )}
                      {sub.status === "cancelled" && (
                        <p className="text-sm text-gray-600">
                          Ends {new Date(sub.end_date).toLocaleDateString()}
                        </p>
                      )}
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-500">
                No subscriptions match your filters
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

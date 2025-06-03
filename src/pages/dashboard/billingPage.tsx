import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Download,
  Receipt,
  CreditCard,
  Calendar,
  BadgeCheck,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function BillingPage() {
  const payments = [
    {
      id: "pay_001",
      invoice_number: "INV-2023-001",
      date: "2023-05-15",
      amount: "$49.97",
      method: "CARD",
      status: "SUCCESS",
      subscription: "Premium News + Cloud Storage",
    },
    {
      id: "pay_002",
      invoice_number: "INV-2023-002",
      date: "2023-04-15",
      amount: "$49.97",
      method: "CARD",
      status: "SUCCESS",
      subscription: "Premium News + Cloud Storage",
    },
    {
      id: "pay_003",
      invoice_number: "INV-2023-003",
      date: "2023-03-15",
      amount: "$49.97",
      method: "UPI",
      status: "SUCCESS",
      subscription: "Premium News + Cloud Storage",
    },
  ];

  const paymentMethods = [
    {
      id: "pm_001",
      type: "VISA",
      last4: "4242",
      expiry: "12/25",
      is_default: true,
    },
    {
      id: "pm_002",
      type: "PAYPAL",
      email: "user@example.com",
      is_default: false,
    },
  ];

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">Billing & Payments</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Methods
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {method.type === "VISA" ? (
                      <div className="p-2 bg-primary-100 rounded-lg text-primary-600">
                        <CreditCard className="h-5 w-5" />
                      </div>
                    ) : (
                      <div className="p-2 bg-primary-100 rounded-lg text-primary-600">
                        <Receipt className="h-5 w-5" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-medium">{method.type}</h3>
                      <p className="text-sm text-gray-600">
                        {method.last4
                          ? `•••• •••• •••• ${method.last4}`
                          : method.email}
                      </p>
                    </div>
                  </div>
                  {method.is_default && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      <BadgeCheck className="h-3 w-3" /> Default
                    </Badge>
                  )}
                </div>
              ))}
              <Button variant="outline" className="w-full">
                Add Payment Method
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Payment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Next Payment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount</span>
                <span className="font-medium">$49.97</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date</span>
                <span className="font-medium">June 15, 2023</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method</span>
                <span className="font-medium">VISA •••• 4242</span>
              </div>
              <div className="pt-4">
                <Button variant="outline" className="w-full">
                  Change Payment Method
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Payment History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Subscription</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">
                    {payment.invoice_number}
                  </TableCell>
                  <TableCell>
                    {new Date(payment.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell>{payment.subscription}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        payment.status === "SUCCESS" ? "default" : "destructive"
                      }
                    >
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Download className="h-4 w-4" />
                      Invoice
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

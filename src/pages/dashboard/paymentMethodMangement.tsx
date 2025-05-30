import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Plus, Trash2, BadgeCheck } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddPaymentMethodForm } from "@/components/AddPaymentMethodForm";
import { useState } from "react";

export default function PaymentMethodsPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const paymentMethods = [
    {
      id: "pm_001",
      type: "CARD",
      card_brand: "VISA",
      card_last4: "4242",
      card_exp_month: "12",
      card_exp_year: "25",
      is_default: true,
    },
    {
      id: "pm_002",
      type: "PAYPAL",
      paypal_email: "user@example.com",
      is_default: false,
    },
    {
      id: "pm_003",
      type: "UPI",
      upi_id: "user@upi",
      is_default: false,
    },
  ];

  const handleSetDefault = (id: string) => {
    // API call to set default payment method
  };

  const handleDeleteMethod = (id: string) => {
    // API call to delete payment method
  };

  const handleAddPaymentMethod = (data: any) => {
    // API call to add payment method
    console.log('Adding payment method:', data);
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Payment Methods</h1>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Payment Method
        </Button>
      </div>

      {showAddForm ? (
        <Card>
          <CardHeader>
            <CardTitle>Add New Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <AddPaymentMethodForm
              onSubmit={handleAddPaymentMethod}
              onCancel={() => setShowAddForm(false)}
            />
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Saved Payment Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Method</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentMethods.map((method) => (
                    <TableRow key={method.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-5 w-5 text-muted-foreground" />
                          <span className="capitalize">{method.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {method.type === "CARD" ? (
                          <div>
                            {method.card_brand} •••• {method.card_last4}
                            <div className="text-sm text-muted-foreground">
                              Expires {method.card_exp_month}/{method.card_exp_year}
                            </div>
                          </div>
                        ) : method.type === "PAYPAL" ? (
                          method.paypal_email
                        ) : (
                          method.upi_id
                        )}
                      </TableCell>
                      <TableCell>
                        {method.is_default ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-50 text-green-600 text-xs">
                            <BadgeCheck className="h-3 w-3" /> Default
                          </span>
                        ) : (
                          <span className="text-muted-foreground">Secondary</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {!method.is_default && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleSetDefault(method.id)}
                              >
                                Set Default
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteMethod(method.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Add New Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Button
                  variant="outline"
                  className="h-24 flex-col gap-2"
                  onClick={() => setShowAddForm(true)}
                >
                  <CreditCard className="h-6 w-6" />
                  Credit/Debit Card
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex-col gap-2"
                  onClick={() => setShowAddForm(true)}
                >
                  <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                    <path d="M7.5 14.25c0 .414.336.75.75.75h7.5a.75.75 0 0 0 .75-.75v-1.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0-.75.75v1.5zm0-4.5c0 .414.336.75.75.75h7.5a.75.75 0 0 0 .75-.75v-1.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0-.75.75v1.5z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22.5c-5.799 0-10.5-4.701-10.5-10.5S6.201 1.5 12 1.5 22.5 6.201 22.5 12 17.799 22.5 12 22.5z" />
                  </svg>
                  PayPal
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex-col gap-2"
                  onClick={() => setShowAddForm(true)}
                >
                  <svg className="h-6 w-6" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                    <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                  </svg>
                  UPI
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

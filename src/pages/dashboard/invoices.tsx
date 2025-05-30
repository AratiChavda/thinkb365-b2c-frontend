import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { InvoiceDownloadButton } from "@/pages/dashboard/InvoiceDownloadButton";

export default function InvoicesPage() {
  const invoices = [
    {
      id: "inv_001",
      invoice_number: "INV-2023-001",
      date: "2023-05-15",
      amount: "$49.97",
      tax: "$4.97",
      total: "$54.94",
      status: "PAID",
      subscription: "Premium News + Cloud Storage",
      download_count: 2,
    },
    {
      id: "inv_002",
      invoice_number: "INV-2023-002",
      date: "2023-04-15",
      amount: "$49.97",
      tax: "$4.97",
      total: "$54.94",
      status: "PAID",
      subscription: "Premium News + Cloud Storage",
      download_count: 1,
    },
    {
      id: "inv_003",
      invoice_number: "INV-2023-003",
      date: "2023-03-15",
      amount: "$49.97",
      tax: "$4.97",
      total: "$54.94",
      status: "PAID",
      subscription: "Premium News + Cloud Storage",
      download_count: 0,
    },
  ];

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Invoices</h1>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search invoices..." className="pl-8" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Invoice History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Subscription</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Tax</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Downloads</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">
                    {invoice.invoice_number}
                  </TableCell>
                  <TableCell>
                    {new Date(invoice.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{invoice.subscription}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>{invoice.tax}</TableCell>
                  <TableCell>{invoice.total}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        invoice.status === "PAID"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </TableCell>
                  <TableCell>{invoice.download_count}</TableCell>
                  <TableCell>
                    <InvoiceDownloadButton
                      invoiceId={invoice.id}
                      invoiceNumber={invoice.invoice_number}
                    />
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

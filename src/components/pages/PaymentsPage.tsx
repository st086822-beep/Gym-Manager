import { CreditCard, Search, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Payment {
  id: string;
  member: string;
  amount: number;
  type: string;
  status: "completed" | "pending" | "failed";
  date: string;
}

const mockPayments: Payment[] = [
  { id: "1", member: "Alex Johnson", amount: 59, type: "Premium Monthly", status: "completed", date: "2024-02-01" },
  { id: "2", member: "Sarah Williams", amount: 29, type: "Basic Monthly", status: "completed", date: "2024-02-01" },
  { id: "3", member: "Mike Chen", amount: 99, type: "VIP Monthly", status: "pending", date: "2024-02-02" },
  { id: "4", member: "Emily Davis", amount: 29, type: "Basic Monthly", status: "failed", date: "2024-02-02" },
  { id: "5", member: "James Wilson", amount: 59, type: "Premium Monthly", status: "completed", date: "2024-02-03" },
];

const statusStyles = {
  completed: "bg-stat-active/10 text-stat-active border-stat-active/20",
  pending: "bg-stat-new/10 text-stat-new border-stat-new/20",
  failed: "bg-destructive/10 text-destructive border-destructive/20",
};

export function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPayments = mockPayments.filter(payment =>
    payment.member.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExport = () => {
    toast.success("Payments exported to CSV!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Payments</h1>
        <p className="text-muted-foreground mt-1">Track and manage all payment transactions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl border p-6">
          <p className="text-sm text-muted-foreground">Total Revenue (This Month)</p>
          <p className="text-3xl font-bold text-foreground mt-1">$12,450</p>
        </div>
        <div className="bg-card rounded-xl border p-6">
          <p className="text-sm text-muted-foreground">Pending Payments</p>
          <p className="text-3xl font-bold text-stat-new mt-1">$297</p>
        </div>
        <div className="bg-card rounded-xl border p-6">
          <p className="text-sm text-muted-foreground">Failed Payments</p>
          <p className="text-3xl font-bold text-destructive mt-1">$29</p>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-card rounded-xl border shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 border-b">
          <h2 className="text-xl font-bold text-foreground">Transaction History</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search payments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-64"
              />
            </div>
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Member</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Amount</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Type</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4 font-medium">{payment.member}</td>
                  <td className="px-6 py-4 font-bold">${payment.amount}</td>
                  <td className="px-6 py-4 text-muted-foreground">{payment.type}</td>
                  <td className="px-6 py-4">
                    <Badge className={cn("capitalize border", statusStyles[payment.status])}>
                      {payment.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

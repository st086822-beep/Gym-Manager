import { UserPlus, CreditCard, Calendar, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const actions = [
  { label: "New Member", icon: UserPlus, description: "Register a new member" },
  { label: "Record Payment", icon: CreditCard, description: "Log a payment" },
  { label: "Book Session", icon: Calendar, description: "Schedule a session" },
  { label: "Send Reminder", icon: Bell, description: "Notify members" },
];

export function QuickActions() {
  return (
    <div className="bg-card rounded-xl border shadow-card p-6 animate-fade-in">
      <h2 className="text-lg font-bold text-foreground mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.label}
              variant="outline"
              className="h-auto flex-col items-start gap-2 p-4 hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">{action.label}</p>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

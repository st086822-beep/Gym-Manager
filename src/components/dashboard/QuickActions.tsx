import { UserPlus, CreditCard, Calendar, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuickActionsProps {
  onNewMember: () => void;
  onRecordPayment: () => void;
  onBookSession: () => void;
  onSendReminder: () => void;
}

const actions = [
  { id: "new-member", label: "New Member", icon: UserPlus, description: "Register a new member" },
  { id: "record-payment", label: "Record Payment", icon: CreditCard, description: "Log a payment" },
  { id: "book-session", label: "Book Session", icon: Calendar, description: "Schedule a session" },
  { id: "send-reminder", label: "Send Reminder", icon: Bell, description: "Notify members" },
];

export function QuickActions({ onNewMember, onRecordPayment, onBookSession, onSendReminder }: QuickActionsProps) {
  const handleClick = (id: string) => {
    switch (id) {
      case "new-member":
        onNewMember();
        break;
      case "record-payment":
        onRecordPayment();
        break;
      case "book-session":
        onBookSession();
        break;
      case "send-reminder":
        onSendReminder();
        break;
    }
  };

  return (
    <div className="bg-card rounded-xl border shadow-card p-6 animate-fade-in">
      <h2 className="text-lg font-bold text-foreground mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.id}
              variant="outline"
              onClick={() => handleClick(action.id)}
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

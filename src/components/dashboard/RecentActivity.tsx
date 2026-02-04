import { UserPlus, CreditCard, LogIn, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const activities = [
  { id: 1, type: "join", message: "Alex Johnson joined as Premium member", time: "2 mins ago", icon: UserPlus },
  { id: 2, type: "payment", message: "Sarah Williams renewed subscription", time: "15 mins ago", icon: CreditCard },
  { id: 3, type: "checkin", message: "Mike Chen checked in", time: "32 mins ago", icon: LogIn },
  { id: 4, type: "alert", message: "3 memberships expiring this week", time: "1 hour ago", icon: AlertCircle },
  { id: 5, type: "payment", message: "James Wilson paid $99 for VIP", time: "2 hours ago", icon: CreditCard },
];

const typeStyles = {
  join: "bg-stat-new/10 text-stat-new",
  payment: "bg-stat-active/10 text-stat-active",
  checkin: "bg-stat-revenue/10 text-stat-revenue",
  alert: "bg-stat-members/10 text-stat-members",
};

export function RecentActivity() {
  return (
    <div className="bg-card rounded-xl border shadow-card p-6 animate-fade-in">
      <h2 className="text-lg font-bold text-foreground mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div 
              key={activity.id} 
              className="flex items-start gap-3 animate-slide-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                typeStyles[activity.type as keyof typeof typeStyles]
              )}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{activity.message}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

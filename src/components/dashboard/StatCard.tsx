import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant: "members" | "active" | "revenue" | "new";
  trend?: {
    value: number;
    positive: boolean;
  };
}

export function StatCard({ title, value, subtitle, icon: Icon, variant, trend }: StatCardProps) {
  return (
    <div className={cn("stat-card", `stat-card-${variant}`, "animate-fade-in")}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
          {trend && (
            <p className={cn(
              "text-sm font-medium",
              trend.positive ? "text-stat-active" : "text-destructive"
            )}>
              {trend.positive ? "+" : ""}{trend.value}% from last month
            </p>
          )}
        </div>
        <div className={cn("icon-badge", `icon-badge-${variant}`)}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}

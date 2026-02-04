import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { StatCard } from "@/components/dashboard/StatCard";
import { MemberTable } from "@/components/dashboard/MemberTable";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { Users, UserCheck, DollarSign, UserPlus } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, <span className="text-gradient">Admin</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your gym today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Members"
            value="1,284"
            icon={Users}
            variant="members"
            trend={{ value: 12.5, positive: true }}
          />
          <StatCard
            title="Active Today"
            value="156"
            icon={UserCheck}
            variant="active"
            subtitle="12% of total members"
          />
          <StatCard
            title="Monthly Revenue"
            value="$48,250"
            icon={DollarSign}
            variant="revenue"
            trend={{ value: 8.2, positive: true }}
          />
          <StatCard
            title="New This Month"
            value="64"
            icon={UserPlus}
            variant="new"
            trend={{ value: 4.1, positive: true }}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <MemberTable />
          </div>
          <div className="space-y-6">
            <QuickActions />
            <RecentActivity />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
